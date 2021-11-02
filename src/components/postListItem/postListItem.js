import React from "react";

import {ListItemWrap} from './styled';

const PostListItem = ({posts, onEdit}) => {
  return (
    <ListItemWrap
      id={posts.id}>
      <span>{posts.label}</span>
      <button onClick={onEdit}>edit</button>
      <button>delete</button>
    </ListItemWrap>
  )
}

export default PostListItem;