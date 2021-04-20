import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongoD = new MongoMemoryServer();

/**
 * Connect to the in-memory database
 */
export const connect = async (): Promise<void> => {
  const uri = await mongoD.getUri();
  await mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => console.log("in-memory DB connected"));
};

/**
 * Drop database, close the connection and stop mongoD
 */
export const closeDatabase = async (): Promise<void> => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoD.stop();
};

/**
 * Remove all the data for all db collections
 */
export const clearDatabase = async (): Promise<void> => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    if (Object.prototype.hasOwnProperty.call(collections, key)) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }
};
