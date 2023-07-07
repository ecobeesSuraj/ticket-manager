import express from "express"; // ,{ Request, Response }
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import compress from "compression";
import bodyParser = require("body-parser");

import router from "../routes/v1/index";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const portNumber = process.env.PORT;

app.use(express.json());

app.use(cookieParser());

app.use(compress());

app.use(helmet());

app.use(cors());

app.listen(portNumber, () => {
  console.log(`listening to port ${portNumber}`);
});

app.use(router);
