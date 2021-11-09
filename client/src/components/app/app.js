import React, {useEffect} from "react";
import axios from "axios";
import {connect} from 'react-redux'

import PostForm from "../postForm/postForm";
import PostList from "../postList/postList";

import {getAllTasks} from '../../actions'
import ServerSettings from '../../services/serverSettings';

import './styled.scss';

const App = ({getAllTasks}) => {

  // get All tasks from server
  useEffect(() => {
    const getTodoItem = async () => {

      const server = new ServerSettings();

      await axios.get(`${server.getApi()}api/tasks/`)
        .then(res => {
          getAllTasks(res.data);
          console.log(res.data)
        }).catch(error => console.error(error));
    }
    getTodoItem()
  }, [])

  useEffect(() => {
    const getUsers = async () => {

      const server = new ServerSettings();

      await axios.get(`${server.getApi()}api/auth/users`)
        .then(res => {
          console.log(res.data);
        }).catch(error => console.error(error));
    }
    getUsers()
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