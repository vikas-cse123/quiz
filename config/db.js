import { connect } from "mongoose";

export const connectDb = async () => {
  try {
    await connect(process.env.MONGODB_CONNECTION_STRING2);
    console.log(`Database connected`);
  } catch (error) {
    console.log(error);
    console.log(`Database not connected`);
    process.exit(1);
  }
};
