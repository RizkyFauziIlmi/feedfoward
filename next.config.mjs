/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "utfs.io"
            }, 
            {
                protocol: "https",
                hostname: "fakeimg.pl"
            },
            {
                protocol: "https",
                hostname: "picsum.photos"
            },
            {
                protocol: "https",
                hostname: "loremflickr.com"
            }
        ]
    }
};

export default nextConfig;
