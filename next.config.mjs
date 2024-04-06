/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/',
                destination: 'http://127.0.0.1:5000/api/add',
            },
        ]
    },
};

export default nextConfig;
