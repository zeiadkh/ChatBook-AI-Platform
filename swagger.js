// swagger.js

import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger_output.json'; // Output file for Swagger JSON
const endpointsFiles = ['./src/modules/app.router.js']; // Path to your Express app file(s)

swaggerAutogen()(outputFile, endpointsFiles);
