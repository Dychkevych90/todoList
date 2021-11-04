import React, {useState, useEffect} from "react";
import axios from "axios";
import {connect} from 'react-redux'

import PostForm from "../postForm/postForm";
import PostList from "../postList/postList";

import {getTasks, addTask, deleteTask} from "../../services/services";
import {getAllTasks} from '../../actions'

const App = ({getAllTasks}) => {

  // get all tasks from server
  useEffect(() => {
    const getTodoItem = async () => {
      const {data} = await getTasks()
      getAllTasks(data)
    }
    getTodoItem()
  }, [])

  return (
    <div className={'app'}>
      <div className="wrapper">
        <h1>Todo List</h1>

        <PostForm/>

        <PostList/>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    info: state.info
  }
};

const mapDispatchToProps = {
  getAllTasks
};

export default connect(mapStateToProps, mapDispatchToProps)(App);