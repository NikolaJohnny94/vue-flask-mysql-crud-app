import axios from 'axios'

export const editUser = async (
  id,
  firstname,
  lastname,
  email,
  country,
  city
) => {
  const res = await axios.put(`http://localhost:5000/users/${id}/`, {
    firstname,
    lastname,
    email,
    country,
    city,
  })
  return res.data
}
