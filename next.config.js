/** @type {import('next').NextConfig} */
const config = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth/jwt/login',
        permanent: true,
      },
    ];
  },
  reactStrictMode: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = config;
