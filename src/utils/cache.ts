// Simple in-memory cache for blog posts
const cache: { [key: string]: { content: string; timestamp: number } } = {};
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

export const cachePost = (key: string, content: string) => {
    cache[key] = {
        content,
        timestamp: Date.now()
    };
};

export const getCachedPost = (key: string): string | null => {
    const cached = cache[key];
    if (!cached) return null;
    
    // Check if cache is still valid
    if (Date.now() - cached.timestamp > CACHE_DURATION) {
        delete cache[key];
        return null;
    }
    
    return cached.content;
};
