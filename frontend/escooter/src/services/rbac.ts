export const roles = {
  ADMIN: "admin",
  MODERATOR: "moderator",
  USER: "user",
};

export const permissions = {
  adminDash: [roles.ADMIN],
  userDash: [roles.USER],
};
