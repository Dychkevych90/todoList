const initialState = {
  tasks: [],
  info: [],
  user: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // get all tasks from server
    case "GET_ALL_TASKS":
      return {
        ...state,
        info: action.info
      }

    // get all users
    case "GET_ALL_USERS":
      return {
        ...state,
        user: action.user
      }

    default:
      return state;
  }
}

export default reducer;