import { WebShareData } from "../types/common";

export const getInitials = (name: string) => {
  const initials = name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
  return initials;
};

export const isNavigatorContacts = () => {
  if ("contacts" in navigator) {
    return navigator.contacts;
  }

  return null;
};

export const getNavigatorContacts = async (
  prop = ["name", "tel", "email", "address", "icon"],
  opt = true
) => {
  try {
    if (!("contacts" in navigator)) {
      alert("Contact Picker API is not supported on this browser.");
      return;
    }
    const props = prop;
    const opts = { multiple: opt };
    const contacts = await (navigator.contacts as any).select(props, opts);

    return contacts;
  } catch (err) {
    console.error("Failed to fetch contacts:", err);
  }
};

export const getFirstWord = (contact: string) => {
  if (!contact || typeof contact !== "string") {
    return "";
  }

  // Split by comma and get the first item, then trim whitespace
  const parts = contact.split(",");
  const firstItem = parts[0];
  return firstItem ? removeSpaces(firstItem.trim()) : "";
};

export const parseFullName = (fullname: string) => {
  if (!fullname || typeof fullname !== "string") {
    return { firstName: "", lastName: "" };
  }

  const nameParts = fullname.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";
  return { firstName, lastName };
};

export const removeSpaces = (str: string) => {
  return str.replace(/\s+/g, "");
};

export const webShare = async (data: WebShareData) => {
  const { url, text } = data;

  if (navigator.share) {
    try {
      await navigator.share({
        title: "JASORIA - Book Your House Help",
        url: url,
        text: text,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  } else {
    alert("Web Share API is not supported in your browser.");
  }
};
