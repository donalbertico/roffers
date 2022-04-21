import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type OfferMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Offer {
  readonly id: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Offer, OfferMetaData>);
  static copyOf(source: Offer, mutator: (draft: MutableModel<Offer, OfferMetaData>) => MutableModel<Offer, OfferMetaData> | void): Offer;
}