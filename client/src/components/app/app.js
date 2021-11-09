import React, {useEffect, useState} from "react";
import axios from "axios";
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router';

import Login from '../pages/login/login';
import Registration from '../pages/registration/registration'
import Home from '../pages/main/main';
import Header from '../header/header'

import {getAllTasks, getAllUsers} from '../../actions'
import ServerSettings from '../../services/serverSettings';

import './styled.scss';

const App = ({getAllTasks, getAllUsers}) => {
  const [loading, setLoading] = useState(false)

  // get All tasks from server
  useEffect(() => {
    const getTodoItem = async () => {

      const server = new ServerSettings();

      await axios.get(`${server.getApi()}api/tasks/`)
        .then(res => {
          getAllTasks(res.data);
        }).catch(error => console.error(error));
    }
    getTodoItem().catch(error => console.error(error));
  }, [])

  // get all users
  useEffect(() => {
    const getUsers = async () => {

      const server = new ServerSettings();

      await axios.get(`${server.getApi()}api/auth/users`)
        .then(res => {
          console.log(res.data);
          getAllUsers(res.data)
        }).catch(error => console.error(error));
    }
    getUsers().catch(error => console.error(error));
  }, [])

  // check token and redirect to home page
  const _checkToken = async () => {
    // get token from localstorage
    const token = JSON.parse(localStorage.getItem('token'));

    if (token) {
      const statusToken = token.email;
      // if token is not correct , delete him
      if (!statusToken) {
        localStorage.removeItem('token')
        setLoading(false)
        return
      }
      const server = new ServerSettings();

      await axios.get(`${server.getApi()}api/auth/users`)
        .then(res => {
          // find currently user
          const findUser = res.data.find(u => u.email === statusToken);
          if (findUser) {
            setLoading(true)
          }
        }).catch(error => console.error(error));

    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    _checkToken().catch(error => console.error(error));
  }, [])

  return (
    <div className={'app'}>
      {
        loading && (
          <Header/>
        )
      }

      <Switch>
        <Route path={'/'} exact >
          {
            loading
              ? <Redirect to={'/home'}/>
              : <Login/>
          }
        </Route>
        <Route path={'/home'} exact >
          {
            loading
              ? <Home/>
              : <Redirect to={'/'}/>
          }
        </Route>
        <Route path={'/registration'} exact>
          {
            loading
              ? <Redirect to={'/home'}/>
              : <Registration/>
          }
        </Route>
      </Switch>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    info: state.info,
    user: state.user
  }
};

const mapDispatchToProps = {
  getAllTasks,
  getAllUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(App);