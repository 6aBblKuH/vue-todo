import axios from './'

export function addTodo({project, content}) {
  return axios.post(`projects/${project.id}/todos`, {
    content,
    order: project.todos.length + 1
  })
}

export function renameProject({id, title}) {
  return axios.put(`projects/${id}`, {
    title
  })
}

export function deleteProject({id}) {
  return axios.delete(`projects/${id}`)
}
