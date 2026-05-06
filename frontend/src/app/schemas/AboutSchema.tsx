export default function AboutSchema() {
  const BASE_URL = process.env.BASE_URL

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "À propos de Kasa",
    url: `${BASE_URL}/a-propos`,
    description:
      "Chez Kasa, nous mettons en relation des voyageurs en quête d'authenticité avec des hôtes passionnés qui aiment partager leur région et leurs bonnes adresses.",
    publisher: {
      "@type": "Organization",
      name: "Kasa",
      url: BASE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
    />
  );
}
