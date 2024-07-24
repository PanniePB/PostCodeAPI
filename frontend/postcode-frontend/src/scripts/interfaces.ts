interface BaseSuburb {
  name: string;
  population: number;
  postcode: number;
}

export interface Suburb extends BaseSuburb {
  id: number;
}

export interface CreateSuburbDTO extends BaseSuburb {}

export interface UpdateSuburbDTO extends Partial<BaseSuburb> {}
