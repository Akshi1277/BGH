import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failed++;
  }
}

console.log('\n--- 1. Testing Machine-Readable Agent Instructions (llms.txt) ---');
const llmsPath = path.join(ROOT, 'public', 'llms.txt');
assert(fs.existsSync(llmsPath), 'public/llms.txt exists');
const llmsContent = fs.existsSync(llmsPath) ? fs.readFileSync(llmsPath, 'utf8') : '';
assert(llmsContent.includes('When to Use This'), 'public/llms.txt contains "When to Use This" section');
assert(llmsContent.includes('ENIF Technologies'), 'public/llms.txt references ENIF Technologies');
assert(llmsContent.includes('7AURIGA'), 'public/llms.txt references 7AURIGA');
assert(llmsContent.includes('Talent Pro League'), 'public/llms.txt references Talent Pro League');
assert(llmsContent.includes('Alayn'), 'public/llms.txt references Alayn');
assert(llmsContent.includes('Luxure De Eden'), 'public/llms.txt references Luxure De Eden');
assert(llmsContent.length > 500, `public/llms.txt has sufficient length (${llmsContent.length} chars)`);

console.log('\n--- 2. Testing Deep RAG LLM Context (llms-full.txt) ---');
const llmsFullPath = path.join(ROOT, 'public', 'llms-full.txt');
assert(fs.existsSync(llmsFullPath), 'public/llms-full.txt exists');
const llmsFullContent = fs.existsSync(llmsFullPath) ? fs.readFileSync(llmsFullPath, 'utf8') : '';
assert(llmsFullContent.length > 1500, `public/llms-full.txt has comprehensive depth (${llmsFullContent.length} chars)`);

console.log('\n--- 3. Testing .well-known/agent-instructions.md ---');
const agentInstPath = path.join(ROOT, 'public', '.well-known', 'agent-instructions.md');
assert(fs.existsSync(agentInstPath), 'public/.well-known/agent-instructions.md exists');

console.log('\n--- 4. Testing Markdown Content Negotiation & Proxy ---');
const proxyPath = fs.existsSync(path.join(ROOT, 'src', 'proxy.ts')) 
  ? path.join(ROOT, 'src', 'proxy.ts') 
  : path.join(ROOT, 'src', 'middleware.ts');
assert(fs.existsSync(proxyPath), 'src/proxy.ts exists');
const proxyContent = fs.existsSync(proxyPath) ? fs.readFileSync(proxyPath, 'utf8') : '';
assert(proxyContent.includes('text/markdown'), 'proxy handles text/markdown Accept header');
assert(proxyContent.includes('Vary') && proxyContent.includes('Accept'), 'proxy sets Vary: Accept, Accept-Encoding');

const agentMarkdownPath = path.join(ROOT, 'src', 'lib', 'agent-markdown.ts');
assert(fs.existsSync(agentMarkdownPath), 'src/lib/agent-markdown.ts exists');
const agentMarkdownContent = fs.existsSync(agentMarkdownPath) ? fs.readFileSync(agentMarkdownPath, 'utf8') : '';
assert(agentMarkdownContent.includes('getAgent404Markdown'), 'agent-markdown includes 404 recovery generator');

console.log('\n--- 5. Testing Trust Anchor Pages (/about, /contact, /privacy) ---');
const aboutPath = path.join(ROOT, 'src', 'app', 'about', 'page.tsx');
assert(fs.existsSync(aboutPath), 'src/app/about/page.tsx exists');
const aboutContent = fs.existsSync(aboutPath) ? fs.readFileSync(aboutPath, 'utf8') : '';
assert(aboutContent.length > 500, `About page length is ${aboutContent.length} chars (must be > 500)`);
assert(aboutContent.includes('canonical'), 'About page metadata includes canonical URL');

const contactPath = path.join(ROOT, 'src', 'app', 'contact', 'page.tsx');
assert(fs.existsSync(contactPath), 'src/app/contact/page.tsx exists');
const contactContent = fs.existsSync(contactPath) ? fs.readFileSync(contactPath, 'utf8') : '';
assert(contactContent.length > 500, `Contact page length is ${contactContent.length} chars (must be > 500)`);
assert(contactContent.includes('canonical'), 'Contact page metadata includes canonical URL');

const privacyPath = path.join(ROOT, 'src', 'app', 'privacy', 'page.tsx');
assert(fs.existsSync(privacyPath), 'src/app/privacy/page.tsx exists');
const privacyContent = fs.existsSync(privacyPath) ? fs.readFileSync(privacyPath, 'utf8') : '';
assert(privacyContent.length > 500, `Privacy page length is ${privacyContent.length} chars (must be > 500)`);
assert(privacyContent.includes('canonical'), 'Privacy page metadata includes canonical URL');

console.log('\n--- 6. Testing Metadata Completeness & Organization Schema ---');
const layoutPath = path.join(ROOT, 'src', 'app', 'layout.tsx');
assert(fs.existsSync(layoutPath), 'src/app/layout.tsx exists');
const layoutContent = fs.existsSync(layoutPath) ? fs.readFileSync(layoutPath, 'utf8') : '';
assert(layoutContent.includes('canonical: siteUrl') || layoutContent.includes('canonical:'), 'Layout metadata includes canonical URL');
assert(layoutContent.includes('lang="en"'), 'Layout includes <html lang="en">');
assert(layoutContent.includes('openGraph:'), 'Layout includes openGraph object');
assert(layoutContent.includes('type: "website"'), 'Layout includes og:type "website"');
assert(layoutContent.includes('contactPoint'), 'Organization JSON-LD includes contactPoint');
assert(layoutContent.includes('PostalAddress'), 'Organization JSON-LD includes PostalAddress address');

console.log('\n--- 7. Testing Agent-Friendly 404 (not-found.tsx) ---');
const notFoundPath = path.join(ROOT, 'src', 'app', 'not-found.tsx');
assert(fs.existsSync(notFoundPath), 'src/app/not-found.tsx exists');
const notFoundContent = fs.existsSync(notFoundPath) ? fs.readFileSync(notFoundPath, 'utf8') : '';
assert(notFoundContent.includes('llms.txt'), '404 page provides links to llms.txt');
assert(notFoundContent.includes('sitemap.xml'), '404 page provides links to sitemap.xml');

console.log(`\n================================`);
console.log(`RESULTS: ${passed} Passed, ${failed} Failed`);
console.log(`================================\n`);

if (failed > 0) {
  process.exit(1);
}
