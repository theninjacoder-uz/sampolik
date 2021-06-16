const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // Check json web token exists& is verified
  if (token) {
    jwt.verify(token, "poliklinika 7", (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};
