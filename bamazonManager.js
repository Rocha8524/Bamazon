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
                restockInventory();
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
                connection.end();
            }
        });
    })
};

function restockInventory() {
    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "What is the item id number you need to restock?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How much wouould you like to add to your inventory?"
        }
    ]).then(function (answers) {
        var addedQuantity = answers.quantity;
        var productID = answers.ID;
        connection.query("SELECT * FROM ")
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
            name: "product-name",
            type: "input",
            message: "What item would you like to add to your inventory?"
        },
        {
            name: "category",
            type: "input",
            message: "What retail department would you like to place your item"
        },
        {
            name: "price",
            type: "input",
            message: "How much will the item cost for retail customers?"
        },
        {
            name: "stock-quantity",
            type: "input",
            message: "How much of the item would you like to stock?"
        },
    ]).then(function (answers) {
        var id = answers.ID;
        var name = answers.product - name;
        var department = answers.category;
        var price = answers.price;
        var quantity = answers.stock - quantity;
        connection.query("INSERT INTO products"(id, product_name, department_name, price, stock_quantity), VALUES("' + id + '", "' + name + '", "' + category + '", ' + price + ', ' + quantity +  '));
    });
};




function removeItem() {

}