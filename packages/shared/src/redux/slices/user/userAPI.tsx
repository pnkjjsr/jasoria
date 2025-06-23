import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

import { auth } from "@repo/shared/lib/firebase/firebaseClient";
import { db } from "@repo/shared/lib/firebase/firebaseClient";

import {
  mapProfile,
  userType,
  extendedUserType,
} from "@repo/shared/types/user";

export const fetchUser = onAuthStateChanged(auth, (user) => {
  if (user) {
    const userData = {
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
    const result = userData;
    return result;
  }
});

export const postProfile = async (data: userType) => {
  const userRef = doc(db, "users", data.id);
  const docSnap = await getDoc(userRef);

  let payload = {
    ...data,
    updatedat: serverTimestamp(),
  };

  if (!docSnap.exists()) {
    (payload as extendedUserType)["createdat"] = serverTimestamp();
  }

  try {
    await setDoc(userRef, payload, { merge: true });
    return data;
  } catch (error) {
    return error;
  }
};

export const getProfile = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) return null;

  const profile = docSnap.data() as userType;
  const mappedProfile = mapProfile(profile);

  return mappedProfile;
};
