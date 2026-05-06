interface WebPageSchemaProps {
  page: "login" | "register";
}

export default function WebPageSchema({ page }: WebPageSchemaProps) {
  const BASE_URL = process.env.BASE_URL

  const config = {
    login: {
      name: "Connexion - Kasa",
      description: "Connectez-vous à votre compte Kasa pour accéder à vos réservations et annonces.",
      url: `${BASE_URL}/login`,
    },
    register: {
      name: "Inscription - Kasa",
      description: "Créez votre compte Kasa et commencez à voyager autrement.",
      url: `${BASE_URL}/register`,
    },
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: config[page].name,
    description: config[page].description,
    url: config[page].url,
    isPartOf: {
      "@type": "WebSite",
      name: "Kasa",
      url: BASE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
