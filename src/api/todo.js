import axios from './'

export function changeDoneStatus({projectId, todoId, doneStatus}) {
  return axios.put(`projects/${projectId}/todos/${todoId}`, { is_done: doneStatus })
}

export function editTodoContent({projectId, todoId, content}) {
  return axios.put(`projects/${projectId}/todos/${todoId}`, { content })
}

export function deleteTodo({projectId, todoId}) {
  return axios.delete(`projects/${projectId}/todos/${todoId}`)
}
