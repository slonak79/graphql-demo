const { GraphQLServer } = require('graphql-yoga');
const fetch = require('node-fetch');
require('dotenv').config();

const yelpBaseUrl = 'https://api.yelp.com/v3/businesses';

const resolvers = {
  Query: {
    description: () => 'GraphQL Demo',
    businesses: () => {
      return fetch(
        yelpBaseUrl + '/search?term=restaurants&categories=mexican&latitude=36.713379&longitude=-121.654298',
        {
          headers: {
            Authorization: `Bearer ${process.env.YELP_API_TOKEN}`
          }
        }
        ).then(res => res.json())
    },
    search: (root, args, context, info) => {
      return fetch(
        yelpBaseUrl + `/search?term=${args.term}&categories=mexican&latitude=${args.latitude}&longitude=${args.longitude}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.YELP_API_TOKEN}`
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
