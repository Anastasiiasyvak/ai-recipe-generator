import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  // Визначення типу для відповіді від Amazon Bedrock
  BedrockResponse: a.customType({
    body: a.string(),
    error: a.string(),
  }),

  // Визначення запиту askBedrock, який приймає масив рядків (інгредієнти)
  askBedrock: a
    .query()
    .arguments({ ingredients: a.string().array() })
    .returns(a.ref("BedrockResponse"))
    .authorization((allow) => [allow.authenticated()])
    .handler(
      a.handler.custom({ entry: "./bedrock.js", dataSource: "bedrockDS" })
    ),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

