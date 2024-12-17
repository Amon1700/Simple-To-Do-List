import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const todoTable = sqliteTable("todoTable", { // Define the todo table schema
  id: text().primaryKey(), // Unique identifier for the todo item
  title: text().notNull(),
  description: text().notNull(),
  status: text().notNull().default('pending'),
  user_id: text().references(() => userTable.id).notNull() // Foreign key referencing the user who created the todo item
});

export const userTable = sqliteTable("userTable", { // Define the user table schema
  id: text().primaryKey(), // Unique identifier for the user
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
});