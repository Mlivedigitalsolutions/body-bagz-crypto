import { 
  type User, 
  type InsertUser, 
  type LeaderboardEntry, 
  type InsertLeaderboardEntry, 
  type MonthlyReward, 
  type InsertMonthlyReward,
  users,
  leaderboardEntries,
  monthlyRewards
} from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq, desc, sql, and } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User>;
  
  // Leaderboard operations
  addLeaderboardEntry(entry: InsertLeaderboardEntry): Promise<LeaderboardEntry>;
  getLeaderboard(monthYear: string): Promise<Array<{ user: User; totalPoints: number; rank: number }>>;
  getUserMonthlyStats(userId: string, monthYear: string): Promise<{ totalPoints: number; entries: LeaderboardEntry[] }>;
  
  // Monthly rewards operations
  createMonthlyReward(reward: InsertMonthlyReward): Promise<MonthlyReward>;
  getMonthlyRewards(monthYear: string): Promise<Array<{ reward: MonthlyReward; user: User }>>;
  getUserRewards(userId: string): Promise<MonthlyReward[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        createdAt: new Date(),
      })
      .returning();
    return user;
  }

  async updateUser(id: string, userData: Partial<InsertUser>): Promise<User> {
    const [user] = await db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Leaderboard operations
  async addLeaderboardEntry(entry: InsertLeaderboardEntry): Promise<LeaderboardEntry> {
    const [leaderboardEntry] = await db
      .insert(leaderboardEntries)
      .values(entry)
      .returning();
    return leaderboardEntry;
  }

  async getLeaderboard(monthYear: string): Promise<Array<{ user: User; totalPoints: number; rank: number }>> {
    const result = await db
      .select({
        userId: leaderboardEntries.userId,
        totalPoints: sql<number>`sum(${leaderboardEntries.points})`,
        username: users.username,
        xUsername: users.xUsername,
        telegramUsername: users.telegramUsername,
        solanaWallet: users.solanaWallet,
        createdAt: users.createdAt,
        password: users.password,
        id: users.id,
      })
      .from(leaderboardEntries)
      .leftJoin(users, eq(leaderboardEntries.userId, users.id))
      .where(eq(leaderboardEntries.monthYear, monthYear))
      .groupBy(leaderboardEntries.userId, users.id, users.username, users.xUsername, users.telegramUsername, users.solanaWallet, users.createdAt, users.password)
      .orderBy(desc(sql`sum(${leaderboardEntries.points})`));

    return result.map((row, index) => ({
      user: {
        id: row.id!,
        username: row.username!,
        password: row.password!,
        xUsername: row.xUsername,
        telegramUsername: row.telegramUsername,
        solanaWallet: row.solanaWallet,
        createdAt: row.createdAt,
      },
      totalPoints: row.totalPoints,
      rank: index + 1,
    }));
  }

  async getUserMonthlyStats(userId: string, monthYear: string): Promise<{ totalPoints: number; entries: LeaderboardEntry[] }> {
    const entries = await db
      .select()
      .from(leaderboardEntries)
      .where(and(eq(leaderboardEntries.userId, userId), eq(leaderboardEntries.monthYear, monthYear)))
      .orderBy(desc(leaderboardEntries.createdAt));

    const totalPoints = entries.reduce((sum, entry) => sum + entry.points, 0);
    return { totalPoints, entries };
  }

  // Monthly rewards operations
  async createMonthlyReward(reward: InsertMonthlyReward): Promise<MonthlyReward> {
    const [monthlyReward] = await db
      .insert(monthlyRewards)
      .values(reward)
      .returning();
    return monthlyReward;
  }

  async getMonthlyRewards(monthYear: string): Promise<Array<{ reward: MonthlyReward; user: User }>> {
    const result = await db
      .select()
      .from(monthlyRewards)
      .leftJoin(users, eq(monthlyRewards.userId, users.id))
      .where(eq(monthlyRewards.monthYear, monthYear))
      .orderBy(monthlyRewards.position);

    return result.map(row => ({
      reward: {
        id: row.monthly_rewards.id,
        userId: row.monthly_rewards.userId,
        monthYear: row.monthly_rewards.monthYear,
        position: row.monthly_rewards.position,
        tokenReward: row.monthly_rewards.tokenReward,
        claimed: row.monthly_rewards.claimed,
        createdAt: row.monthly_rewards.createdAt,
      },
      user: row.users!,
    }));
  }

  async getUserRewards(userId: string): Promise<MonthlyReward[]> {
    return await db
      .select()
      .from(monthlyRewards)
      .where(eq(monthlyRewards.userId, userId))
      .orderBy(desc(monthlyRewards.createdAt));
  }
}

export const storage = new DatabaseStorage();
