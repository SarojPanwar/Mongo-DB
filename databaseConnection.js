const mongoose = require("mongoose");
function DbConnection(){
const DB_URL = process.env.MONGO_URI;
// to set up connection
mongoose.connect(DB_URL);
   
// above connection will be same for any database
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection errors"));
db.once("open",function(){
    console.log("DB connected!!");
});
}
module.exports = DbConnection;

