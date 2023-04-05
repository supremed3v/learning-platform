/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:slug*",
        destination: `http://localhost:8000/api/v1/:slug*`,
      },
    ];
  },
  reactStrictMode: false,
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
