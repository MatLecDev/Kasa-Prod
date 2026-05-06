interface PropertySchemaProps {
  property: {
    id: string;
    title: string;
    description: string;
    location: string;
    price_per_night: number;
    cover: string;
    pictures: string[];
    rating_avg: number;
    slug: string;
    equipments: string[];
    tags: string[];
    host: {
      name: string;
      picture?: string;
    };
  };
}

export default function PropertySchema({ property }: PropertySchemaProps) {
  const BASE_URL = process.env.BASE_URL
  const propertyUrl = `${BASE_URL}/properties/${property.slug}-${property.id}`;

  const realEstateSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: propertyUrl,
    image: [property.cover, ...property.pictures],
    offers: {
      "@type": "Offer",
      price: property.price_per_night,
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: property.price_per_night,
        priceCurrency: "EUR",
        unitText: "nuit",
      },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: property.location,
      addressCountry: "FR",
    },
    aggregateRating: property.rating_avg
      ? {
          "@type": "AggregateRating",
          ratingValue: property.rating_avg,
          bestRating: 5,
          worstRating: 0,
        }
      : undefined,
    amenityFeature: property.equipments.map((equipment) => ({
      "@type": "LocationFeatureSpecification",
      name: equipment,
      value: true,
    })),
    author: {
      "@type": "Person",
      name: property.host.name,
      ...(property.host.picture && { image: property.host.picture }),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: property.title,
        item: propertyUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
