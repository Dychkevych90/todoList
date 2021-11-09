import React, {useState} from "react";
import axios from 'axios'
import {connect} from 'react-redux';

import './styled.scss';

import {getAllTasks} from '../../actions';

import ServerSettings from '../../services/serverSettings';

const PostForm = ({getAllTasks, info}) => {
  const [text, setText] = useState('')

  // get value from form input
  const onValueChange = (e) => {
    setText(e.target.value)
  }

  // add new item on todo list
  const handleSubmit = async (e) => {
    e.preventDefault();

    const server = new ServerSettings();

    const userId = '123'

    await axios.post(`${server.getApi()}api/tasks/`, {task: text}
    )
      .then(res => {
        getAllTasks([...info, res.data])
        setText('')
        console.log(res.data)
      }).catch(error => console.error(error));
  }

  return (
    <form className={'postForm'} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={'type text...'}
        onChange={onValueChange}
        value={text}
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
    info: state.info
  }
};

const mapDispatchToProps = {
  getAllTasks
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);