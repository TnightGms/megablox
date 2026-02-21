import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  name: String,
  creator: String,
  worldData: Object,
  visits: { type: Number, default: 0 }
});

export default mongoose.models.Game || mongoose.model("Game", GameSchema);