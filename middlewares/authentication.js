const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { access_token } = req.headers;
  if (access_token) {
    jwt.verify(access_token, 'ANGGALESMANA', (err, decoded) => {
     
      if (err) next({ name: 'INVALID_TOKEN' });
      else {
        console.log(decoded)
        req._userId = decoded._id;
        next();
      }
    });
  } else next({ name: 'MISSING_TOKEN' });
};

