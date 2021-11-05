import axios from "axios";

const api = 'http://localhost:3001/api/tasks/';

export function getTasks(){
  return axios.get(api)
}

export function addTask(task){
  return axios.post(api, task)
}

export function deleteTask(id){
  return axios.delete(api + "/" + id);
}

export function updateTask(id, task) {
  return axios.put(api + "/" + id, task);
}