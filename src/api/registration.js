import axios from './'

export function registrate({credentials}) {
  return axios.post('auth', credentials)
}
