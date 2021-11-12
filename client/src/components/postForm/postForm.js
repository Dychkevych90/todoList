import React, {useState, useEffect} from "react";
import axios from 'axios'
import {connect} from 'react-redux';

import './styled.scss';

import {getAllTasks, getSingleUser} from '../../actions';

import ServerSettings from '../../services/serverSettings';

const PostForm = ({getAllTasks, info, getSingleUser, currentTarget}) => {
  const [task, setTask] = useState('')

  const onValueChange = (e) => {
    setTask(e.target.value)
  }

  // add new item on todo list
  const handleSubmit = async (e) => {
    e.preventDefault();

    const server = new ServerSettings();

    const userId = currentTarget._id;

    await axios.post(`${server.getApi()}api/tasks/add`, {task: task, author: userId}
    )
      .then(res => {
        getAllTasks([...info, res.data])
        setTask('')
        console.log(res.data)
      }).catch(error => console.error(error));
  }

  //get currently users
  useEffect(() => {
    const getUsers = async () => {
      const token = JSON.parse(localStorage.getItem('token'));
      const statusToken = token.email;
      const server = new ServerSettings();

      await axios.get(`${server.getApi()}api/auth/users`)
        .then(res => {
          const findUser = res.data.find(u => u.email === statusToken);
          getSingleUser(findUser)
        }).catch(error => console.error(error));
    }
    getUsers().catch(error => console.error(error));
  }, [])

  return (
    <form className={'postForm'} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={'type text...'}
        onChange={onValueChange}
        value={task}
      />
      <button
        type={'submit'}
      >
        send
      </button>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    info: state.info,
    currentTarget: state.currentTarget
  }
};

const mapDispatchToProps = {
  getAllTasks,
  getSingleUser
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);