/**
 * Converts a username to an avatar fallback by extracting the initials.
 * @param username - The username to convert.
 * @returns The initials of the username in uppercase.
 */
export function convertUsernameToAvatarFallback(username: string): string {
    const initials = username
        .split(' ')
        .map((name) => name.charAt(0))
        .join('');
    
    return initials.toUpperCase();
}