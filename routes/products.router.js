const router = require("express").Router();
const { Product } = require("../db/models");
const { Basket } = require("../db/models");

router.route("/").get((req, res) => {
  Product.findAll({ raw: true })
    .then((allItems) => res.json(allItems))
    .catch((error) => console.log(error));
});

router.route("/").post((req, res) => {
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

// router.route("/update").put((req, res) => {
//   const { id, status, text } = req.body;
//   if (req.session.admin) {
//     if (status) {
//       Task.update({ status: status }, { where: { id }, returning: true });
//     } else {
//       Task.update(
//         { text: text, change: "Отредактировано администратором" },
//         { where: { id }, returning: true }
//       );
//       res.sendStatus(201);
//     }
//   } else {
//     res.sendStatus(500);
//   }
// });

module.exports = router;
