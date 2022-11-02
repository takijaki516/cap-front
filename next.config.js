/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      "rb.gy",
      "previews.123rf.com",
      "cdn.pixabay.com",
      "seeklogo.com",
      "images.pexels.com",
      "dummyjson.com",
    ],
  },
};

module.exports = nextConfig;
