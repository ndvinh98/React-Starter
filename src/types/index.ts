export type TApplicantSalutation = 'MR' | 'MRS' | 'MISS' | 'DR' | 'MADAM';
export type TStatus = 'PENDING' | 'REJECTED' | 'APPROVED';

export enum Salutation {
  MR = 'MR',
  MRS = 'MRS',
  MISS = 'MISS',
  DR = 'DR',
  MADAM = 'MADAM',
}

export type TSalutation = 'MR' | 'MRS' | 'MISS' | 'DR' | 'MADAM';

export enum UserType {
  PARTNERADMIN = 'PARTNERADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface BaseSchema {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export type TUserType = 'PARTNERADMIN' | 'ADMIN' | 'USER';

export interface ILanguages extends BaseSchema {
  isActive?: number;
  name?: string;
  isoCode?: string;
  languageCode?: string;
  locale?: string;
  partnerUserProfiles?: IPartnerUserProfiles[];
}

export enum Status {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED',
}

export interface IMe {
  id?: number;
  isActive?: 0 | 1;
  hasAccess?: 0 | 1;
  isVerified?: 0 | 1;
  salutation?: 'MR' | 'MRS' | 'MISS' | 'DR' | 'MADAM';
  firstName?: string;
  lastName?: string;
  email?: string;
  userType?: 'PARTNERADMIN' | 'ADMIN' | 'USER';
  avatarMediaDestination?: null;
  cityName?: string;
  companyName?: string;
  countryName?: string;
  jobFunction?: string;
  jobTitle?: string;
  mobileNumber?: string;
  postalCode?: string;
  updatedAt?: string;
  workNumber?: string;
  language?: number;
}

export interface IPartnerUserProfiles extends BaseSchema {
  partnerUser?: number | IPartnerUsers;
  language?: ILanguages;
  jobFunction?: string;
  jobTitle?: string;
  cityName?: string;
  countryName?: string;
  companyName?: string;
  postalCode?: string;
  workNumber?: string;
  mobileNumber?: string;
  avatarMediaDestination?: string;
}

export interface IPartnerUsers extends BaseSchema {
  hasAccess?: 1 | 0;
  isActive?: 1 | 0;
  isVerified?: 1 | 0;
  salutation?: TSalutation;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  domain?: string;
  userType?: TUserType;
  otpCode?: string;
  otpCodeExp?: Date;
  partnerApplicationSubmissions?: IPartnerApplicationSubmissions[];
  partnerUserProfiles?: IPartnerUserProfiles[];
}

export interface IPartners extends BaseSchema {
  isActive?: number;
  isApproved?: number;
  partnerDomain?: number; //| PartnerDomains;
  expiryDate?: Date;
  partnerTierRelations?: any; // IPartnerTierRelations[];
  partnerApplicationSubmissions?: IPartnerApplicationSubmissions[];
}

export interface IPartnerApplicationSubmissions extends BaseSchema {
  submittedByPartnerUser?: number | IPartnerUsers;
  partner?: number | IPartners;
  status?: TStatus;
  partnerApplicationForms?: IPartnerApplicationForms;
}

export interface IPartnerApplicationAttachments extends BaseSchema {
  partnerApplicationForm?: number | IPartnerApplicationForms;
  mediaDestination?: string;
}

export interface IPartnerApplicationForms extends BaseSchema {
  partnerApplicationSubmission?: IPartnerApplicationSubmissions;
  partnerApplicationAttachments?: IPartnerApplicationAttachments[];
  companyName?: string;
  address1?: string;
  address2?: string;
  address3?: string;
  countryName?: string;
  cityName?: string;
  postalCode?: string;
  countryIncorporation?: string;
  companyCEOName?: string;
  companyShareholderName1?: string;
  companyShareholderName2?: string;
  companyShareholderName3?: string;
  companyDirectorName1?: string;
  companyDirectorName2?: string;
  companyDirectorName3?: string;
  companyDirectorName4?: string;
  companyDirectorName5?: string;
  billingAddress1?: string;
  billingAddress2?: string;
  billingAddress3?: string;
  billingCountryName?: string;
  billingCityName?: string;
  billingPostalCode?: string;
  billingContactName?: string;
  billingContactDesignation?: string;
  billingContactTelNo?: string;
  billingContactFaxNo?: string;
  applicantFirstName?: string;
  applicantLastName?: string;
  applicantSalutation?: TApplicantSalutation;
  applicantJobFunction?: string;
  applicantJobTitle?: string;
  applicantCountryName?: string;
  applicantCityName?: string;
  applicantPostalCode?: string;
  applicantWorkNo?: string;
  applicantMobileNo?: string;
  applicantPreferredLanguage?: string;
  natureOfBusiness?: string;
}

export interface IApplication extends BaseSchema {
  mediaDestination?: string;
  name?: string;
  categories?: ICategorie[];
}

export interface ICategorie extends BaseSchema {
  applicationId?: number;
  mediaDestination?: string;
  name?: string;
  groupings?: IGrouping[];
  application?: IApplication;
}
export interface IGrouping extends BaseSchema {
  mediaDestination?: string;
  name?: string;
  products: IProduct[];
  category?: ICategorie;
}
export interface IProduct extends BaseSchema {
  mediaDestination?: string;
  name?: string;
  grouping?: IGrouping;
}

export interface IProductResources extends BaseSchema {
  productModuleRelations?: IProductModuleRelations;
  resourceDestination?: string;
  resourceName?: string;
  mediaDestination?: string;
}

export interface IProductModuleRelations extends BaseSchema {
  product?: IProduct;
  module?: IModules;
  productResources?: IProductResources[];
}
export type TMediaType = 'VIDEOS' | 'DOCUMENTS' | 'IMAGES';

export interface IModules extends BaseSchema {
  name?: string;
  moduleType?: string;
  mediaType?: TMediaType;
  productModuleRelations: IProductModuleRelations[];
}

export interface IParams {
  fields?: string;
  limit?: number;
  page?: number;
  sort?: string;
  filter?: any;
  cache?: boolean;
  textSearch?: string;
  relations?: string;
  [key: string]: any;
}

export interface IUserManagement extends BaseSchema {
  firstName?: string;
  lastName?: string;
  email?: string;
  userType?: string;
  status?: string;
  user?: IUsers;
}

export interface IUsers extends BaseSchema {
  hasAccess?: 1 | 0;
  isActive?: 1 | 0;
  salutation?: TSalutation;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  userType?: TUserType;
  otpCode?: string;
  otpCodeExp?: Date;
  userProfiles?: IUserProfiles;
}

export interface IUserProfiles extends BaseSchema {
  partnerUser?: number | IPartnerUsers;
  language?: ILanguages;
  jobTitle?: string;
  cityName?: string;
  countryName?: string;
  companyName?: string;
  postalCode?: string;
  workNumber?: string;
  mobileNumber?: string;
  avatarMediaDestination?: string;
  salesId?: string;
  showMobileNumber?: 1 | 0;
  showWorkNumber?: 1 | 0;
}

export interface IPartnerDomain extends BaseSchema {
  isAllowed?: 1 | 0;
  domain?: string;
}

export interface IPartnerManagement extends BaseSchema {
  isActive?: 1 | 0;
  isApproved?: 1 | 0;
  expiryDate?: Date;
  companyName?: string;
  partnerDomain?: IPartnerDomain;
}

export interface IPartnerUser extends BaseSchema {
  isActive?: 1 | 0;
  isVerified?: 1 | 0;
  salutation?: TSalutation;
  firstName?: string;
  lastName?: string;
  email?: string;
  userType?: TUserType;
  otpCodeExp?: Date;
  domain?: IPartnerDomain;
}

export interface ITier extends BaseSchema {
  name?: string;
}

export interface ICertificates extends BaseSchema {
  name?: string;
  mediaDestination?: string;
}
