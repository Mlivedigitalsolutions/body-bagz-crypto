import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  xUsername: text("x_username"),
  telegramUsername: text("telegram_username"),
  solanaWallet: text("solana_wallet"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const leaderboardEntries = pgTable("leaderboard_entries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  actionType: text("action_type").notNull(), // 'tweet', 'pfp_download', 'meme_creation', 'meme_share'
  points: integer("points").notNull().default(1),
  monthYear: text("month_year").notNull(), // Format: 'YYYY-MM' for grouping
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  index("idx_leaderboard_month_year").on(table.monthYear),
  index("idx_leaderboard_user_month").on(table.userId, table.monthYear),
]);

export const monthlyRewards = pgTable("monthly_rewards", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  monthYear: text("month_year").notNull(), // Format: 'YYYY-MM'
  position: integer("position").notNull(), // 1st, 2nd, 3rd place etc
  tokenReward: integer("token_reward").notNull(),
  claimed: integer("claimed").notNull().default(0), // 0 = not claimed, 1 = claimed
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  index("idx_monthly_rewards_month").on(table.monthYear),
]);

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  xUsername: true,
  telegramUsername: true,
  solanaWallet: true,
});

export const insertLeaderboardEntrySchema = createInsertSchema(leaderboardEntries).pick({
  userId: true,
  actionType: true,
  points: true,
  monthYear: true,
});

export const insertMonthlyRewardSchema = createInsertSchema(monthlyRewards).pick({
  userId: true,
  monthYear: true,
  position: true,
  tokenReward: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertLeaderboardEntry = z.infer<typeof insertLeaderboardEntrySchema>;
export type LeaderboardEntry = typeof leaderboardEntries.$inferSelect;
export type InsertMonthlyReward = z.infer<typeof insertMonthlyRewardSchema>;
export type MonthlyReward = typeof monthlyRewards.$inferSelect;
