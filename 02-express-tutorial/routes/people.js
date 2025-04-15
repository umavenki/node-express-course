const express = require("express");
const router = express.Router();

const { people } = require("./../data");
const {
  addPerson,
  getPeople,
  updatePeople,
  deletePeople,
} = require("../controllers/people.js");

// router.get("/", (req, res) => {
//   res.json(people);
// });

// router.post("/", (req, res) => {
//   const name = req.body.name;
//   if (name) {
//     people.push({ id: people.length + 1, name: req.body.name });
//     res.status(201).json({ message: "Person name added successfully", name });
//   } else {
//     res.status(400).json({ error: "Name is required" });
//   }
// });

router.get("/", getPeople);
router.post("/", addPerson);
router.put("/:id", updatePeople);
router.delete("/:id", deletePeople);

module.exports = router;
