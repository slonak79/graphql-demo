const { GraphQLServer } = require('graphql-yoga');
const fetch = require('node-fetch');
require('dotenv').config();

const yelpBusinessApiUrl = 'https://api.yelp.com/v3/businesses/search?term=restaurants&categories=mexican&latitude=36.713379&longitude=-121.654298';
// const yelpBusinessApiUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&categories=mexican&latitude=36.713379&longitude=-121.654298`;

const resolvers = {
  Query: {
    description: () => 'GraphQL Demo',
    businesses: () => {
      return fetch(
        yelpBusinessApiUrl,
        {
          headers: {
            Authorization: `Bearer ${YELP_API_TOKEN}`
          }
        }
        ).then(res => res.json())
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});

const options ={
  debug: true
};

server.start(options, () => console.log('running on http://localhost:4000'));