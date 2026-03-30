const bcrypt = require("bcrypt");

bcrypt.hash("Ambassador123", 10).then((hash) => {
  console.log(hash);
});