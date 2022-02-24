import { ApolloServer } from 'apollo-server-micro'
import { typeDefs } from '../../apollo/type-defs'
import { resolvers } from '../../apollo/resolvers'
import { Neo4jGraphQL } from "@neo4j/graphql";
import neo4j from "neo4j-driver";

const driver = neo4j.driver(
    process.env.DB_URI,
    neo4j.auth.basic(process.env.DB_USER, process.env.DB_PASSOWRD)
);

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "https://studio.apollographql.com");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  const neoSchema = new Neo4jGraphQL({ typeDefs, resolvers, driver });
  const apolloServer = new ApolloServer({
    schema: await neoSchema.getSchema(),
    context(ctx) {
      return ctx
    }
  });
  await apolloServer.start();
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
}