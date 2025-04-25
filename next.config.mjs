/** @type {import("next").NextConfig} */
const nextConfig = {
    output: "standalone",
    reactStrictMode: true,
    images: {
        remotePatterns: [new URL('https://flagcdn.com/w20/**')],
      }
};

export default nextConfig;