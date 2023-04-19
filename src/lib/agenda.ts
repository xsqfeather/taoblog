import Agenda from "agenda";
import { getAgendaMongoURI } from "./config";

export const agenda = new Agenda({ db: { address: getAgendaMongoURI() } });
