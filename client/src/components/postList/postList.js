import React from "react";
import {connect} from 'react-redux';

import PostListItem from "../postListItem/postListItem";

import './styled.scss';

const PostList = ({info}) => {
  return (
    <div className={'taskList'}>
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
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    info: state.info
  }
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);