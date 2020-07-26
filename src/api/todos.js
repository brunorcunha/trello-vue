import API from './'

export default {
  getFrames: async () => API.get('/frames'),
  getFrame: async id => API.get(`/frame/${id}`),
  createFrame: async data => API.post('/frame', data),
  editFrame: async data => API.put('/frame', data),
  deleteFrame: async id => API.delete(`/frame/${id}`),

  getTodo: async id => API.get(`/todo/${id}`),
  createTodo: async data => API.post('/todo', data),
  editTodo: async data => API.put('/todo', data),
  deleteTodo: async id => API.delete(`/todo/${id}`)
}
