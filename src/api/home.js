import axios from './'

export function getProjects() {
  return axios.get('projects')
}

export function addProject({title}) {
  return axios.post('projects', {title})
}
