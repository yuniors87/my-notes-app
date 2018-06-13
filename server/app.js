const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const keys = require('./private');

const app = express();

mongoose.connect(keys.mongo);
mongoose.connection.once('open', () => {
  console.log('conectado');
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log('listening');
});
