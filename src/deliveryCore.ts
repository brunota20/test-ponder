import { eq, sql } from "ponder";
import { ponder } from "ponder:registry";
import { delivery, deliveryTransactions } from "ponder:schema";

type DeliveryStatus = "Pending" | "In progress" | "Completed";

const formatStatus = (status: string): DeliveryStatus => {
  const formatted = status
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/^./, (char) => char.toUpperCase());

  if (!["Pending", "In progress", "Completed"].includes(formatted)) {
    throw new Error(`Invalid status value: ${status}`);
  }

  return formatted as DeliveryStatus;
};

// Event: DeliveryCreated
ponder.on("DeliveryTracker:DeliveryCreated", async ({ context, event }) => {
  const { deliveryId, description, status, customer } = event.args;

  const formattedStatus = formatStatus(status).toLowerCase();
  if (!["pending", "in_progress", "completed"].includes(formattedStatus)) {
    console.error(`Invalid status '${status}' for DeliveryCreated event.`);
    return;
  }

  await context.db.insert(delivery).values({
    id: deliveryId.toString(),
    description,
    deliveryStatus: formattedStatus as "pending" | "in_progress" | "completed",
    customer,
  });

  console.log(`Delivery ${deliveryId} created:`, { description, status, customer });
});

// Event: DeliveryUpdated
ponder.on("DeliveryTracker:DeliveryUpdated", async ({ context, event }) => {
  const { deliveryId, status } = event.args;

  const formattedStatus = formatStatus(status).toLowerCase();
  if (!["pending", "in_progress", "completed"].includes(formattedStatus)) {
    console.error(`Invalid status '${status}' for DeliveryUpdated event.`);
    return;
  }

  const updatedDelivery = await context.db
    .update(delivery, { id: deliveryId.toString() })
    .set({ deliveryStatus: formattedStatus as "pending" | "in_progress" | "completed" });

  if (updatedDelivery) {
    console.log(`Delivery ${deliveryId} updated to status: ${formattedStatus}`);
  } else {
    console.error(`Delivery ${deliveryId} not found for update.`);
  }
});

// Event: DeliveryDeleted
ponder.on("DeliveryTracker:DeliveryDeleted", async ({ context, event }) => {
  const { deliveryId } = event.args;

  const deleted = await context.db.delete(delivery, { id: deliveryId.toString() });
  if (deleted) {
    console.log(`Delivery ${deliveryId} deleted.`);
  } else {
    console.error(`Delivery ${deliveryId} not found.`);
  }
});

// Event: TransactionLogged
ponder.on("DeliveryTracker:TransactionLogged", async ({ context, event }) => {
  const { transactionId, deliveryId, purpose, timestamp } = event.args;

  const validPurposes = ["created", "updated", "deleted"];
  const formattedPurpose = purpose.toLowerCase();
  if (!validPurposes.includes(formattedPurpose)) {
    console.error(`Invalid purpose '${purpose}' for TransactionLogged event.`);
    return;
  }

  await context.db.insert(deliveryTransactions).values({
    transactionId: transactionId.toString(),
    deliveryId: deliveryId.toString(),
    transactionPurpose: formattedPurpose as "created" | "updated" | "deleted",
    timestamp: BigInt(timestamp),
  });

  console.log(`Transaction ${transactionId} logged for Delivery ${deliveryId}:`, { purpose });
});