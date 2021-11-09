const getAllTasks = (info) => {
  return {
    type: 'GET_ALL_TASKS',
    info
  }
}

const getAllUsers = (user) => {
  return {
    type: "GET_ALL_USERS",
    user
  }
}

export {
  getAllTasks,
  getAllUsers
}