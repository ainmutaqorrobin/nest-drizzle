import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';
import { users } from './users.schema';
import { primaryKey } from 'drizzle-orm/pg-core';

export const groups = pgTable('groups', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

// Join Table
export const usersToGroup = pgTable(
  'usersToGroup',
  {
    userId: integer('userId').references(() => users.id),
    groupId: text('groupId').references(() => groups.id),
  },
  (table) => ({
    //composite key
    pk: primaryKey({ columns: [table.groupId, table.userId] }),
  }),
);
