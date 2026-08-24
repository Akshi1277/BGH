import { NextRequest, NextResponse } from 'next/server';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
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

  if (!key) {
    return new NextResponse('Bad Request: Missing file key', { status: 400 });
  }

  const rangeHeader = request.headers.get('range');
  const mimeType = getMimeType(key);

  // Try fetching from Wasabi S3 if credentials exist
  if (process.env.WASABI_ACCESS_KEY && process.env.WASABI_SECRET_KEY) {
    try {
      const command = new GetObjectCommand({
        Bucket: bucket,
        Key: key,
        Range: rangeHeader || undefined,
      });

      const response = await s3Client.send(command);

      const headers = new Headers();
      headers.set('Content-Type', response.ContentType || mimeType);
      headers.set('Cache-Control', 'public, max-age=31536000, immutable');
      headers.set('Accept-Ranges', 'bytes');
      headers.set('X-Media-Source', 'wasabi-s3');

      if (response.ContentRange) {
        headers.set('Content-Range', response.ContentRange);
      }
      if (response.ContentLength) {
        headers.set('Content-Length', response.ContentLength.toString());
      }

      const stream = response.Body as unknown as ReadableStream;
      const status = rangeHeader && response.ContentRange ? 206 : 200;

      return new NextResponse(stream, {
        status,
        headers,
      });
    } catch (s3Error: any) {
      console.warn(`[Wasabi S3] Failed to fetch ${key}, falling back to local storage:`, s3Error.message);
    }
  }

  // Local fallback from public/ directory
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
