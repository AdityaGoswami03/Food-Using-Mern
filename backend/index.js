const express = require("express");
const app = express();
const port = 9090;

app.get("/", (req, res) => {
  res.send("this is response");
});

app.listen(port, () => {
  console.log(`Exapmle app listening on port ${port}`);
});
