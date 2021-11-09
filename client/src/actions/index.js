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

const getSingleUser = (currentTarget) => {
  return {
    type: "GET_USER",
    currentTarget
  }
}

export {
  getAllTasks,
  getAllUsers,
  getSingleUser
}