import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.URI_MONGO);
  console.log(`Connect DB ok`);
} catch (er) {
  console.log(`Error connection`);
  console.log(er);
}
