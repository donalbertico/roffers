// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Offer } = initSchema(schema);

export {
  Offer
};