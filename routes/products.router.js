const router = require("express").Router();
const { Product } = require("../db/models");
const { Basket } = require("../db/models");

router.route("/product").get((req, res) => {
  Product.findAll({ raw: true })
    .then((allItems) => res.json(allItems))
    .catch((error) => console.log(error));
});

router.route("/product").post((req, res) => {
  const { id } = req.body;
  Product.findByPk(id).then((res) =>
    Basket.create({
      id: res.id,
      name: res.name,
      priceUSD: res.priceUSD,
      amount: res.amount,
    })
  );
});


module.exports = router;
