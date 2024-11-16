import express, { Application } from 'express';
import { ApolloServer } from '@apollo/server';
import { connectToDatabase } from './database/connection';
import { typeDefs } from './graphql/schema';
import { userResolvers } from './graphql/resolvers/user.resolver';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';

const app: Application = express();

// Connect to MongoDB
connectToDatabase().catch((err) => {
  console.error('Database connection failed:', err);
  process.exit(1);
});

// Set up Apollo Server
const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers: userResolvers }),
});

const startServer = async () => {
  try {
    // Start the Apollo Server
    await server.start();

    // Apply Apollo Middleware to Express app
    app.use(
      '/graphql',
      cors({
        origin: '*',
      }),
      express.json(),
      expressMiddleware(server),
    );

    // Start the Express server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting Apollo Server:', error);
  }
};

startServer();

export { app };
