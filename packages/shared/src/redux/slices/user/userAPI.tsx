import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@repo/shared/lib/firebase/firebaseConfig";

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
