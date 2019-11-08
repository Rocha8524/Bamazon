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
    database: "bamazon_db"
});

// Connect to the mysql server and sql database
connection.connect(function (error) {
    if (error) throw error;
    welcomeShopper()
});

function welcomeShopper() {
    inquirer.prompt({
        name: "choice",
        type: "rawlist",
        message: "Welcome to Bamazon. Are you interested in shopping with us today?",
        choices: ["Yes", "No"]
    })
        .then(function (answer) {
            if (answer.store === "Yes") {
                console.log("\n" + "We are glad you are doing buisness with us today." + "\n" + "We have a great selection of goods in stock." + "\n");
                showAllItems();
            } else {
                console.log("Just browsing, get lost you freeloader!");
                connection.end();
            }
        });
}

function showAllItems() {
    connection.query("SELECT * FROM products",
        function (error, response) {
            if (error) throw error;
            console.table(response);
            startShopping()
        });
}

function startShopping(storeInventory) {
    inquirer.prompt([{
        name: "choose",
        type: "input",
        message: "What item would you like to purchase today?",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }]).then(function (value) {
        var chooseID = parseInt(value.choose);
        var item = checkStoreInventory(chooseID, storeInventory);
        if (item) {
            selectQuantity(item);
        } else {
            console.log("Sorry, we don't have this item available. Please check back with us tomorrow!");
            showAllItems();
        }
    });
}

function selectQuantity(product) {
    inquirer.prompt([{
        name: "quantity",
        type: "input",
        message: "How many would you like to purchase today?",
        validate: function (value) {
            return value > 0;
        }
    }
    ]).then(function (value) {
        var quantity = parseInt(value.quantity);

        if (quantity > product.stock_quantity) {
            console.log("Not enough in stock. Please purchase something else.")
        } else {
            makePurchase()
        }
    });
}

function makePurchase(product, quantity) {
    connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?",
        [quantity, product.item_id],
        function (error, response) {
            if (error) throw error;
            console.log(response.affectedRows + " products updated!\n");
            connection.end();
        }
    );
}

function checkStoreInventory() {

}