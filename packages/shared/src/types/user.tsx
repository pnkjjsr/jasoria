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

export function mapProfile(user: userType) {
  return {
    id: user.id,
    email: user.email || "",
    mobile: user.mobile || "",
    firstname: user.firstname || "",
    lastname: user.lastname || "",
  };
}
