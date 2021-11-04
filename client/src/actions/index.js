const getAllTasks = (info) => {
  return {
    type: 'GET_ALL_TASKS',
    info
  }
}

export {
  getAllTasks
}