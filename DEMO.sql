Select customers.name as Cutomer, flowers.name as Flower, orders.quantity as Quantity,(orders.quantity*flowers.price) as sum
from customers
join orders on customers.id=orders.customer_id
join flowers on flowers.id=orders.flower_id;

Select customers.name as Cutomer, flowers.name as Flower, orders.quantity as Quantity,(orders.quantity*flowers.price) as sum
from customers
join orders on customers.id=orders.customer_id
join flowers on flowers.id=orders.flower_id where orders.id=?;