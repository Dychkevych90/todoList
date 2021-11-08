import React, {useRef, useState} from "react";
import axios from 'axios';
import {connect} from 'react-redux';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck} from '@fortawesome/free-solid-svg-icons'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {faEdit} from '@fortawesome/free-solid-svg-icons'
//import {ListItemWrap} from './styled';
import './styled.scss'

import {getAllTasks} from '../../actions'
import ServerSettings from '../../services/serverSettings';

const PostListItem = ({posts, info, getAllTasks}) => {
  const [editModal, setEditModal] = useState(false);
  const inputEl = useRef(null);

  // delete item from list
  const handleDelete = async (id) => {

    const server = new ServerSettings();

    const originalTasks = info;
    const tasks = originalTasks.filter((task) => task._id !== id);

    await axios.delete(`${server.getApi()}api/tasks/${id}`)
      .then(res => {
        getAllTasks(tasks)
      }).catch(error => console.error(error));
  }

  // toggle state inProgress/done
  const toggleDone = async (id) => {
    const server = new ServerSettings();

    const index = info.findIndex(elem => elem._id === id);
    const old = info[index]

    const newItem = {...old, completed: !old.completed}
    const newArr = [...info.slice(0, index), newItem, ...info.slice(index + 1)];

    getAllTasks(newArr)
    await axios.put(`${server.getApi()}api/tasks/${id}`, newItem)
      .then(res => {
        console.log(res.data)
      }).catch(error => console.error(error));
  }

  // edit message in list item
  const onEdit = async (id) => {
    const server = new ServerSettings();

    const index = info.findIndex(elem => elem._id === id);
    const old = info[index];

    const newValue = inputEl.current.value;

    const newItem = {...old, task: newValue}
    const newArr = [...info.slice(0, index), newItem, ...info.slice(index + 1)];

    getAllTasks(newArr)
    await axios.put(`${server.getApi()}api/tasks/${id}`, newItem)
      .then(res => {
        console.log(res.data)
      }).catch(error => console.error(error));
    setEditModal(!editModal)
  }

  return (
    <>
      <div className={'listItem'}
           id={posts._id}
      >
        {
          editModal ? (
            <div style={{backgroundColor: 'red', width: '100%', position: 'absolute'}}>
              <input
                className={'title'}
                type="text"
                //onChange={(e) => onChangeValue(e)}
                defaultValue={posts.task}
                ref={inputEl}
              />
              <button className={'editInputBtn'} onClick={() => onEdit(posts._id)}>save</button>
            </div>
          ) : (
            <div className={`${posts.completed && 'done'} title`}>{posts.task}</div>
          )
        }
        <button className={`${posts.completed && 'check'} btn_done`} onClick={() => toggleDone(posts._id)}>
          <FontAwesomeIcon icon={faCheck}/></button>
        <button onClick={() => setEditModal(true)}><FontAwesomeIcon icon={faEdit}/></button>
        <button className={'btn_delete'} onClick={() => handleDelete(posts._id)}><FontAwesomeIcon icon={faTrash}/>
        </button>
      </div>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(PostListItem);