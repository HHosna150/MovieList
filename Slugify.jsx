export const slugify = (text) => {
  return text
    .toString() // Ensure the input is a string
    .toLowerCase() // Convert the string to lowercase
    .replace(/\s+/g, "-") // Replace spaces (and repeated spaces) with a single hyphen
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except hyphens
    .replace(/\-\-+/g, "-") // Replace multiple hyphens with a single hyphen
    .replace(/^-+/, "") // Trim hyphens from the start of the string
    .replace(/-+$/, ""); // Trim hyphens from the end of the string
};
