import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "color API",
      version: "1.0.0",
      description: "API documentation for the color Backend application.",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local server",
      },
    ],
    components: {
      schemas: {
        color: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier for the color",
            },
            color: { type: "string", description: "The title of the color" },
            quote: {
              type: "string",
              description: "Quote about the color",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"], // Points to your route files for API documentation
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
