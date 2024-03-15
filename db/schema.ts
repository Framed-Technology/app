import {
  serial,
  text,
  doublePrecision,
  integer,
  timestamp,
  pgEnum,
  uuid,
  json,
} from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { TickerInfo } from "./types";

export const genderEnum = pgEnum("gender", [
  "Male",
  "Female",
  "Other",
  "Perfer not to say",
]);

export const perceivedInvestmentRisk = pgTable("perceived_investment_risk", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  investmentId: text("investment_id"),
  userRisk: doublePrecision("user_risk").notNull(),
  birthYear: integer("birth_year"),
  gender: genderEnum("gender"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})

export const portfolioRiskReturn = pgTable("portfolio_risk_return", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  portfolio: json("portfolio").notNull().$type<{ ticker: string, allocation: number }[]>(),
  rvol: doublePrecision("rvol").notNull(),
  ret: doublePrecision("ret").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})


export const tickerInfo = pgTable("ticker_info", {
  id: serial("id").primaryKey(),
  ticker: text("ticker").notNull(),
  name: text("name").notNull(),
  info: json("info").notNull().$type<TickerInfo>(),


})