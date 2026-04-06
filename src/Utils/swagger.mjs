import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Finance Dashboard API",
      version: "1.0.0",
      description: "Backend API for Finance Dashboard",
    },
    servers: [
      {
        url: "https://finance-data-processing-and-access-wx3s.onrender.com/",
      },
    ],

    // ✅ ONLY THIS — clean and simple
    components: {
      schemas: {
        // =========================
        // USER MODEL
        // =========================
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "6611fabc123abc123abc1234",
            },
            email: {
              type: "string",
              example: "user@gmail.com",
            },
            password: {
              type: "string",
              example: "$2b$10$hashedpassword",
              description: "Hashed password",
            },
            role: {
              type: "string",
              enum: ["ADMIN", "USER"],
            },
            status: {
              type: "string",
              enum: ["ACTIVE", "INACTIVE"],
              default: "ACTIVE",
            },
          },
        },

        // =========================
        // FINANCE MODEL
        // =========================
        Finance: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "6611fabc123abc123abc5678",
            },
            userId: {
              type: "string",
              example: "6611fabc123abc123abc1234",
            },
            amount: {
              type: "number",
              example: 500,
            },
            currency: {
              type: "string",
              example: "INR",
              default: "INR",
            },
            RecordType: {
              type: "string",
              enum: ["INCOME", "EXPENSE"],
            },
            Category: {
              type: "string",
              example: "Food",
            },
            description: {
              type: "string",
              example: "Dinner",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
      },
    },
  },

  apis: ["src/Docs/**/*.mjs"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;