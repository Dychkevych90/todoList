import axios from "axios";

const api = 'http://localhost:3001/api/tasks/get';

export function getTasks(){
  return axios.get(api)
}

export function addTask(task){
  return axios.post(api, task)
}