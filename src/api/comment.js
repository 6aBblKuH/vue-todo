import axios from './'

export function getComments({projectId, todoId}) {
  return axios.get(`projects/${projectId}/todos/${todoId}/comments`)
}

export function addComment({projectId, todoId, content}) {
  return axios.post(`projects/${projectId}/todos/${todoId}/comments/`, { content })
}

export function deleteComment({projectId, todoId, commentId}) {
  return axios.delete(`projects/${projectId}/todos/${todoId}/comments/${commentId}`)
}
