import mongoose from 'mongoose';

export default async function dbConnect() {
  try {
    await mongoose
      .connect(
        'mongodb://mongo:y2F0BvgR7ZZ2Yj0DVMbr@containers-us-west-24.railway.app:7841',
      )
      .then(() => console.log('Connected to database server'))
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
