# Agent Interaction Instructions for BRAHM Global Holdings

> Machine-Readable Protocol Specification & Agent Guidelines  
> URI: https://brahmglobalholdings.com/.well-known/agent-instructions.md

## Identity & Verification
- **Organization**: BRAHM Global Holdings (BRAHM Global Holdings Ltd)
- **HQ**: London, United Kingdom
- **Primary Domain**: https://brahmglobalholdings.com
- **Verified Divisions**: ENIF Technologies (Tech & AI), 7AURIGA (Identity & Media)

## Content Negotiation (acceptmarkdown.com)
- Clients may request Markdown by sending header: `Accept: text/markdown`
- Responses will return `Content-Type: text/markdown; charset=utf-8` and `Vary: Accept, Accept-Encoding`

## Available Endpoints & Markdown Mappings
- `/` -> Homepage overview of group and companies
- `/about` -> Institutional mission, philosophy, governance, and business model
- `/services` -> Group capabilities: venture building, ENIF software & AI, 7AURIGA branding
- `/portfolio` -> Directory of all 6 operating ventures with status and live links
- `/sectors` -> The 6 strategic focus industries
- `/invest` -> Capital mandate, venture building mechanics, and partnership criteria
- `/contact` -> Departmental contact channels and routing
- `/privacy` -> Privacy Policy and GDPR compliance details
- `/enif` -> ENIF Technologies capabilities, architecture, and technology stack
- `/7auriga` -> 7AURIGA Identity Intelligence practice details
- `/llms.txt` -> Standard llms.txt index
- `/llms-full.txt` -> Full technical and brand reference document
- `/sitemap.xml` -> XML sitemap

## Contact Protocol
- Inquiries can be initiated via mailto protocol to `hello@brahmglobalholdings.com`
