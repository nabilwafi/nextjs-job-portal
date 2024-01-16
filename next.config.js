/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "iuheiaqxbmolrpma.public.blob.vercel-storage.com",
      },
    ],
  },
};

module.exports = nextConfig;
