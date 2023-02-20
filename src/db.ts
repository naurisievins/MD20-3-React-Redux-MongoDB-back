import mongoose from "mongoose";

mongoose.set("strictQuery", false);

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/animals");
}

main().catch((err) => console.log(err));

const AnimalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    imgLink: { type: String, required: true },
    species: { type: String, required: true },
  },
  { versionKey: false }
);

export const Animal = mongoose.model("Animal", AnimalSchema);
