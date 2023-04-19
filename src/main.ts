import { getMongoURI } from "./lib/config";
import { startApp } from "./lib";
import Container from "typedi";
import { SessionService } from "./services";
import {
  ArticleApiController,
  HomeController,
  SessionApiController,
  UserApiController,
} from "./controllers";

startApp({
  apiControllers: [
    ArticleApiController,
    HomeController,
    SessionApiController,
    UserApiController,
  ],
  pageControllers: [],
  jwtValidation: Container.get(SessionService).validate,
});
