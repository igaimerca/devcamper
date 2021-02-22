const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log(`Mongodb connected ${conn.connection.host}`.cyan.underline.bold);
  } catch (error) {
    if (error) console.log(error);
  }
};

module.exports = connectDB;
