import Log from "../models/Log.js";

/**
 * Logs an action to the database.
 * @param {Object} params - The log parameters.
 * @param {string} params.action - The action type (e.g., LOGIN, LOGOUT).
 * @param {string} [params.userId] - The user ID (optional).
 * @param {string} [params.role] - The user role (optional).
 * @param {string} [params.email] - The user email (optional).
 * @param {string} [params.ip] - The IP address.
 * @param {Object} [params.details] - Additional details.
 */
export const logAction = async ({ action, userId, role, email, ip, details }) => {
  try {
    await Log.create({
      action,
      user: userId,
      role,
      email,
      ip,
      details,
    });
  } catch (error) {
    console.error("Failed to save log:", error);
  }
};
