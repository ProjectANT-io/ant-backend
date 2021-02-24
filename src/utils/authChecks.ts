function checkUsersAuth(
  userLoggedin: { id: number },
  userIdBeingAccessed: number
) {
  if (userLoggedin.id === userIdBeingAccessed) return true;
  return false;
}

function checkUsersAuthForBusiness(
  userLoggedin: { business: { id: number } },
  businessIdBeingAccessed: number
) {
  if (userLoggedin.business.id === businessIdBeingAccessed) return true;
  return false;
}

module.exports.checkUsersAuth = checkUsersAuth;
module.exports.checkUsersAuthForBusiness = checkUsersAuthForBusiness;
