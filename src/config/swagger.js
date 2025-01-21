const swaggerJsdoc = require('swagger-jsdoc');
const YAML = require('yamljs');
const path = require('path');

const swaggerDocument = YAML.load(path.join(__dirname, '../docs/swagger.yaml'));

module.exports = swaggerDocument;