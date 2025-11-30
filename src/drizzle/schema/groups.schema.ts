import { pgTable, text, integer, index, serial } from 'drizzle-orm/pg-core';
import { users } from './users.schema';
import { primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const groups = pgTable('groups', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

// Join Table
export const usersToGroup = pgTable(
  'usersToGroup',
  {
    userId: integer('userId')
      .references(() => users.id)
      .notNull(),

    groupId: integer('groupId')
      .references(() => groups.id)
      .notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.groupId, table.userId] }),
    index('userIdIndex').on(table.userId),
  ],
);

export const usersToGroupRelations = relations(usersToGroup, ({ one }) => ({
  user: one(users, { fields: [usersToGroup.userId], references: [users.id] }),
  group: one(groups, {
    fields: [usersToGroup.groupId],
    references: [groups.id],
  }),
}));
