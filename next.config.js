/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flags.restcountries.com",
        pathname: "/v5/**",
      },
    ],
  },
};

module.exports = nextConfig;
