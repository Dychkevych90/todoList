import React, {useState, useEffect} from "react";
import axios from "axios";
import {connect} from 'react-redux'

import PostForm from "../postForm/postForm";
import PostList from "../postList/postList";

import {getTasks, addTask} from "../../services/services";
import {getAllTasks} from '../../actions'

const App = ({getAllTasks, info}) => {
  const [data, setData] = useState([
    {label: 'Go to supermarket', done: true, edited: false, id: 1},
    {label: 'Learn React', done: false, edited: false, id: 2},
    {label: 'Shopping', done: false, edited: false, id: 3}
  ])
  const [edit, setEdit] = useState('')
  const [test, setTest] = useState(4)

  useEffect(() => {
    const getTodoItem = async () => {
      const {data} = await getTasks()
      getAllTasks(data)
      console.log(data)
    }
    getTodoItem()
  }, [])

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
    const index = data.findIndex(elem => elem.id === id);
    const old = data[index];
    const newItem = {...old, done: !old.done}

    const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

    setData(newArr)
  }

  return (
    <div className={'app'}>
      <div className="wrapper">
        <h1>Todo List</h1>

        <PostForm
          add={addItem}
          updateData={updateData}
          addTask={addTask}
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

const mapStateToProps = (state) => {
  return {
    info: state.info
  }
};

const mapDispatchToProps = {
  getAllTasks
};

export default connect(mapStateToProps, mapDispatchToProps)(App);