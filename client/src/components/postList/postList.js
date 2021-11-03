import React from "react";

import PostListItem from "../postListItem/postListItem";

import {ListWrap} from './styled';

const PostList = ({posts, onEdit, changeValue, onDelete, openEditModal, onToggleDone}) => {
  return (
    <ListWrap>
      {
        posts.map((item, index) => {
          return (
            <PostListItem
              key={index}
              posts={item}
              onEdit={() => onEdit(item.id)}
              onDelete={() => onDelete(item.id)}
              openEditModal={()=> openEditModal(item.id)}
              onToggleDone={()=> onToggleDone(item.id)}
              changeValue={changeValue}
              editModal={item.edited}
            />
          )
        })
      }
    </ListWrap>
  )
}

export default PostList;