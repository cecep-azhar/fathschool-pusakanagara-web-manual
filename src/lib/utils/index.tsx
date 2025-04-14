/**
 * * Capitalize the first letter of each word in a given string.
 *
 * @param {string} str The string to capitalize.
 * @returns {string} The capitalized string.
 */
export function capitalizeWords(str: string): string {
  return str.toLowerCase().split(" ").map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
