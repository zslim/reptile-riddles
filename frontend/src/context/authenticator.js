const REQUIREMENTS = {
  user: ["ROLE_USER"],
  guest: ["ROLE_USER", "ROLE_GUEST"],
};

function authorizeUser(user, roleRequirement) {
  return user.roles.some((role) =>
    REQUIREMENTS[roleRequirement].includes(role)
  );
}

function authenticate(user, roleRequirement) {
  return authorizeUser(user, roleRequirement);
}

export default authenticate;
