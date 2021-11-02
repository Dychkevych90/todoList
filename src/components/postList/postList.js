import React from "react";
import PostListItem from "../postListItem/postListItem";

const PostList = ({posts, onEdit}) => {
  return(
    <>
      {
        posts.map((item, index) => {
          return (
            <PostListItem key={index} posts={item} onEdit={()=>onEdit(item.id)}/>
          )
        })
      }
    </>
  )
}

export default PostList;