import axios from 'axios'
const baseURL = process.env.NODE_ENV === 'production' ? 'https://todosio.herokuapp.com/api/' : 'http://localhost:3000/api/'

const defaultTransformers = () => {
  const { transformRequest } = axios.defaults
  if (!transformRequest) {
    return []
  } else if (transformRequest instanceof Array) {
    return transformRequest
  } else {
    return [transformRequest]
  }
}

const defaultResponseTransformers = () => {
  const { transformResponse } = axios.defaults
  if (!transformResponse) {
    return []
  } else if (transformResponse instanceof Array) {
    return transformResponse
  } else {
    return [transformResponse]
  }
}

export default axios.create({
  baseURL,
  transformRequest: [...defaultTransformers(), function(data, headers) {
    let localHeaders = JSON.parse(localStorage.getItem('headers')) || {}
    delete localHeaders['content-type']
    Object.keys(localHeaders).forEach(key => {
      headers[key] = localHeaders[key]
    })
    return data
  }],
  transformResponse: [...defaultResponseTransformers(), function(data, headers) {
    if (headers['access-token']) localStorage.setItem('headers', JSON.stringify(headers))
    return data
  }]
})
