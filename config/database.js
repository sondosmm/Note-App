const mongoose= require('mongoose');



const dbConnection= ()=>{
mongoose.connect(process.env.DB_URI).then((conn) => {
    console.log(`Database connected :${conn.connection.host}`);
    console.log(mongoose.connection.name);

  })
  .catch((err) => {
    console.error(`Database Error : ${err}`);
    // console.log("retrying in 5s");
    // setTimeout(dbConnection,5000);
  });
};
module.exports = dbConnection;