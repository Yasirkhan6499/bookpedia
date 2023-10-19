/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
      domains: ['books.google.com', 'bookimages-0.s3.eu-north-1.amazonaws.com', 'bookimages-0.s3.amazonaws.com'],
    },
    env: {
      AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
      AWS_REGION: process.env.AWS_REGION
    },
  };
  
  module.exports = nextConfig;
  