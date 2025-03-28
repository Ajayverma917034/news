// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },
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
      {
        protocol: 'https',
        hostname: 'img.janpadnewslive.com',
        pathname: '/**', // Allows any path
      },
      {
        protocol: 'http',
        hostname: 'image.notemyword.online',
        pathname: '/**', // Allows any path
      },
    ],
  },
};
