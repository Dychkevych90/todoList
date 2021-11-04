import React, {useState, useEffect} from "react";
import {connect} from 'react-redux';

import * as Style from './styled';

import {addTask} from '../../services/services';
import {getAllTasks} from '../../actions';

const PostForm = ({updateData, getAllTasks, info}) => {
  const [text, setText] = useState('')

  const onValueChange = (e) => {
    setText(e.target.value)
  }

  // add new task to list
  const handleSubmit = async (e) => {
    e.preventDefault();

    const {data} = await addTask({task: text})
    getAllTasks([...info, data])
    setText('')
  }


  return (
    <Style.PostFormWrap onSubmit={handleSubmit}>
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
    </Style.PostFormWrap>
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