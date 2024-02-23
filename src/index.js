const express = require("express");
const cors = require("cors");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
// const swaggerDocument = require("./docs/swagger.json");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

require("dotenv").config();

const Router = require("./routes");
const connectDB = require("./config/connectDb");

const PORT = process.env.PORT;
const configViewEngine = require("./config/configViewEngine");

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("src/public"));

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mobile Shop By Duy Bách Đức",
      version: "1.0.0",
      description: "A simple ecommerce project",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*"],
};

const spec = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));

configViewEngine(app);
Router(app);
connectDB();

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/api`);
});
