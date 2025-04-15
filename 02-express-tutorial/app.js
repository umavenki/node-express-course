const morgan = require("morgan");
const express = require("express");
const cookieParser = require("cookie-parser");

const { products, people } = require("./data");
const peopleRouter = require("./routes/people");

const logger = require("./logger");
const authorize = require("./authorize");
const app = express();

//app.use(express.static("./public"));
app.use(express.static("./methods-public"));
app.use(morgan("tiny"));
app.use(cookieParser());
// app.use([logger, authorize]);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/people", peopleRouter);

function auth(req, res, next) {
  if (req.cookies.name) {
    req.user = req.cookies.name;
    return next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

app.post("/logon", (req, res) => {
  const name = req.body.name;
  if (name) {
    res.cookie("name", name);
    res.status(201).json({ message: `Hello ${name}` });
  } else {
    res.status(400).json({ error: "Name is required" });
  }
});

app.get("/test", auth, (req, res) => {
  res.status(200).json({ message: `Welcome ${req.user}` });
});

app.delete("/logoff", (req, res) => {
  res.clearCookie("name");
  res.status(200).json({ message: "User is logged off successfully" });
});

app.get("/home", logger, (req, res) => {
  res.send("Home");
});

app.get("/about", logger, (req, res) => {
  res.send("About");
});

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

// app.get("/api/v1/people", (req, res) => {
//   res.json(people);
// });

// app.post("/api/v1/people", (req, res) => {
//   const name = req.body.name;
//   if (name) {
//     people.push({ id: people.length + 1, name: req.body.name });
//     res.status(201).json({ message: "Person name added successfully", name });
//   } else {
//     res.status(400).json({ error: "Name is required" });
//   }
// });

app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID);
  const product = products.find((p) => p.id === idToFind);

  if (!product) {
    res.status(404).json("That product was not found.");
  }
  res.json(product);
});

app.get("/api/v1/query", (req, res) => {
  const search = req.query.search;
  const limit = req.query.limit;
  const price = req.query.price;

  let filteredProducts = [...products];

  if (search) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.name.includes(search);
    });
  }

  if (limit && filteredProducts.length) {
    filteredProducts = filteredProducts.slice(0, limit);
  }

  if (price) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.price < price;
    });
  }

  res.json(filteredProducts);
});

app.post("/", (req, res) => {
  res.status(200).send("Recieved post request.");
});

app.all("*", (req, res) => {
  res.status(404).send("Oops, page not found.");
});

app.listen("5432", () => {
  console.log("Server started");
});

/*console.log("Express Tutorial");*/
