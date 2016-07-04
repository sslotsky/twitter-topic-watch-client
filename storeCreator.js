export default function createStore(initialState, handlers) {
  return function (state = initialState, action) {
    return handlers[action.type] ? handlers[action.type](state, action) : state
  }
}
