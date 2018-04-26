import axios from './'

export function getComments({projectId, todoId}) {
  return axios.get(`projects/${projectId}/todos/${todoId}/comments`)
}

export function addComment({projectId, todoId, data}) {
  return axios.post(`projects/${projectId}/todos/${todoId}/comments/`, data)
}

export function deleteComment({projectId, todoId, commentId}) {
  return axios.delete(`projects/${projectId}/todos/${todoId}/comments/${commentId}`)
}
