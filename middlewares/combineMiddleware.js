const combineMiddlewares = (middleware1, middleware2) => {
  return (req, res, next) => {
    middleware1(req, res, (err) => {
      if (!err) {
        return next(); // Lanjutkan jika middleware pertama terpenuhi
      }
      middleware2(req, res, next); // Coba middleware kedua
    });
  };
};

module.exports = combineMiddlewares;
