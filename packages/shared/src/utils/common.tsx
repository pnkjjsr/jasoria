export const getInitials = (name: string) => {
  const initials = name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
  return initials;
};
