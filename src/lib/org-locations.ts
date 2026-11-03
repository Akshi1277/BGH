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
