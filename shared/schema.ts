import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, index, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  phone: text("phone"),
  xUsername: text("x_username"),
  telegramUsername: text("telegram_username"),
  solanaWallet: text("solana_wallet"),
  isAdmin: boolean("is_admin").default(false),
  loginAttempts: integer("login_attempts").default(0),
  lockedUntil: timestamp("locked_until"),
  lastLoginAt: timestamp("last_login_at"),
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

// Saved content for users
export const savedContent = pgTable("saved_content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  contentType: text("content_type").notNull(), // 'tweet', 'meme', 'pfp'
  title: text("title").notNull(),
  content: text("content").notNull(), // Tweet text or image URL or PFP name
  metadata: json("metadata"), // Additional data like meme text, prompt used, etc.
  isFavorite: boolean("is_favorite").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  index("idx_saved_content_user").on(table.userId),
  index("idx_saved_content_type").on(table.contentType),
  index("idx_saved_content_favorite").on(table.isFavorite),
]);

// User preferences and settings
export const userPreferences = pgTable("user_preferences", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  autoSaveContent: boolean("auto_save_content").notNull().default(true),
  defaultPfpStyle: text("default_pfp_style").default("cyberpunk"),
  preferredTweetTone: text("preferred_tweet_tone").default("bullish"),
  notifications: json("notifications").default({
    newContent: true,
    leaderboard: true,
    rewards: true
  }),
  theme: text("theme").default("cyberpunk"),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("idx_user_preferences_user").on(table.userId),
]);

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  phone: true,
  xUsername: true,
  telegramUsername: true,
  solanaWallet: true,
  isAdmin: true,
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

export const insertSavedContentSchema = createInsertSchema(savedContent).pick({
  userId: true,
  contentType: true,
  title: true,
  content: true,
  metadata: true,
  isFavorite: true,
});

export const insertUserPreferencesSchema = createInsertSchema(userPreferences).pick({
  userId: true,
  autoSaveContent: true,
  defaultPfpStyle: true,
  preferredTweetTone: true,
  notifications: true,
  theme: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertLeaderboardEntry = z.infer<typeof insertLeaderboardEntrySchema>;
export type LeaderboardEntry = typeof leaderboardEntries.$inferSelect;
export type InsertMonthlyReward = z.infer<typeof insertMonthlyRewardSchema>;
export type MonthlyReward = typeof monthlyRewards.$inferSelect;
export type InsertSavedContent = z.infer<typeof insertSavedContentSchema>;
export type SavedContent = typeof savedContent.$inferSelect;
export type InsertUserPreferences = z.infer<typeof insertUserPreferencesSchema>;
export type UserPreferences = typeof userPreferences.$inferSelect;

// Meetups tables
export const meetups = pgTable("meetups", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  city: text("city").notNull(),
  country: text("country").notNull(),
  eventAt: timestamp("event_at").notNull(),
  tags: json("tags").default([]).$type<string[]>(),
  images: json("images").default([]).$type<string[]>(),
  hidden: boolean("hidden").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("idx_meetups_user").on(table.userId),
  index("idx_meetups_city").on(table.city),
  index("idx_meetups_event_date").on(table.eventAt),
]);

export const meetupRsvps = pgTable("meetup_rsvps", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  meetupId: varchar("meetup_id").notNull().references(() => meetups.id, { onDelete: "cascade" }),
  userId: varchar("user_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  index("idx_rsvp_meetup").on(table.meetupId),
  index("idx_rsvp_user").on(table.userId),
]);

// Marketplace tables
export const listings = pgTable("listings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  category: text("category").notNull(), // art, music, merch, services, events, other
  description: text("description").notNull(),
  priceText: text("price_text"), // Optional price as text
  contact: text("contact"), // X handle or Telegram username
  images: json("images").default([]).$type<string[]>(),
  hidden: boolean("hidden").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("idx_listings_user").on(table.userId),
  index("idx_listings_category").on(table.category),
  index("idx_listings_created").on(table.createdAt),
]);

// Reports table for moderation
export const reports = pgTable("reports", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type").notNull(), // "listing" | "meetup"
  refId: varchar("ref_id").notNull(), // ID of the reported item
  userId: varchar("user_id").notNull().references(() => users.id),
  reason: text("reason").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  index("idx_reports_type_ref").on(table.type, table.refId),
  index("idx_reports_user").on(table.userId),
]);

export const insertMeetupSchema = createInsertSchema(meetups).pick({
  userId: true,
  title: true,
  description: true,
  city: true,
  country: true,
  eventAt: true,
  tags: true,
  images: true,
});

export const insertMeetupRsvpSchema = createInsertSchema(meetupRsvps).pick({
  meetupId: true,
  userId: true,
});

export const insertListingSchema = createInsertSchema(listings).pick({
  userId: true,
  title: true,
  category: true,
  description: true,
  priceText: true,
  contact: true,
  images: true,
});

export const insertReportSchema = createInsertSchema(reports).pick({
  type: true,
  refId: true,
  userId: true,
  reason: true,
});

export type InsertMeetup = z.infer<typeof insertMeetupSchema>;
export type Meetup = typeof meetups.$inferSelect;
export type InsertMeetupRsvp = z.infer<typeof insertMeetupRsvpSchema>;
export type MeetupRsvp = typeof meetupRsvps.$inferSelect;
export type InsertListing = z.infer<typeof insertListingSchema>;
export type Listing = typeof listings.$inferSelect;
export type InsertReport = z.infer<typeof insertReportSchema>;
export type Report = typeof reports.$inferSelect;

// Password reset tokens
export const passwordResetTokens = pgTable("password_reset_tokens", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  token: text("token").notNull().unique(),
  method: text("method").notNull(), // 'email' or 'sms'
  contact: text("contact").notNull(), // email address or phone number
  expiresAt: timestamp("expires_at").notNull(),
  used: boolean("used").default(false),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  index("idx_password_reset_user").on(table.userId),
  index("idx_password_reset_token").on(table.token),
]);

export const insertPasswordResetTokenSchema = createInsertSchema(passwordResetTokens).pick({
  userId: true,
  token: true,
  method: true,
  contact: true,
  expiresAt: true,
});

export type InsertPasswordResetToken = z.infer<typeof insertPasswordResetTokenSchema>;
export type PasswordResetToken = typeof passwordResetTokens.$inferSelect;
