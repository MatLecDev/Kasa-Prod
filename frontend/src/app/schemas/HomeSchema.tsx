import { Property } from "@/types";

interface HomeSchemaProps {
  properties: Property[];
}

export default function HomeSchema({ properties }: HomeSchemaProps) {
  const BASE_URL = process.env.BASE_URL

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Kasa",
    url: BASE_URL,
    description:
      "Kasa vous met en relation avec des hôtes passionnés pour des séjours uniques et authentiques.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Logements disponibles sur Kasa",
    numberOfItems: properties.length,
    itemListElement: properties.map((property, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${BASE_URL}/properties/${property.slug}-${property.id}`,
      name: property.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
    </>
  );
}
