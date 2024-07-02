
require('dotenv').config();

module.exports = {
  env: {
    ASAAS_ACCESS_TOKEN: process.env.ASAAS_ACCESS_TOKEN,
  },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}




module.exports = nextConfig
