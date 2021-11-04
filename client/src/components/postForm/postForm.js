import React, {useState} from "react";

import * as Style from './styled';

import {addTask} from '../../services/services';

const PostForm = ({add, updateData, addTask}) => {
  const [text, setText] = useState('')

  const onValueChange = (e) => {
    setText(e.target.value)
    updateData(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    add(text);

    setText('')
  }

  return (
    <Style.PostFormWrap onSubmit={onSubmit}>
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

export default PostForm;