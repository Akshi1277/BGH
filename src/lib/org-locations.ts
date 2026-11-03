// Single source for the group's offices, used by every Organization JSON-LD block.
// Keep the Mumbai address identical to the Google Business Profile listing so Google
// can match the website, the profile and the schema as one entity.
export const ORG_ADDRESSES = [
  {
    "@type": "PostalAddress",
    addressLocality: "London",
    addressRegion: "Greater London",
    addressCountry: "GB",
  },
  {
    "@type": "PostalAddress",
    streetAddress:
      "Shop no 6, Veena Beena, 22a, Gurunanak Rd, opp. Bandra Railway Station, Bandra West",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400050",
    addressCountry: "IN",
  },
];

// Companies House record — public proof that the company is registered. The registered
// street address is deliberately not shown on the site; only the town is.
export const COMPANY_NUMBER = "17313775";
export const COMPANIES_HOUSE_URL = `https://find-and-update.company-information.service.gov.uk/company/${COMPANY_NUMBER}`;

export const CEO = { name: "Iyaan Tauquir Khan", jobTitle: "Chief Executive Officer" };

// Group companies, declared as subOrganization so Google links each one to BRAHM.
// LSAA has no live website yet, so it carries no url.
export const GROUP_COMPANIES = [
  { name: "ENIF Technologies", url: "https://enif.brahmglobalholdings.com" },
  { name: "7AURIGA", url: "https://brahmglobalholdings.com/7auriga" },
  { name: "Talent Pro League", url: "https://talentproleague.co.uk" },
  { name: "London School of Academics & Arts" },
  { name: "Alayn", url: "https://alaynai.com" },
  { name: "Hannah Pixels", url: "https://hannahpixels.com" },
].map((company) => ({ "@type": "Organization", ...company }));
