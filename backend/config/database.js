const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(
      "mongodb+srv://kashyap:N46nDs90RbY1UX73@cluster0.rgldwsd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    });
};

module.exports = connectDatabase;
