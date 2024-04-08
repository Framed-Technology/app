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

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
})

export const landingInterest = pgTable("landing_interest", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
})

export const coursesInterest = pgTable("courses_interest", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
})

export const communityInterest = pgTable("community_interest", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message"),
})


export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  iss: text("iss").notNull(),
  sub: text("sub").notNull(),
  email: text("email").notNull().unique(),
  picture: text("picture"),
  name: text("name"),
  givenName: text("given_name"),
  familyName: text("family_name"),
  iat: text("iat"),
  exp: text("exp"),
})

