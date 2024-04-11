import "reflect-metadata";
import * as express from "express";
import path from "path";
import multer from "multer";
import config from "./config.js";
import bodyParser from "body-parser";
import compression from "compression";
import logger from "./modules/logger.js";
import { createExpressServer } from "routing-controllers";
import { AppDataSource, connectDataBase } from "./connectDataBase.js";
import controllers from "./controllers/index.js";
import { checkAuth } from "./middleware/checkAuth";
import commonjsVariables from "commonjs-variables-for-esmodules";
import TokenService from "./service/tokenService";
import { User, File } from "./entity";
import * as fs from "fs";
//   @ts-ignore
const { __filename, __dirname } = commonjsVariables(import.meta);

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
app.use("/public", express.static(path.join(__dirname, "public")));

const storage = multer.diskStorage({
  async destination(req: express.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
    const { crm_authorized }: any = req.headers;
    const token = crm_authorized.split("crm_auth_token ")[1];
    if (!token) {
      return null;
    }

    const { id } = new TokenService().validateAccessToken(token);
    const userRepository = AppDataSource.getRepository(User);

    const userFromDB = await userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.agency", "agency")
      .where("user.id = :userId", { userId: id })
      .getOne();

    const agencyID = userFromDB.agency.id;
    if (!agencyID) {
      return null;
    }

    const directory = __dirname + "/public/agency-" + agencyID + "/";
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }

    return callback(null, directory);
  },
  filename(req: express.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
    const fileName = `${new Date().toISOString().split(":")[0]}-${Date.now()}.${file.originalname.split(".")[1]}`;
    return callback(null, fileName);
  }
});

const limits = {
  fileSize: 1024 * 1024 * 15
};

const upload = multer({ storage, limits });

app.post(
  "/api/file/upload-image",
  checkAuth,
  upload.single("file"),
  async (req: any, res: any, next: (err?: any) => any) => {
    try {
      const { crm_authorized }: any = req.headers;
      const token = crm_authorized.split("crm_auth_token ")[1];
      if (!token) {
        return res.send({
          message: 'Ошибка, токен невалиден'
        })
      }

      const { id } = new TokenService().validateAccessToken(token);
      const userRepository = AppDataSource.getRepository(User);
      const userFromDB = await userRepository.findOneBy({
        id
      })

      if (!userFromDB) {
        return res.send({
          message: 'Ошибка, пользователь не указан'
        })
      }

      const fileRepository = AppDataSource.getRepository(File)
      const file = JSON.parse(JSON.stringify(req.file));

      file.destination = file.destination.split("/src")[1]
      file.path = file.path.split("/src")[1]

      delete file.fieldname
      delete file.originalname
      delete file.encoding

      const createFile = new File()
      createFile.path = file.path
      createFile.size = file.size
      createFile.user = userFromDB
      createFile.isPublished = false
      createFile.isDeleted = false

      const savedFile = await fileRepository.save(createFile)
      return res.send(savedFile);
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
