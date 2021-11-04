import React from "react";
import {connect} from 'react-redux';

import {deleteTask} from '../../services/services';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {faEdit} from '@fortawesome/free-solid-svg-icons'

import {ListItemWrap} from './styled';

import {getAllTasks} from '../../actions'

const PostListItem = ({posts, info, getAllTasks}) => {

// delete item from list
  const handleDelete = async (id) => {
    const originalTasks = info;
    const tasks = originalTasks.filter((task) => task._id !== id);

    getAllTasks(tasks)
    await deleteTask(id);
  }

  return (
    <>
      <ListItemWrap
        id={posts._id}
        doneStyle={posts.done}
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
        <button className={'btn_done'}><FontAwesomeIcon icon={faStar}/></button>
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