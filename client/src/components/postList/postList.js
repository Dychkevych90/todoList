import React from "react";
import {connect} from 'react-redux';

import PostListItem from "../postListItem/postListItem";

import './styled.scss';

const PostList = ({info, currentTarget}) => {
  return (
    <div className={'taskList'}>
      {
        info.map((item, index) => {
          if (item.author === currentTarget._id) {
            return (
              <PostListItem
                key={index}
                posts={item}
              />
            )
          }
        })
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    info: state.info,
    currentTarget: state.currentTarget
  }
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);