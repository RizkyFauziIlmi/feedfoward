/**
 * Converts a username to an avatar fallback by extracting the initials.
 * @param username - The username to convert.
 * @returns The initials of the username in uppercase.
 */
export function convertUsernameToAvatarFallback(username: string): string {
  const initials = username
    .split(" ")
    .map((name) => name.charAt(0))
    .join("");

  return initials.toUpperCase();
}

/**
 * Converts a string to title case by capitalizing the first letter of each word.
 * @param str - The string to convert.
 * @returns The string in title case.
 */
export function convertToTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
