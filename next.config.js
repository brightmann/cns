module.exports = {
  async redirects() {
    return [
      {
        source: '/articles/page/1',
        destination: '/articles',
        permanent: true
      }
    ];
  }
};
