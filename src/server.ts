import app from "./app";
import mongoose from "mongoose";

async function main() {
  await mongoose.connect(process.env.DATABASE_URL as string);
  app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
  });
}
main();
