const db = require("../config/db");

exports.getAllOrders = (req, res) => {
  db.query(
    "Select customers.name as Cutomer, flowers.name as Flower, orders.quantity as Quantity,(orders.quantity*flowers.price) as sum from customers join orders on customers.id=orders.customer_id join flowers on flowers.id=orders.flower_id;",
    (error, result, fields) => {
      if (error) {
        console.log("Error retrieving orders: ", error);
        return res.status(500).json({ error: "Internal System Error" });
      }
      res.json(result);
    }
  );
};

exports.createOrder = (req, res) => {
  const { customer_id, flower_id, quantity } = req.body;
  db.query(
    "INSERT INTO orders (customer_id, flower_id, quantity) VALUES(?,?,?)",
    [customer_id, flower_id, quantity],
    (error, results) => {
      if (error) {
        console.log("Error retrieving order: ", error);
        res.status(500).json({ error: "Internal System Error" });
      }
      res.json({
        message: "Order created successfully",
        orderId: results.insertId,
      });
    }
  );
};

exports.getOrderById = (req, res) => {
  const orderId = req.params.id;
  db.query(
    "Select customers.name as Cutomer, flowers.name as Flower, orders.quantity as Quantity,(orders.quantity*flowers.price) as sum from customers join orders on customers.id=orders.customer_id join flowers on flowers.id=orders.flower_id where orders.id=?",
    [orderId],
    (error, results) => {
      if (error) {
        console.log("Error retrieving order: ", error);
        res.status(500).json({
          error: "Internal System Error",
        });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(results[0]);
    }
  );
};

exports.updateOrder = (req, res) => {
  const { customer_id, flower_id, quantity } = req.body;
  const orderId = req.params.id;
  db.query(
    "UPDATE orders SET customer_id=?, flower_id=?, quantity=? WHERE id=?",
    [customer_id, flower_id, quantity, orderId],
    (error, results) => {
      if (error) {
        console.log("Error updating order: ", error);
        return res.status(500).json({ error: "Internal System Error" });
      }
      res.json({
        message: "Order updated successfully",
      });
    }
  );
};

exports.deleteOrder = (req, res) => {
  const orderId = req.params.id;
  db.query("DELETE FROM orders WHERE id=?", [orderId], (error, results) => {
    if (error) {
      console.log("Error deleting order: ", error);
      return res.status(500).json({ error: "Internal System Error" });
    }
    res.json({ message: "Order deleted successfully" });
  });
};
