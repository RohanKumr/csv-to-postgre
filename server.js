const express = require("express");
const app = express();
const cors = require("cors");
var fs = require("fs");
var csv = require("fast-csv");
const pool = require("./pgdb");
const { check, validationResult } = require("express-validator");

app.use(cors());
app.use(express.json()); //req.boddy

app.use(
  "/validate",
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
      if (true) {
        return res.status(400).json(req.body);
      }
    } catch (err) {
      res.status(500).send("Server");
    }
  }
);

app.post(
  "/upload-csv",
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
      pool.connect(function (err) {
        if (err) {
          console.log(err);
        }
      });
      res
        .status(201)
        .json("Please Wait! Data is being uploaded to the Database ");
      let csvStream = csv
        //   .parseFile("./FL_insurance_sample.csv", { headers: true })
        .parseFile("./5m Sales Records.csv", { headers: true })
        .on("data", function (record) {
          // csvStream.pause();
          let Region = record.Region;
          let Country = record.Country;
          let Item_Type = record["Item Type"];
          let Sales_Channel = record["Sales Channel"];
          let Order_Priority = record["Order Priority"];
          let Order_Date = record["Order Date"];
          let Order_ID = record["Order ID"];
          let Ship_Date = record["Ship Date"];
          let Units_Sold = record["Units Sold"];
          let Unit_Price = record["Unit Price"];
          let Unit_Cost = record["Unit Cost"];
          let Total_Revenue = record["Total Revenue"];
          let Total_Cost = record["Total Cost"];
          let Total_Profit = record["Total Profit"];

          pool.query(
            // "INSERT INTO FL_insurance_sample(policyID, statecode, country) \
            //     VALUES($1, $2, $3)",
            // [policyID, statecode, county],
            "INSERT INTO fivemilentries(Region, Country, Item_Type, Sales_Channel,Order_Priority,Order_Date,Order_ID,Ship_Date,Units_Sold,Unit_Price,Unit_Cost,Total_Revenue,Total_Cost,Total_Profit) \
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)",
            [
              Region,
              Country,
              Item_Type,
              Sales_Channel,
              Order_Priority,
              Order_Date,
              Order_ID,
              Ship_Date,
              Units_Sold,
              Unit_Price,
              Unit_Cost,
              Total_Revenue,
              Total_Cost,
              Total_Profit,
            ],
            function (err) {
              if (err) {
                console.log(err);
              }
            }
          );
          //   ++counter;
          // }

          csvStream.resume();
        })
        .on("end", function () {
          console.log("Job is done!");
          res.status(201).json("All Data had been uploaded to the Database!");
        })
        .on("error", function (err) {
          res.status(400).json({ error: error.message });
        });
    } catch (err) {
      console.log(err.meessage);
    }
  }
);

app.listen(5000, () => {
  console.log("Server running on post 5000");
});
