import axios from 'axios'

export const getUserById = async (id) => {
  const res = await axios.get(`http://localhost:5000/users/${id}/`)
  return res.data
}
