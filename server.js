const express = require("express");
var csv = require("fast-csv");
const { check, validationResult } = require("express-validator");
// const User = require("./models/Users");
const Records = require("./RecordsModel");
//Database
const db = require("./dbconfig");

const port = 5000;

//Db connection
db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const app = express();
app.use(express.json());
app.get("/", (req, res) => res.json({ message: "Hello World" }));
app.post(
  "/upload",
  [
    check("name", "Name is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let csvStream = csv
        .parseFile("./5m Sales Records.csv", { headers: true })
        .on("data", async function (record) {
          try {
            //     const newUser = new User(req.body);
            const newRecord = new Records({
              Region: record.Region,
              Country: record.Country,
              Item_Type: record["Item Type"],
              Sales_Channel: record["Sales Channel"],
              Order_Priority: record["Order Priority"],
              Order_Date: record["Order Date"],
              Order_ID: record["Order ID"],
              Ship_Date: record["Ship Date"],
              Units_Sold: record["Units Sold"],
              Unit_Price: record["Unit Price"],
              Unit_Cost: record["Unit Cost"],
              Total_Revenue: record["Total Revenue"],
              Total_Cost: record["Total Cost"],
              Total_Profit: record["Total Profit"],
            });
            await newRecord.save();

            res.status(200).json("The data is being uploaded. Please wait!");
          } catch (error) {}
          csvStream.resume();
        })
        .on("end", function () {
          console.log("Job is done!");
          res
            .status(201)
            .json("All the data has been uploaded to the Database!");
        })
        .on("error", function (error) {
          res.status(400).json({ error: error.message });
        });
    } catch (error) {
      console.error(error);
    }
  }
);

app.listen(port, () => console.log(`App listening on port ${port}!`));
