const graphql = require('graphql');
const _ = require('lodash');
const Empresa = require('../models/empresas');
const Sistema = require('../models/sistemas');

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
        // return _.filter(sistemas, { empresaId: parent.id });
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
        // return _.find(empresas, { id: parent.empresaId });
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
        // return _.find(empresas, { id: args.id });
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
        // return _.find(sistemas, { id: args.id });
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

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addEmpresa: {
      type: EmpresaType,
      args: {
        nombre: { type: GraphQLString }
      },
      resolve(parent, args) {
        let empresa = new Empresa({
          nombre: args.nombre
        });
        return empresa.save();
      }
    },
    addSistema: {
      type: SistemaType,
      args: {
        nombre: { type: GraphQLString },
        empresaId: { type: GraphQLID }
      },
      resolve(parent, args) {
        let sistema = new Sistema({
          nombre: args.nombre,
          empresaId: args.empresaId
        });
        return sistema.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
