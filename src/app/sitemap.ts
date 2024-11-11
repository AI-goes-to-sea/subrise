export default function sitemap() {
    return [
        {
            url: 'https://subrise.co/en',
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: 'https://subrise.co/zh',
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: 'https://subrise.co/zh/subrise-featured',
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: 'https://subrise.co/en/subrise-featured',
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: 'https://subrise.co/en/concept',
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: 'https://subrise.co/zh/concept',
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: 'https://subrise.co/en/reddit-list',
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: 'https://subrise.co/zh/reddit-list',
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: 'https://subrise.co/zh/blog',
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: 'https://subrise.co/en/blog',
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: 'https://subrise.co/en/terms-of-service',
            lastModified: new Date().toISOString(),
            changeFrequency: 'weekly',
            priority: 0.3,
        },
        {
            url: 'https://subrise.co/zh/terms-of-service',
            lastModified: new Date().toISOString(),
            changeFrequency: 'weekly',
            priority: 0.3,
        },
        {
            url: 'https://subrise.co/en/privacy-policy',
            lastModified: new Date().toISOString(),
            changeFrequency: 'weekly',
            priority: 0.3,
        },
        {
            url: 'https://subrise.co/zh/privacy-policy',
            lastModified: new Date().toISOString(),
            changeFrequency: 'weekly',
            priority: 0.3,
        },
        
    ];
} 