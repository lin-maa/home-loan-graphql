import './config/env';
import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import schema from './graphql/schema';

const { PORT } = process.env;

const app = express();

app.use(cors());

app.use(
  '/api/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`Backend listening at http://localhost:${PORT}`);
});
