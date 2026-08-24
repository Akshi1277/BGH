#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

/**
 * Wasabi S3 Asset Uploader Script
 * 
 * Usage:
 *   node scripts/upload-to-wasabi.mjs --bucket=YOUR_BUCKET_NAME --region=us-east-1 --key=YOUR_ACCESS_KEY --secret=YOUR_SECRET_KEY
 * 
 * Or set environment variables:
 *   WASABI_BUCKET=YOUR_BUCKET_NAME
 *   WASABI_REGION=us-east-1 (or us-central-1, eu-central-1, ap-southeast-1, etc.)
 *   WASABI_ACCESS_KEY=YOUR_ACCESS_KEY
 *   WASABI_SECRET_KEY=YOUR_SECRET_KEY
 */

const args = process.argv.slice(2).reduce((acc, arg) => {
  const [k, v] = arg.replace(/^--/, '').split('=');
  acc[k] = v || true;
  return acc;
}, {});

const BUCKET = args.bucket || process.env.WASABI_BUCKET;
const REGION = args.region || process.env.WASABI_REGION || 'us-east-1';
const ACCESS_KEY = args.key || process.env.WASABI_ACCESS_KEY;
const SECRET_KEY = args.secret || process.env.WASABI_SECRET_KEY;

console.log('\n========================================');
console.log('  Wasabi Cloud Asset Uploader');
console.log('========================================\n');

if (!BUCKET || !ACCESS_KEY || !SECRET_KEY) {
  console.error('Error: Missing required Wasabi parameters.');
  console.log('\nPlease provide your credentials either via CLI arguments:');
  console.log('  node scripts/upload-to-wasabi.mjs --bucket=my-bucket --region=us-east-1 --key=ACCESS_KEY --secret=SECRET_KEY');
  console.log('\nOr run with AWS CLI if you have it installed:');
  console.log('  aws s3 sync public/camera-frames/ s3://YOUR_BUCKET/camera-frames/ --endpoint-url=https://s3.wasabisys.com --acl public-read');
  console.log('  aws s3 cp public/newvid.mp4 s3://YOUR_BUCKET/newvid.mp4 --endpoint-url=https://s3.wasabisys.com --acl public-read\n');
  process.exit(1);
}

const endpoint = REGION === 'us-east-1' 
  ? 'https://s3.wasabisys.com' 
  : `https://s3.${REGION}.wasabisys.com`;

async function main() {
  try {
    let S3Client, PutObjectCommand;
    try {
      const s3Module = await import('@aws-sdk/client-s3');
      S3Client = s3Module.S3Client;
      PutObjectCommand = s3Module.PutObjectCommand;
    } catch {
      console.log('Installing @aws-sdk/client-s3 for upload...');
      const { execSync } = await import('child_process');
      execSync('npm install --no-save @aws-sdk/client-s3', { stdio: 'inherit', cwd: ROOT_DIR });
      const s3Module = await import('@aws-sdk/client-s3');
      S3Client = s3Module.S3Client;
      PutObjectCommand = s3Module.PutObjectCommand;
    }

    const s3 = new S3Client({
      region: REGION,
      endpoint: endpoint,
      credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_KEY,
      },
    });

    const filesToUpload = [];

    // 1. Enif hero video
    const videoPath = path.join(ROOT_DIR, 'public', 'newvid.mp4');
    if (fs.existsSync(videoPath)) {
      filesToUpload.push({
        filePath: videoPath,
        key: 'newvid.mp4',
        contentType: 'video/mp4',
      });
    }

    // 2. 7auriga camera frames
    const framesDir = path.join(ROOT_DIR, 'public', 'camera-frames');
    if (fs.existsSync(framesDir)) {
      const frameFiles = fs.readdirSync(framesDir).filter(f => f.endsWith('.webp'));
      for (const f of frameFiles) {
        filesToUpload.push({
          filePath: path.join(framesDir, f),
          key: `camera-frames/${f}`,
          contentType: 'image/webp',
        });
      }
    }

    console.log(`Found ${filesToUpload.length} files to upload to s3://${BUCKET}/`);
    console.log(`Endpoint: ${endpoint}\n`);

    let uploaded = 0;
    for (const file of filesToUpload) {
      const fileBuffer = fs.readFileSync(file.filePath);
      await s3.send(new PutObjectCommand({
        Bucket: BUCKET,
        Key: file.key,
        Body: fileBuffer,
        ContentType: file.contentType,
        CacheControl: 'public, max-age=31536000, immutable',
        ACL: 'public-read',
      }));
      uploaded++;
      process.stdout.write(`\rProgress: [${uploaded}/${filesToUpload.length}] uploaded: ${file.key}`);
    }

    console.log('\n\nUpload completed successfully!');
    console.log(`\nYour Wasabi Base URL:`);
    console.log(`  NEXT_PUBLIC_WASABI_BASE_URL=${endpoint}/${BUCKET}`);
    console.log('\nAdd this to your .env.local file to test locally or in your deployment environment variables.');
  } catch (err) {
    console.error('\nUpload error:', err.message);
    process.exit(1);
  }
}

main();
