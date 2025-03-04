const fs = require('fs');
const path = require('path');

// Read the GraphQL schema from the .gql file
const schemaPath = path.join(__dirname, 'taskSchema.gql');
const typeDefs = fs.readFileSync(schemaPath, 'utf8');

module.exports = typeDefs;
