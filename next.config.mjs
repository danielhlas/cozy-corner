/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tmmduhcwahllfauqhkuj.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/cabin-images/**',
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    // output: "export",
};

export default nextConfig;
