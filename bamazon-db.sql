DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
id INT NOT NULL AUTO_INCREMENT, 
product_name VARCHAR (100) NOT NULL,
department_name VARCHAR (40) NOT NULL,
price  DECIMAL(10,2) NOT NULL,
stock_quantity INT NULL,
PRIMARY KEY (ID)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Playstation 4 Pro Console", "Video Games" , 399.99, 100), 
("LG Refrigerator", "Kitchen" , 2499.99, 12), 
("Alienware GTX 2060 GPU Desktop", "Computers", 1299.99, 11),
("Sony 4K Professional Camcorder", "Cameras & Camcorders" , 3299.99, 4), 
("Apple IPhone 11 Pro", "Cell Phones" , 899.99, 42), 
("Nintendo Switch Console", "Video Games" , 249.99, 76), 
("NINJA Pressure Cooker", "Kitchen", 200.00, 20),
("MSI Laptop GTX 2080 GPU", "Computers", 1799.99, 8),
("Canon Mark V 24px Camera", "Cameras & Camcorders" , 799.99, 10), 
("Samsung Galaxy 10", "Cell Phones", 699.99, 30);

SELECT * FROM bamazon_db.products;