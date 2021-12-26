import axios from 'axios'

export const deleteUser = async (id) => {
  const res = await axios.delete(`http://localhost:5000/users/${id}/`)
  return res.data
}
