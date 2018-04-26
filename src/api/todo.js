import axios from './'

export function changeDoneStatus({projectId, todoId, doneStatus}) {
  return axios.put(`projects/${projectId}/todos/${todoId}`, { is_done: doneStatus })
}

export function editTodoContent({projectId, todoId, content}) {
  return axios.put(`projects/${projectId}/todos/${todoId}`, { content })
}

export function setDeadline({projectId, todoId, expiration_date}) {
  return axios.put(`projects/${projectId}/todos/${todoId}`, { expiration_date })
}

export function sorting({projectId, todos}) {
  return axios.post(`projects/${projectId}/todos/sorting`, { todos })
}

export function deleteTodo({projectId, todoId}) {
  return axios.delete(`projects/${projectId}/todos/${todoId}`)
}
