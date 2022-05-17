import feathers from '@feathersjs/client/dist/feathers';
import rest from '@feathersjs/client/dist/rest';
import auth from '@feathersjs/client/dist/authentication';

const restClient = rest('http://localhost:3001/api');

const client = feathers()
  .configure(restClient.fetch(window.fetch))
  .configure(auth({ storage: window.localStorage }));

export default client;
