const express = require("express");
const app = express();
const morgan = require("morgan")

app.use(express.json());

morgan.token('body', function (req, res) {
  if(req.method === 'POST'){
      return(JSON.stringify(req.body))}
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122",
  }
];

const generateId = () => {
  const max = 1000;
  return Math.floor(Math.random() * max);
};

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  res.send(
    `<div> Phonebook has info for ${persons.length} people </div>
        <div> ${Date()} </div`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);
  console.log(persons)
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number missing"
    })
  } else if (persons.some(p => p.name === body.name)) {
    return res.status(400).json({
      error: "name must be unique"
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  console.log(person);
  persons = persons.concat(person);
  res.json(person);
  
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
