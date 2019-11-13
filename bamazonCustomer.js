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
    welcomeShopper()
});

// Create a function that greets customer entering the store
function welcomeShopper() {
    // Inquirer package that prompts customer choice
    inquirer.prompt({
        name: "store",
        type: "rawlist",
        message: "Welcome to Bamazon. Are you interested in shopping with us today?",
        choices: ["Yes", "No"]
        // Allows a response to the choice user makes on the console
    }).then(function (answer) {
        if (answer.store === "Yes") {
            console.log("\n" + "We are glad you are doing buisness with us today." + "\n" + "We have a great selection of goods in stock." + "\n");
            showAllItems();
            // Ends connection automatically
        } else {
            console.log("Just browsing, get lost you freeloader!");
            connection.end();
        }
    });
}

// Create a function that list all the items available for purchase
function showAllItems() {
    connection.query("SELECT * FROM products", function (error, response) {
        if (error) throw error;
        // Connect console.table npm package and display table from MySQL Database
        console.table(response);
        startShopping()
    });
}

// Create a function that prompts and allows user to choose what item to buy
function startShopping() {
    // Inquirer package that prompts customer choice
    inquirer.prompt([
        {
            name: "itemID",
            type: "input",
            message: "What item would you like to purchase today? Choose your product based on the item id on the table:",
            validate: function (value) {
                if (!isNaN(value) && value < 11) {
                    return true;
                } else {
                    console.log("\n" + "Please enter a valid ID number between 1 & 10" + "\n");
                    return false;
                }
            }
        }
    ]).then(function (answer) {
        connection.query("SELECT * FROM products WHERE ?",
            [{ id: answer.itemID }], function (error, response) {
                if (error) throw error;
                var chooseID = answer.itemID;
                console.log("You have chosen to buy the item in id number: " + chooseID);
                selectQuantity();
            });
    });
}

// Create a function that allows user to choose how much of the item they wish to buy
function selectQuantity() {
    inquirer.prompt([
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to purchase today?",
            validate: function (value) {
                if (isNaN(value) == false) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]).then(function (answer) {
        connection.query('SELECT * FROM products WHERE itemID = ?', [answer.itemID], function (error, response) {
            if (error) throw error;
            console.log(response);
            if (answer.stock_quantity > response.stock_quantity) {
                console.log("Not enough in stock. Your order has been cancelled.");
                connection.end();
            } else {
                makePurchase()
            }
        })
    });
}

function makePurchase() {
    connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?", [quantity, product.item_id],
        function (error) {
            if (error) throw error;
            console.log("Thank you for your purchase of " + quantity + " " + product.product_name + "'s!");
            connection.end();
        }
    );
}

function checkStoreInventory() {

}