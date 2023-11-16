const REQUIREMENTS = {
  user: ["ROLE_USER"],
  guest: ["ROLE_USER", "ROLE_GUEST"]
};


function authorizeUser(user, roleRequirement) {
  let authorized = false;
  user.roles.forEach((role) => REQUIREMENTS[roleRequirement].includes(role) ? (authorized = true) : null);
  return authorized;
}

function authenticate(user, roleRequirement){
  return authorizeUser(user, roleRequirement);
}

export default authenticate;