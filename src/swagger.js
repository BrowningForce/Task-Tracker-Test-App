const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  apis: ['./routes/*.js'],

  basePath: '/',

  swaggerDefinition: {
    info: {
      description: 'API server for Task Tracker Test APp with autogenerated swagger doc',
      swagger: '2.0',
      title: 'Task Tracker API',
      version: '1.0.0',
    },
  },
};

const specs = swaggerJsDoc(options);

module.exports = specs;
