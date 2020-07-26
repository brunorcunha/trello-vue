import Vue from 'vue'

const $serverEndpoint = 'http://api.todo.ootz.com.br'

const returnResponse = response => {
  if (response && response.return_code !== 1) throw response.message
  return response.data
}

export default ({
  get: async (url) => returnResponse((await Vue.http.get(`${$serverEndpoint}${url}`)).data),
  put: async (url, args) => returnResponse((await Vue.http.put(`${$serverEndpoint}${url}`, args)).data),
  post: async (url, args) => returnResponse((await Vue.http.post(`${$serverEndpoint}${url}`, args)).data),
  delete: async (url) => returnResponse((await Vue.http.delete(`${$serverEndpoint}${url}`)).data)
})
