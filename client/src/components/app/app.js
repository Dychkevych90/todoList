import React, {useState} from "react";
import axios from "axios";

import PostForm from "../postForm/postForm";
import PostList from "../postList/postList";

import {getTasks, addTask} from "../../services/services";

const App = () => {
  const [data, setData] = useState([
    {label: 'Go to supermarket', done: true, edited: false, id: 1},
    {label: 'Learn React', done: false, edited: false, id: 2},
    {label: 'Shopping', done: false, edited: false, id: 3}
  ])
  const [edit, setEdit] = useState('')
  const [test, setTest] = useState(4)


  const addItem = (text) => {
    setTest(test + 1)
    const newItem = {
      label: text,
      id: test
    }
    const newArr = [...data, newItem];

    setData(newArr)
  }

  const updateData = (value) => {
    setEdit(value)
  }

  const onEdit = (id) => {
    const index = data.findIndex(elem => elem.id === id)
    const old = data[index]

    const newItem = {...old, label: edit, edited: !old.edited}
    const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

    setData(newArr)
  }

  const deleteItem = (id) => {
    const index = data.findIndex(elem => elem.id === id);

    const newData = [...data.slice(0, index), ...data.slice(index + 1)];

    setData(newData)
  }

  const openEditModal = (id) => {
    const index = data.findIndex(elem => elem.id === id)
    const old = data[index]

    const newItem = {...old, edited: !old.edited}
    const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

    setData(newArr)
  }

  const onToggleDone = (id) => {
    const index = data.findIndex(elem=> elem.id === id);
    const old = data[index];
    const newItem = {...old, done: !old.done}

    const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

    setData(newArr)
  }

  return(
      <div className={'app'}>
        <div className="wrapper">
          <h1>Todo List</h1>

          <PostForm
            add={addItem}
            updateData={updateData}
          />

          <PostList
            posts={data}
            onEdit={onEdit}
            onDelete={deleteItem}
            changeValue={updateData}
            openEditModal={openEditModal}
            onToggleDone={onToggleDone}
          />
        </div>
      </div>
  )
}

export default App;