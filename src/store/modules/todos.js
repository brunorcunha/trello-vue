import API from '@/api/todos'

const state = {
  lists: [{}]
}

const getters = {
  lists: state => state.lists
}

const mutations = {
  setLists (state, lists) { state.lists = lists },
  setList (state, list) {
    const index = state.lists.findIndex(e => e.id === list.id)
    state.lists[index] = { ...state.lists[index], ...list }
  },
  addList (state, list) { state.lists.push(list) },
  removeList (state, listIndex) { state.lists.splice(listIndex, 1) },
  removeToDo (state, { listIndex, toDoIndex }) {
    state.lists[listIndex].todos.splice(toDoIndex, 1)
    state.lists = JSON.parse(JSON.stringify(state.lists))
  },
  addToDo (state, { listIndex, todo }) {
    if (!state.lists[listIndex].todos) state.lists[listIndex].todos = []
    state.lists[listIndex].todos.push(todo)
    state.lists = JSON.parse(JSON.stringify(state.lists))
  },
  setToDo (state, todo) {
    const indexList = state.lists.findIndex(e => e.id === todo.frame_id)
    const indexToDo = state.lists[indexList].todos.findIndex(e => e.id === todo.id)
    state.lists[indexList].todos[indexToDo] = todo
    state.lists = JSON.parse(JSON.stringify(state.lists))
  }
}

const actions = {
  setTheme ({ commit }, theme) {
    commit('setTheme', theme)
  },
  async init ({ commit }) {
    const lists = await API.getFrames()
    lists.sort((a, b) => a.order - b.order)
    lists.forEach(e => e.todos.sort((a, b) => a.order - b.order))
    commit('setLists', lists)
  },
  async addList ({ commit }, data) {
    const list = await API.createFrame(data)
    commit('addList', list)
  },
  async removeList ({ commit, getters }, id) {
    const confirm = await API.deleteFrame(id)
    if (confirm.ok) {
      const listIndex = getters.lists.findIndex(list => list.id === id)
      if (listIndex >= 0) commit('removeList', listIndex)
    }
  },
  async removeToDo ({ commit, getters }, { id, frame_id }) {
    const confirm = await API.deleteTodo(id)
    if (confirm.ok) {
      const listIndex = getters.lists.findIndex(list => list.id === frame_id)
      if (listIndex >= 0) {
        const toDoIndex = getters.lists[listIndex].todos.findIndex(todo => todo.id === id)
        if (toDoIndex >= 0) {
          commit('removeToDo', { listIndex, toDoIndex })
        }
      }
    }
  },
  async addToDo ({ commit, getters }, data) {
    const listIndex = getters.lists.findIndex(list => list.id === data.frame_id)
    if (listIndex >= 0) {
      const todo = await API.createTodo(data)
      commit('addToDo', { listIndex, todo })
    }
  },
  async changeToDoList ({ commit, getters }, data) {
    let lists = JSON.parse(JSON.stringify(getters.lists))
    let fromListIndex = lists.findIndex(e => e.id === data.fromListID)
    let fromList = lists[fromListIndex]
    let item = fromList.todos.splice(data.oldIndex, 1)[0]
    let toListIndex = lists.findIndex(e => e.id === data.toListID)
    let toList = lists[toListIndex]
    if (!toList.todos) toList.todos = []
    toList.todos.splice(data.newIndex, 0, item)

    for (let i in fromList.todos) {
      const item = { ...fromList.todos[i], order: parseInt(i) }
      const aux = getters.lists[fromListIndex].todos.find(e => e.id === item.id)
      if (item.order !== aux.order) {
        fromList.todos[i] = await API.editTodo(item)
      }
    }
    for (let i in toList.todos) {
      const item = { ...toList.todos[i], order: parseInt(i), frame_id: toList.id }
      const aux = (getters.lists[toListIndex].todos || []).find(e => e.id === item.id)
      if (!aux || item.order !== aux.order) {
        toList.todos[i] = await API.editTodo(item)
      }
    }
    commit('setLists', lists)
  },
  async updateToDoOrder ({ commit, getters }, list) {
    let listIndex = getters.lists.findIndex(e => e.id === list.id)
    let todos = list.todos.map((item, index) => ({ ...item, order: index }))
    for (let i in todos) {
      const item = todos[i]
      const aux = getters.lists[listIndex].todos.find(e => e.id === item.id)
      if (item.order !== aux.order) {
        todos[i] = await API.editTodo(item)
      }
    }
    commit('setList', { ...list, todos })
  },
  async updateListOrder ({ commit, getters }) {
    let items = getters.lists.map((item, index) => ({ ...item, order: index }))
    for (let i in items) {
      const item = items[i]
      const aux = getters.lists.find(e => e.id === item.id)
      if (item.order !== aux.order) {
        items[i] = await API.editFrame(item)
      }
    }
    commit('setLists', items)
  },
  async updateTitle ({ commit }, list) {
    const returnedList = await API.editFrame(list)
    commit('setList', returnedList)
  },
  async updateToDo ({ commit }, todo) {
    const returnedToDo = await API.editTodo(todo)
    commit('setToDo', returnedToDo)
    return returnedToDo
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

