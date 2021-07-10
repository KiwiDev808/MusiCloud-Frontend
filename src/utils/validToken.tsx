import { API } from '../services/api'

export async function validToken(token: string | null) {
  if (!token) return false
  try {
    await API.getAllMusics(token)
    return true
  } catch (error) {
    return false
  }
}
