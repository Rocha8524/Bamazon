// Create variables that connect npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");

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
    console.log("Connected as id " + connection.threadId);
    queryAllItems();
});

function queryAllItems() {
    connection.query("SELECT * FROM products",
        function (error, response) {
            if (error) throw error;
            for (var i = 0; i < response.length; i++) {
                console.log("\n" + response[i].id + " | " + response[i].product_name + " | " + response[i].department_name + " | " + response[i].price + " | " + response[i].stock_quantity);
            }
            console.log("-----------------------------------");
        });
}
