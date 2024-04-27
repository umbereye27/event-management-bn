import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: '1.0.0',          
    title: 'Event management system',              
    description: 'Simple Events managements system'        
  },
  servers: [
    {
      url: 'http://localhost:5000/',
      description: 'localHost'
    },
  ],
  basePath: "/api/v1",
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [          
    {
      name: 'Auth',            
      description: 'user authentication'      
    },
    {
      name: 'Events',            
      description: 'Events management'      
    },
    {
      name: 'Bookings',            
      description: 'Booking management'      
    },
  ],
  components: {
    securitySchemes:{
      bearerAuth: {
          type: 'http',
          scheme: 'bearer'
      }
  },
    schemas: {
        eventsSchema: {
            $title: 'John Doe',
            $date: 29,
            $location: 'location 1',
            $ticketAvailability: 'location 1',
            $image:'base 64 image',
        }
    },
    parameters:{
      eventsParameter:{
        $id:"uuid"
      }
    }
} 
};

const outputFile = './swagger-output.json';
const routes = ['./src/index.js'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, routes, doc);