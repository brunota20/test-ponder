export const contractAbi = [
  // Create a new delivery
  {
    inputs: [
      { internalType: "string", name: "_description", type: "string" },
      { internalType: "string", name: "_status", type: "string" },
    ],
    name: "createDelivery",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },

  // Update the status of an existing delivery
  {
    inputs: [
      { internalType: "uint256", name: "_deliveryId", type: "uint256" },
      { internalType: "string", name: "_status", type: "string" },
    ],
    name: "updateDeliveryStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },

  // Retrieve all deliveries
  {
    inputs: [],
    name: "getDeliveries",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "description", type: "string" },
          { internalType: "string", name: "status", type: "string" },
          { internalType: "address", name: "customer", type: "address" },
          { internalType: "uint256", name: "timestamp", type: "uint256" },
        ],
        internalType: "struct DeliveryTracker.Delivery[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },

  // Retrieve all transactions
  {
    inputs: [],
    name: "getTransactions",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "transactionId", type: "uint256" },
          { internalType: "uint256", name: "deliveryId", type: "uint256" },
          { internalType: "string", name: "purpose", type: "string" },
          { internalType: "uint256", name: "timestamp", type: "uint256" },
        ],
        internalType: "struct DeliveryTracker.Transaction[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },

  // Retrieve all transactions for a specific delivery
  {
    inputs: [{ internalType: "uint256", name: "_deliveryId", type: "uint256" }],
    name: "getTransactionsByDelivery",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "transactionId", type: "uint256" },
          { internalType: "uint256", name: "deliveryId", type: "uint256" },
          { internalType: "string", name: "purpose", type: "string" },
          { internalType: "uint256", name: "timestamp", type: "uint256" },
        ],
        internalType: "struct DeliveryTracker.Transaction[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },

  // Delete an existing delivery
  {
    inputs: [{ internalType: "uint256", name: "_deliveryId", type: "uint256" }],
    name: "deleteDelivery",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },

  // Mapping to find the owner of a delivery by deliveryId
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "deliveryToOwner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },

  // Mapping to get delivery details by deliveryId
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "deliveries",
    outputs: [
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "string", name: "description", type: "string" },
      { internalType: "string", name: "status", type: "string" },
      { internalType: "address", name: "customer", type: "address" },
      { internalType: "uint256", name: "timestamp", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },

  // Mapping to get transaction details by transactionId
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "transactions",
    outputs: [
      { internalType: "uint256", name: "transactionId", type: "uint256" },
      { internalType: "uint256", name: "deliveryId", type: "uint256" },
      { internalType: "string", name: "purpose", type: "string" },
      { internalType: "uint256", name: "timestamp", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },

  // Event emitted when a delivery is created
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "deliveryId", type: "uint256" },
      { indexed: false, internalType: "string", name: "description", type: "string" },
      { indexed: false, internalType: "string", name: "status", type: "string" },
      { indexed: false, internalType: "address", name: "customer", type: "address" },
    ],
    name: "DeliveryCreated",
    type: "event",
  },

  // Event emitted when a delivery status is updated
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "deliveryId", type: "uint256" },
      { indexed: false, internalType: "string", name: "status", type: "string" },
    ],
    name: "DeliveryUpdated",
    type: "event",
  },

  // Event emitted when a delivery is deleted
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "deliveryId", type: "uint256" },
    ],
    name: "DeliveryDeleted",
    type: "event",
  },

  // Event emitted when a transaction is logged
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "transactionId", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "deliveryId", type: "uint256" },
      { indexed: false, internalType: "string", name: "purpose", type: "string" },
      { indexed: false, internalType: "uint256", name: "timestamp", type: "uint256" },
    ],
    name: "TransactionLogged",
    type: "event",
  },
] as const;
