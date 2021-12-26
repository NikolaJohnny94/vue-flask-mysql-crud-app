export const checkMailWhenEditUser = (users, email, user) => {
  const duplicate = users.filter((user) => user.email === email)
  console.log(duplicate[0])
  if (duplicate.length > 0 && duplicate[0].id !== user.id) {
    return true
  }
}
