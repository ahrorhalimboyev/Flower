const db = require("../config/db");

exports.getAllFlowers = (req, res) => {
  db.query("SELECT * FROM flowers", (error, results, fields) => {
    if (error) {
      console.log("Error retrieving flowers: ", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
    //console.log(fields);
  });
};

exports.getFlowerById = (req, res) => {
  const flowerId = req.params.id;
  db.query("SELECT * FROM flowers WHERE id=?", [flowerId], (error, results) => {
    if (error) {
      console.log("Error retrieving flower: ", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Flower not found" });
    }
    res.json(results[0]);
  });
};

exports.createFlower = (req, res) => {
  const { name, color, price } = req.body;
  db.query(
    "INSERT INTO flowers (name, color, price) VALUES(?,?,?)",
    [name, color, price],
    (error, results) => {
      if (error) {
        console.log("Error creating flower: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      console.log(results);
      res.json({
        message: "Flower created successfully",
        flowerId: results.insertId,
      });
    }
  );
};

exports.updateFlower = (req, res) => {
  const flowerId = req.params.id;
  const { name, color, price } = req.body;
  db.query(
    "UPDATE flowers SET name=?, color=?, price=? WHERE id=?",
    [name, color, price, flowerId],
    (error) => {
      if (error) {
        console.log("Error updating flower: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json({
        message: "Flower updated successfully",
      });
    }
  );
};

exports.deleteFlower = (req, res) => {
  const flowerId = req.params.id;
  db.query("DELETE FROM flowers WHERE id=?", [flowerId], (error) => {
    if (error) {
      console.log("Error deleting flower: ", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({
      message: "Flower deleted successfully",
    });
  });
};
