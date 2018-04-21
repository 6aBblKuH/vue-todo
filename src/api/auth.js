import axios from './'

export function auth({credentials}) {
  return axios.post('auth/sign_in', credentials)
}
