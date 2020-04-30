export interface FeatureCollection {
    type: string;
    version: string;
    features: any;
    attribution: string;
    licence: string;
    query: string;
    filters: any;
    limit: number;
  }