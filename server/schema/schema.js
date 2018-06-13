const graphql = require('graphql');
const _ = require('lodash');

let empresas = [
  { id: '1', nombre: 'Emprsa 01' },
  { id: '2', nombre: 'Emprsa 02' },
  { id: '3', nombre: 'Emprsa 03' }
];

let sistemas = [
  { id: '11', nombre: 'Sistema 01', empresaId: '1' },
  { id: '12', nombre: 'Sistema 02', empresaId: '1' },
  { id: '13', nombre: 'Sistema 03', empresaId: '2' },
  { id: '14', nombre: 'Sistema 04', empresaId: '1' },
  { id: '15', nombre: 'Sistema 05', empresaId: '3' },
  { id: '16', nombre: 'Sistema 06', empresaId: '3' }
];

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList
} = graphql;

const EmpresaType = new GraphQLObjectType({
  name: 'Empresa',
  fields: () => ({
    id: { type: GraphQLID },
    nombre: { type: GraphQLString },
    sistemas: {
      type: new GraphQLList(SistemaType),
      resolve(parent, args) {
        return _.filter(sistemas, { empresaId: parent.id });
      }
    }
  })
});

const SistemaType = new GraphQLObjectType({
  name: 'Sistema',
  fields: () => ({
    id: { type: GraphQLID },
    nombre: { type: GraphQLString },
    empresa: {
      type: EmpresaType,
      resolve(parent, args) {
        return _.find(empresas, { id: parent.empresaId });
      }
    }
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
    empresas: {
      type: new GraphQLList(EmpresaType),
      resolve(parent, args) {
        return empresas;
      }
    },
    sistema: {
      type: SistemaType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(sistemas, { id: args.id });
      }
    },
    sistemas: {
      type: new GraphQLList(SistemaType),
      resolve(parent, args) {
        return sistemas;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
