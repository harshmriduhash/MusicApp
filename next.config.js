/** @type {import('next').NextConfig} */
let withPWA = require('next-pwa')
let runtimeCaching =  require('next-pwa/cache.js');
const isProduction = process.env.NODE_ENV === 'production';
const config = {
  experimental: {
    appDir: true,
  },
}
const nextConfig = withPWA({
  dest: 'public',
  disable: !isProduction,
  runtimeCaching
})(
  config
);
module.exports = nextConfig
