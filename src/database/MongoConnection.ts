import { config } from '../config/Constants';
import mongoose from 'mongoose';

export class MongoConnection {
  public async connect(): Promise<void> {
    try {
      mongoose.connect(config.MONGO_CONNECTION);
      console.log('database connected');
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }
}
