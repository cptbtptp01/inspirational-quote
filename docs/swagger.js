const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: 'Inspiration Quote API',
            version: '1.0.0',
            description: 'API documentation for Inspiration Quote API',
        },
    },
    apis: ['./routes/api.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;