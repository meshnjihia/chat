/** @type {import('next').NextConfig} */
const nextConfig = {
    
    swcPlugins: [
        ["next-superjson-plugin", {}]
    ],
    images: {
        domains: [
            'res.cloudinary.com',
            "avatars.githubusercontent.com"
        ]
    }
}

module.exports = nextConfig
