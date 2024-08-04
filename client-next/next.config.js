// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // Allows any path
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**', // Allows any path
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**', // Allows any path
      },
    ],
  },
};
