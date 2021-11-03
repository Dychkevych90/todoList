import React from "react";

import PostListItem from "../postListItem/postListItem";

import {ListWrap} from './styled';

const PostList = ({posts, onEdit}) => {
  return(
    <ListWrap>
      {
        posts.map((item, index) => {
          return (
            <PostListItem key={index} posts={item} onEdit={()=>onEdit(item.id)}/>
          )
        })
      }
    </ListWrap>
  )
}

export default PostList;