import React from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {faEdit} from '@fortawesome/free-solid-svg-icons'

import {ListItemWrap} from './styled';

const PostListItem = ({posts, onEdit}) => {
  return (
    <ListItemWrap
      id={posts.id}>
      <div className={'title'}>{posts.label}</div>
      <button><FontAwesomeIcon icon={faStar}/></button>
      <button onClick={onEdit}><FontAwesomeIcon icon={faEdit}/></button>
      <button><FontAwesomeIcon icon={faTrash}/></button>
    </ListItemWrap>
  )
}

export default PostListItem;