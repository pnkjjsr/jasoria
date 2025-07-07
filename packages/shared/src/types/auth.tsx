import type { User } from "firebase/auth";

export interface userType {
  email: string;
  displayName: string;
  photoURL: string;
  uid: string;
  phoneNumber: string;
  providerData: {
    providerId: string;
    uid: string;
    displayName: string;
    email: string;
    phoneNumber: string;
  }[];
}

export function mapUser(user: User): userType {
  return {
    email: user.email || "",
    displayName: user.displayName || "",
    photoURL: user.photoURL || "",
    uid: user.uid,
    phoneNumber: user.phoneNumber || "",
    providerData: user.providerData.map((provider) => ({
      providerId: provider.providerId,
      uid: provider.uid,
      displayName: provider.displayName || "",
      email: provider.email || "",
      phoneNumber: provider.phoneNumber || "",
    })),
  };
}

export interface userSupaType {
  id: string;
  email: string;
  name: string;
  picture: string;
}

export function mapSupabaseUser(user: any): userSupaType {
  return {
    id: user.id,
    email: user.email || "",
    name: user.user_metadata.name || "",
    picture: user.user_metadata.picture || "",
  };
}
