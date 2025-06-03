import mongoose from "mongoose";

export async function Connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL!)
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('Mongo DB Connected');
    });

    connection.on('error', (err) => {
      console.log('Mongo DB connection error: ' + err);
      process.exit();
    });
  } catch (error) {
    console.log('Something went wrong while connecting to the database');
    console.error(error);
  }
}
