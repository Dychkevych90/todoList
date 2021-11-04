import React from "react";
import {connect} from 'react-redux';

import PostListItem from "../postListItem/postListItem";

import {ListWrap} from './styled';

const PostList = ({info}) => {
  return (
    <ListWrap>
      {
        info.map((item, index) => {
          return (
            <PostListItem
              key={index}
              posts={item}
            />
          )
        })
      }
    </ListWrap>
  )
}

const mapStateToProps = (state) => {
  return {
    info: state.info
  }
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);