import { FieldValue } from "firebase/firestore";

export interface UIdType {
  uid: string;
}

export interface userType {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  mobile: string;
}

export interface extendedUserType extends userType {
  createdat: FieldValue;
  updatedat: FieldValue;
}
