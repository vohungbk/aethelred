export interface CollectionSummary {
  slug: string;
  name: string;
}

export interface CollectionDetail extends CollectionSummary {
  description: string;
}
