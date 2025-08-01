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

export const getNavigatorContacts = async (isMultiple = true) => {
  try {
    if (!("contacts" in navigator)) {
      alert("Contact Picker API is not supported on this browser.");
      return;
    }
    const props = ["name", "tel", "email", "address", "icon"];

    const opts = { multiple: isMultiple  };
    const contacts = await (navigator.contacts as any).select(props, opts);

    return contacts;
  } catch (err) {
    console.error("Failed to fetch contacts:", err);
  }
};
