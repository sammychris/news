/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.shopify.com", "img.youtube.com", "boltagency.ca"],
  },
};

module.exports = nextConfig;
