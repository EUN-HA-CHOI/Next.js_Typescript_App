/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig

// next.config.js
const debug = process.env.NODE_ENV !== 'production'
const name = 'Next.js_Typescript_App'

module.exports = {
  assetPrefix: !debug ? `/${name}/` : '',
  basePath: '/Next.js_Typescript_App',
}
