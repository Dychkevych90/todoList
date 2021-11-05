import React from "react";
import axios from 'axios';
import {connect} from 'react-redux';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {faEdit} from '@fortawesome/free-solid-svg-icons'
import {ListItemWrap} from './styled';

import {getAllTasks} from '../../actions'
import ServerSettings from '../../services/serverSettings';

const PostListItem = ({posts, info, getAllTasks}) => {

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

  return (
    <>
      <ListItemWrap
        id={posts._id}
        doneStyle={posts.completed}
      >
        <div className={'title'}>{posts.task}</div>
        {/*{*/}
        {/*  editModal ? (*/}
        {/*    <div style={{backgroundColor: 'red', width: '100%', position: 'absolute'}}>*/}
        {/*      <input*/}
        {/*        className={'title'}*/}
        {/*        type="text"*/}
        {/*        onChange={(e) => onChangeValue(e)}*/}
        {/*        defaultValue={posts.task}*/}
        {/*      />*/}
        {/*      <button onClick={onEdit}>save</button>*/}
        {/*    </div>*/}
        {/*  ) : (*/}
        {/*    <div className={'title'}>{posts.task}</div>*/}
        {/*  )*/}
        {/*}*/}
        <button className={'btn_done'} onClick={() => toggleDone(posts._id)}><FontAwesomeIcon icon={faStar}/></button>
        <button><FontAwesomeIcon icon={faEdit}/></button>
        <button className={'btn_delete'} onClick={() => handleDelete(posts._id)}><FontAwesomeIcon icon={faTrash}/>
        </button>
      </ListItemWrap>
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