// getting-started.js
const mongoose = require("mongoose");

main().catch((err) => console.log(err));
const dataBaseUri =
  "mongodb+srv://AdityaGoswami03:Aditya%4003@cluster0.3qndeud.mongodb.net/";
async function main() {
  await mongoose.connect(dataBaseUri);
  console.log("Connected with the data");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
