// Checks that user id from req.user object which is created by passport from client's bearer token matches user id for whats being accessed
export function checkUsersAuth(
  userLoggedin: { id: number },
  userIdBeingAccessed: number
) {
  if (userLoggedin.id === userIdBeingAccessed) return true;
  return false;
}

// Checks that business id from req.user object which is created by passport from client's bearer token matches business id for whats being accessed
export function checkUsersAuthForBusiness(
  userLoggedin: { business: { id: number } },
  businessIdBeingAccessed: number
) {
  if (userLoggedin.business.id === businessIdBeingAccessed) return true;
  return false;
}

// Checks that user or bussiness id from req.user object which is created by passport from client's bearer token matches whichever is relevant user or business id curently only used for projects
export function checkUsersAuthForProjects(
  userLoggedin: { id: number; type: string; business: any },
  businessId: number,
  student: { id: number }
) {
  if (userLoggedin.type === "student" && userLoggedin.id === student.id) {
    return true;
  }
  if (
    userLoggedin.type === "employee" &&
    userLoggedin.business.id === businessId
  ) {
    return true;
  }
  return false;
}
