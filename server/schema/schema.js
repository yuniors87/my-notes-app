const graphql = require('graphql');
const _ = require('lodash');

let empresas = [
  { id: '1', nombre: 'Emprsa 01' },
  { id: '2', nombre: 'Emprsa 02' },
  { id: '3', nombre: 'Emprsa 03' }
];

let sistemas = [
  { id: '11', nombre: 'Sistema 01' },
  { id: '12', nombre: 'Sistema 02' },
  { id: '13', nombre: 'Sistema 03' }
];

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema } = graphql;

const EmpresaType = new GraphQLObjectType({
  name: 'Empresa',
  fields: () => ({
    id: { type: GraphQLID },
    nombre: { type: GraphQLString }
  })
});

const SistemaType = new GraphQLObjectType({
  name: 'Sistema',
  fields: () => ({
    id: { type: GraphQLID },
    nombre: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    empresa: {
      type: EmpresaType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(empresas, { id: args.id });
      }
    },
    sistema: {
      type: SistemaType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(sistemas, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
