import React from 'react'

import PostForm from '../../postForm/postForm';
import PostList from '../../postList/postList';

const Main = () => {
  return (
    <div className="wrapper">
      <h1>Todo List</h1>

      <PostForm/>

      <PostList/>
    </div>
  )
}

export default Main;