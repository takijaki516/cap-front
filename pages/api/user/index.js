import { connectToDatabase } from "../../../util/mongodb";
import { Timestamp } from "mongodb";

export default async function handler(req, res) {
  const { method, body } = req;

  const { db } = await connectToDatabase();

  if (method === "POST") {
    try {
      const user = await db.collection("users").insertOne({ ...body });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
