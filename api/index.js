import mongoose from "mongoose";
import User from "../models/User.js";
import Game from "../models/Game.js";

mongoose.connect(process.env.MONGO_URI);

export default async function handler(req, res) {
  const { method } = req;

  // Crear superadmin si no existe
  await User.updateOne(
    { username: "admin" },
    { username: "admin", password: "Ancor289", role: "superadmin" },
    { upsert: true }
  );

  if(method === "POST" && req.url.includes("login")){
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if(!user) return res.status(401).json({ message:"Incorrecto" });
    return res.json(user);
  }

  if(method === "POST" && req.url.includes("register")){
    const user = await User.create(req.body);
    return res.json(user);
  }

  if(method === "POST" && req.url.includes("makeAdmin")){
    const { userId } = req.body;
    const user = await User.findById(userId);
    if(!user) return res.status(404).json({ message:"Usuario no encontrado" });
    user.role = "admin";
    await user.save();
    return res.json({ message:"Ahora es admin" });
  }

  res.status(404).json({ message:"Ruta no encontrada" });
}