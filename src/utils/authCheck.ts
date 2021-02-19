export default async function checkUsersAuth(userLoggedin: any, userIdBeingAccessed: number) {
  if (userLoggedin.id === userIdBeingAccessed) return true;
  return false;
}