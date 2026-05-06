import { MetadataRoute} from "next";
const BASE_URL = "http://localhost:3000";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const today = new Date();

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/`,
            lastModified: today,
            changeFrequency: "daily",
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: today,
            changeFrequency: "yearly",
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/messagerie`,
            lastModified: today,
            changeFrequency: "weekly",
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/login`,
            lastModified: today,
            changeFrequency: "never",
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/register`,
            lastModified: today,
            changeFrequency: "never",
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/gerer-propriete`,
            lastModified: today,
            changeFrequency: "yearly",
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/properties/[property]`,
            lastModified: today,
            changeFrequency: "daily",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/favorite`,
            lastModified: today,
            changeFrequency: "weekly",
            priority: 0.6,
        },
    ];

    return staticRoutes;
}