const router = require("express").Router();
const { Basket } = require("../db/models");
const { Product } = require("../db/models");

router.route("/").get((req, res) => {
  Basket.findAll({ raw: true })
    .then((allItems) => {
      const idItems = allItems.map((item) => item.id);
      Product.findAll({
        raw: true,
        where: {
          id: idItems,
        },
      }).then((data) => res.json({ data, allItems }));
    })
    .catch((error) => console.log(error));
});

router.route("/del").delete((req, res) => {
  const { id } = req.body;
  Basket.destroy({ where: { id } });
});

router.route("/buy").post((req, res) => {
  const { id } = req.body;
  Product.findAll({ where: { id }, raw: true })
  .then((data) => {
    const checkAmount = data.map(el => el.amount).includes(0)
    if(!checkAmount){
    data.map((el) => {
      Product.update({ amount: el.amount - 1 }, { where: { id: el.id }, returning: true })
    });
    Basket.destroy({ where: { id } });
    res.sendStatus(201)
    } else {
      res.sendStatus(500)
    }
  });
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
