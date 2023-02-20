import express from "express";
import { Request, Response } from "express";
import bodyparser from "body-parser";
import cors from "cors";
import { Animal } from "./db";
import { validateNameAndSpecies } from "./validateInput";

export type AnimalType = {
  _id: string;
  name: string;
  imgLink: string;
  species: string;
};

const app = express();

app.use(bodyparser.json());
app.use(cors({ origin: "*" }));

// Get all animals

app.get("/animals", (req: Request, res: Response) => {
  Animal.find().then((data) => res.send(data));
});

// const animalObject2 = new Animal({
//   name: "Tiger2",
//   imgLink:
//     "https://upload.wikimedia.org/wikipedia/commons/3/3f/Walking_tiger_female.jpg",
//   species: "Cat",
// });
// animalObject2.save();

// Get animals by species

app.get("/species/:id", (req: Request, res: Response) => {
  let id = req.params.id;
  id = id.charAt(0).toUpperCase() + id.slice(1);
  Animal.find({ species: id }).then((data) => res.send(data));
});

// Add new animal

app.post("/animals", (req: Request, res: Response) => {
  //console.log(req.body.name);

  let name = req.body.name;
  name = validateNameAndSpecies(name);

  const imgLink = req.body.imgLink;

  let species = req.body.species;
  species = validateNameAndSpecies(species);

  const animalObject = new Animal({
    name,
    imgLink,
    species,
  });

  animalObject.save();
  res.status(200).send("Animal added");
});

// Delete task

// app.delete("/tasks/:id", (req, res) => {
//   const id = req.params.id;

//   Todo.findByIdAndDelete(id, (err) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).send("Error deleting task!");
//     }
//     res.send(`Task with ID ${id} deleted successfully`);
//   });
// });

app.listen(3004, () => {
  console.log("Application started on port 3004!");
});
