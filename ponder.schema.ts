import { onchainTable, relations, onchainEnum, index } from "ponder";

export const deliveryStatus = onchainEnum("delivery_status", ["pending", "in_progress", "completed"]);
export const transactionPurpose = onchainEnum("transaction_purpose", ["created", "updated", "deleted"]);

// Deliveries Table
export const delivery = onchainTable("deliveries", (t) => ({
  id: t.text().primaryKey(), // Delivery ID
  description: t.text().notNull(),
  deliveryStatus: deliveryStatus().notNull(),
  customer: t.text().notNull(),
}), 
(table) => ({
  index: index().on(table.id),
})
);

// Delivery Transactions Table
export const deliveryTransactions = onchainTable("delivery_transactions", (t) => ({
  transactionId: t.text().primaryKey(), // Unique Transaction ID
  deliveryId: t.text().notNull(), // Foreign Key to Deliveries
  transactionPurpose: transactionPurpose().notNull(),
  timestamp: t.bigint().notNull(),
}),
(table) => ({
  index: index().on(table.transactionId),
})
);

// Relations for Deliveries Table
export const deliveriesRelations = relations(delivery, ({ many }) => ({
  transactions: many(deliveryTransactions),
}));

// Relations for Delivery Transactions Table
export const deliveryTransactionsRelations = relations(deliveryTransactions, ({ one }) => ({
  delivery: one(delivery, { fields: [deliveryTransactions.deliveryId], references: [delivery.id] }),
}));
