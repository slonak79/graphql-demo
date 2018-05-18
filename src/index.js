const { GraphQLServer } = require('graphql-yoga');
const fetch = require('node-fetch');
require('dotenv').config();

const yelpBaseUrl = 'https://api.yelp.com/v3/businesses';
const googBaseUrl = 'https://maps.googleapis.com/maps/api/directions/json?origin=36.667064,-121.639028&alternatives=false&mode=driving&destination=';

const resolvers = {
  Query: {
    description: () => 'GraphQL Demo',
    businesses: () => {
      return fetch(
        yelpBaseUrl + '/search?term=restaurants&categories=mexican&latitude=36.667064&longitude=-121.639028',
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
    }, // 36.697884,-121.617341
    travel: (root, args, context, info) => {
      return fetch(
        googBaseUrl + `${args.lat},${args.long}`,
        {
          headers: {
            Authorization: `${process.env.GOOGLE_ROUTE_TOKEN}`
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
