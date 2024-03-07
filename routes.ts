/**
 * These routes do not required authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
];

/**
 *  an array of routes that are used for authentication
 *  These routes will redirect to logge in users to /settings
 * @type {string[]}
 */
export const authRoutes = ["/auth/login"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purpose
 * @type {string}
 */
export const apiAuthPrefix = "/api";

/**
 * The default redirect after logging in
 *@type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
