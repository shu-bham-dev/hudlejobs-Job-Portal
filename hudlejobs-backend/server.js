const express = require("express");
const app = express();
const port = 4000;

var config = {
  server: "DESKTOP-L1MM28BSQLEXPRESS",
  database: "hudlejobs",
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true,
  },
};

app.listen(port, () => {
  console.log(`Running on ${port}`);
});

app.use("/user", require("./routes/user"));
