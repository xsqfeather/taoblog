import { Service } from "typedi";
import { SESSION_JOB } from "./namespaces";
import { agenda } from "../lib/agenda";
import { AgendaService } from "../lib/types";
import { Session, SessionModel } from "../models/session.model";
import { Job } from "agenda";

@Service()
export class SessionExpiredJob implements AgendaService<Session> {
  eventName = "expired";
  constructor() {
    agenda.define(SESSION_JOB + this.eventName, this.handle);
  }
  async handle(job: Job<Session>) {
    const session = job.attrs.data;
    await SessionModel.deleteOne({ id: session.id });
  }
  start(session: Session) {
    agenda.schedule(session.expiresAt, SESSION_JOB + this.eventName, session);
  }
}
