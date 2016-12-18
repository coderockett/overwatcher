module.exports = (app) => {
  app.get('/api/overwatch', (req, res) => {
    res.json({ hello: 'world' });
  });
};
