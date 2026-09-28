import { NextRequest, NextResponse } from 'next/server';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import path from 'path';
import fs from 'fs';
import { Readable } from 'stream';

const region = process.env.WASABI_REGION || 'ap-southeast-1';
const bucket = process.env.WASABI_BUCKET_NAME || 'bgh-assets';

const s3Client = new S3Client({
  region,
  endpoint: region === 'us-east-1' ? 'https://s3.wasabisys.com' : `https://s3.${region}.wasabisys.com`,
  credentials: {
    accessKeyId: process.env.WASABI_ACCESS_KEY || '',
    secretAccessKey: process.env.WASABI_SECRET_KEY || '',
  },
  forcePathStyle: true,
});

// Presigned URLs are valid for 7 days (SigV4 maximum). The signing date is
// rounded down to the start of the UTC day so every request on the same day
// gets an identical URL — letting browsers cache the media across visits.
const SIGN_TTL_SECONDS = 7 * 24 * 60 * 60;
const DAY_MS = 24 * 60 * 60 * 1000;

function getMimeType(filename: string): string {
  if (filename.endsWith('.mp4')) return 'video/mp4';
  if (filename.endsWith('.webm')) return 'video/webm';
  if (filename.endsWith('.webp')) return 'image/webp';
  if (filename.endsWith('.png')) return 'image/png';
  if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) return 'image/jpeg';
  if (filename.endsWith('.svg')) return 'image/svg+xml';
  return 'application/octet-stream';
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path: pathSegments } = await context.params;
  const key = pathSegments.join('/');

  if (!key || pathSegments.some((s) => s === '..')) {
    return new NextResponse('Bad Request: Invalid file key', { status: 400 });
  }

  // Redirect the browser straight to Wasabi with a presigned URL. Signing is a
  // local computation (no network call), so this responds instantly and the
  // media bytes never pass through this server.
  if (process.env.WASABI_ACCESS_KEY && process.env.WASABI_SECRET_KEY) {
    try {
      const signingDate = new Date(Math.floor(Date.now() / DAY_MS) * DAY_MS);
      const signedUrl = await getSignedUrl(
        s3Client,
        new GetObjectCommand({ Bucket: bucket, Key: key }),
        { expiresIn: SIGN_TTL_SECONDS, signingDate }
      );

      const response = NextResponse.redirect(signedUrl, 302);
      response.headers.set('Cache-Control', 'public, max-age=3600');
      response.headers.set('X-Media-Source', 'wasabi-s3');
      return response;
    } catch (s3Error: any) {
      console.warn(`[Wasabi S3] Failed to sign ${key}, falling back to local storage:`, s3Error.message);
    }
  }

  // Local fallback from public/ directory
  const rangeHeader = request.headers.get('range');
  const mimeType = getMimeType(key);

  try {
    const localFilePath = path.join(process.cwd(), 'public', ...pathSegments);

    if (!fs.existsSync(localFilePath)) {
      return new NextResponse('File Not Found', { status: 404 });
    }

    const stat = fs.statSync(localFilePath);
    const fileSize = stat.size;

    if (rangeHeader) {
      const parts = rangeHeader.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;

      const fileStream = fs.createReadStream(localFilePath, { start, end });
      const stream = Readable.toWeb(fileStream) as ReadableStream;

      return new NextResponse(stream, {
        status: 206,
        headers: {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize.toString(),
          'Content-Type': mimeType,
          'Cache-Control': 'public, max-age=31536000, immutable',
          'X-Media-Source': 'local-disk',
        },
      });
    }

    const fileStream = fs.createReadStream(localFilePath);
    const stream = Readable.toWeb(fileStream) as ReadableStream;

    return new NextResponse(stream, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Length': fileSize.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Media-Source': 'local-disk',
      },
    });
  } catch (localError: any) {
    console.error(`[Local Media] Error serving ${key}:`, localError);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
