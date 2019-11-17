// Create variables that connect npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

// Create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "WARNING",

    // Connects to the database used in MySQL
    database: "bamazon_db"
});

// Connect to the mysql server and sql database
connection.connect(function (error) {
    if (error) throw error;
    storeInquirer();
});

function storeInquirer() {
    inquirer.prompt([{
        name: "manager",
        type: "list",
        message: "Choose an option below to manage your current Bamazon inventory:",
        choices: ["View Current Inventory", "Restock Inventory", "Add New Item", "Remove A Product"]
    }]).then(function (answer) {
        switch (answer.manager) {
            case "View Current Inventory":
                displayInventory();
                break;
            case "Restock Inventory":
                restockRequest();
                break;
            case "Add New Item":
                addItem();
                break;
            case "Remove A Product":
                removeItem();
                break;
        }
    });
};

// Create a function that list all the items available for purchase
function displayInventory() {
    connection.query("SELECT * FROM products", function (error, response) {
        if (error) throw error;
        // Connect console.table npm package and display table from MySQL Database
        console.log("\n");
        console.table(response);
        inquirer.prompt([{
            name: "continue",
            type: "list",
            message: "Would you like to go back to the main menu?",
            choices: ["Yes", "No"]
        }]).then(function (answer) {
            if (answer.continue === "Yes") {
                console.log("\n");
                storeInquirer();
            } else {
                console.log("\n" + "Have a good day!")
                connection.end();
            }
        });
    })
};

function restockRequest() {
    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "What item do you need to restock?",
            validate: function (value) {
                if (isNaN(value) == false) {
                    return true
                } else {
                    return false;
                }
            }
        },
        {
            name: "Quantity",
            type: "input",
            message: "How much would you like to add to your inventory?",
            validate: function (value) {
                if (isNaN(value) == false) {
                    return true
                } else {
                    return false;
                }
            }
        }
    ]).then(function (answers) {
        var quantity = answers.Quantity;
        var itemID = answers.ID;
        restockInventory(quantity, itemID);
    });
};

function restockInventory(quantity, itemID) {
    connection.query("SELECT * FROM products WHERE id = " + itemID, function (error) {
        if (error) throw error;
        connection.query("UPDATE Products SET stock_quantity = stock_quantity + " + quantity);
        console.log("\n" + "The product has been updated!")
        displayInventory();
    })
};

function addItem() {
    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "Add ID Number"
        },
        {
            name: "Name",
            type: "input",
            message: "What item would you like to add to your inventory?"
        },
        {
            name: "Department",
            type: "input",
            message: "What retail department would you like to place your item?"
        },
        {
            name: "Price",
            type: "input",
            message: "How much will the item cost for retail customers?"
        },
        {
            name: "Quantity",
            type: "input",
            message: "How much of the item would you like to stock?"
        },
    ]).then(function (answers) {
        var id = answers.ID;
        var name = answers.Name;
        var department = answers.Department;
        var price = answers.Price;
        var quantity = answers.Quantity;
        buildNewItem(id, name, department, price, quantity);
    });
};

function buildNewItem(id, name, department, price, quantity) {
    connection.query('INSERT INTO products (id, product_name, department_name, price,stock_quantity) VALUES("' + id + '","' + name + '","' + department + '",' + price + ',' + quantity + ')');
    displayInventory()
};

function removeItem() {
    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "What item would you like to remove?"
        },
    ]).then(function (answers, response) {
        var id = answers.ID;
        console.table(response);
        removeInventory(id);
    });

    function removeInventory(id) {
        connection.query("DELETE FROM Products WHERE id = " + id);
        displayInventory();
    };
};