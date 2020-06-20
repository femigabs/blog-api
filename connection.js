const mongoose =require("mongoose"); // we are trying to create a connection to have access to mongodb

let db_url = "mongodb://localhost:27017/blog"; // you connect to mongodb through this port 27017 and the blog is the name of the database
mongoose.connect(db_url, {useNewUrlParser: true, useUnifiedTopology: true}); //
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
console.log("connected successfully");
});


module.exports = mongoose;