const { people } = require("./../data");

const addPerson = (req, res) => {
  const name = req.body.name;
  if (name) {
    people.push({ id: people.length + 1, name: req.body.name });
    res.status(201).json({ message: "Person name added successfully", name });
  } else {
    res.status(400).json({ error: "Name is required" });
  }
};

const getPeople = (req, res) => {
  res.json(people);
};

const updatePeople = (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const person = people.find((person) => person.id === Number(id));
  if (!person) {
    res.status(404).json({ success: false, msg: `No person with id ${id}` });
  }
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
    }
    return person;
  });
  res.status(200).json({ success: true, data: newPeople });
};

const deletePeople = (req, res) => {
  const person = people.find((person) => person.id === Number(req.params.id));
  if (!person) {
    res
      .status(404)
      .json({ success: false, msg: `No person with id ${req.params.id}` });
  }
  const newPeople = people.filter(
    (person) => person.id !== Number(req.params.id)
  );
  res.status(200).json({ success: true, data: newPeople });
};
module.exports = { addPerson, getPeople, updatePeople, deletePeople };
