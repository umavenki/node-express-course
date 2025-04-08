const { products } = require("./data");
const express = require("express");
const app = express();
app.use(express.static("./public"));

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

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

// app.get("/api/v1/price", (req, res) => {
//   const price = req.price;

app.all("*", (req, res) => {
  res.status(404).send("Oops, page not found.");
});

app.listen("3000", () => {
  console.log("Server started");
});

/*console.log("Express Tutorial");*/
