export interface IOptions {
  value: string | number;
  label: string;
}
export interface ISelect {
  options?: IOptions[];
  isClearable?: boolean;
  isSearchable?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  defaultValue?: any;
  isMulti?: boolean;
  name?: string;
  isInvalid?: boolean;
  size?: 'sm' | 'md' | 'lg';
  [key: string]: any;
}
