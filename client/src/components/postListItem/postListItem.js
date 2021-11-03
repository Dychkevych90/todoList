import React from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {faEdit} from '@fortawesome/free-solid-svg-icons'

import {ListItemWrap} from './styled';

const PostListItem = ({posts, onEdit, changeValue, onDelete, editModal, openEditModal, onToggleDone}) => {

  const onChangeValue = (e) => {
    changeValue(e.target.value)
  }
  return (
    <>
      <ListItemWrap
        id={posts.id}
        doneStyle={posts.done}
      >
        {
          editModal ? (
            <div style={{backgroundColor: 'red', width: '100%', position: 'absolute'}}>
              <input
                className={'title'}
                type="text"
                onChange={(e) => onChangeValue(e)}
                defaultValue={posts.label}
              />
              <button onClick={onEdit}>save</button>
            </div>
          ) : (
            <div className={'title'}>{posts.label}</div>
          )
        }
        <button className={'btn_done'} onClick={onToggleDone}><FontAwesomeIcon icon={faStar}/></button>
        <button onClick={openEditModal}><FontAwesomeIcon icon={faEdit}/></button>
        <button className={'btn_delete'} onClick={onDelete}><FontAwesomeIcon icon={faTrash}/></button>
      </ListItemWrap>
    </>
  )
}

export default PostListItem;