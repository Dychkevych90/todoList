import React, {useState} from "react";
import PostForm from "../postForm/postForm";
import PostList from "../postList/postList";

const App = () => {
  const [data, setData] = useState([
    {label: 'Go to supermarket', done: true, edit: false, id: 1},
    {label: 'Learn React', done: false, edit: false, id: 2},
    {label: 'Shopping', done: false, edit: false, id: 3}
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

    const newItem = {...old, label: edit}
    const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

    setData(newArr)
  }

  return(
      <div className={'app'}>
        <div className="wrapper">
          <h1>Todo List</h1>

          <PostForm
            add={addItem}
          />

          <PostList
            posts={data}
            onEdit={onEdit}
          />
        </div>
      </div>
  )
}

export default App;