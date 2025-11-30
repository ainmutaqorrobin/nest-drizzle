import { relations } from 'drizzle-orm';
import { text, serial, pgTable } from 'drizzle-orm/pg-core';
import { posts } from './posts.schema';
import { comments } from './comments.schema';
import { profileInfo } from './profileInfo.schema';
import { usersToGroup } from './groups.schema';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
});

export const usersRelation = relations(users, ({ one, many }) => ({
  comments: many(comments),
  posts: many(posts),
  profile: one(profileInfo),
  userToGroup: many(usersToGroup),
}));
