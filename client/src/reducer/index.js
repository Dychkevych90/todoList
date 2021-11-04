const initialState = {
  // all tasks
  tasks: [],
  info: []
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    // get all tasks from server
    case "GET_ALL_TASKS":
      return {
        ...state,
        info: action.info
      }

    default:
      return state;
  }
}

export default reducer;