export type CountryType = {
  names: {
    common: string;
    official: string;
    native?: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  region: string;
  subregion?: string;
  capitals?: {
    name: string;
  }[];
  population: number;
  flag: {
    description?: string;
    url_png?: string;
    url_svg?: string;
  };
  tlds?: string[];
  codes?: {
    alpha_3?: string;
  };
  currencies?: {
    code?: string;
    name: string;
    symbol?: string;
  }[];
  languages?: {
    name: string;
  }[];
  borders?: string[];
  area?: {
    kilometers?: number;
  };
  classification?: {
    un_member?: boolean;
  };
  links?: {
    google_maps?: string;
  };
};
