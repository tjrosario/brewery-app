export const GATEWAY: string = 'https://api.openbrewerydb.org/breweries';

export const BREWERY_TYPES: String[] = ['micro', 'regional', 'brewpub', 'large', 'planning', 'bar', 'contract', 'proprietor'];

export const US_STATES: String[] = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

export type DashboardType = {
  query: string;
  breweries: Array<any>;
  types: String[];
  states: String[];
  criteria: any;
  loading: boolean;
} 

export const initialState = {
  criteria: {
    by_type: 'micro',
    by_state: 'new_jersey',
    per_page: 20
  },
  query: '',
  states: US_STATES,
  breweries: [],
  types: BREWERY_TYPES,
  loading: false
};

export function serialize(obj: any, prefix?: string): string {
  var str = [],
    p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p,
        v = obj[p];
      str.push((v !== null && typeof v === "object") ?
        serialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}

export function toTitleCase(str: string): string {
  let strArray = str.toLowerCase().split(' ');
  for (var i = 0; i < strArray.length; i++) {
    strArray[i] = strArray[i].charAt(0).toUpperCase() + strArray[i].slice(1);
  }
  return strArray.join(' ');
}

export const decode = (str: string): string => decodeURIComponent(toTitleCase(str.replace(/_/g, ' ')))

export const encode = (str: string): string => encodeURIComponent((str).toLowerCase())