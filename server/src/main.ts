import "reflect-metadata";
import * as express from "express";
import multer from "multer";
import bodyParser from "body-parser";
import compression from "compression";
import logger from "./modules/logger.js";
import { createExpressServer } from "routing-controllers";
import { connectDataBase } from "./connectDataBase.js";
import controllers from "./controllers/index.js";
import config from "./config.js";
import { checkAuth } from "./middleware/checkAuth";

const storage = multer.diskStorage({
  destination(req: express.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
    return callback(null, "./public");
  },
  filename(req: express.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
    return callback(null, `${new Date().toISOString().split(":")[0]}-${Date.now()}.${file.originalname.split(".")[1]}`);
  }
});

// const limits = {
//   fileSize: 1024 * 1024 * 15
// }

const upload = multer({ storage });

const { PORT } = config;
const app = createExpressServer({
  routePrefix: "/api",
  controllers: [...controllers]
});

app.set("trust proxy", true);
app.use(compression());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/file/upload-image", upload.single("file"), (req: any, res: any, next: (err?: any) => any) => {
  try {
    return res.send({
      status: "ok"
    });
  } catch (e) {
    return res.send({
      message: "",
      error: e
    });
  }
});

function start() {
  try {
    app.listen(PORT);
    connectDataBase();
    logger.info(`Server started successfully`);
    logger.info(`${config.CLIENT_URL}:${PORT}`);
  } catch (error) {
    logger.error(`Unable to connect to the server:, ${error}`);
  }
}

start();
