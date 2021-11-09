import React from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios';

import {connect} from 'react-redux';
import ServerSettings from '../../../services/serverSettings';

import './styled.scss';

const Login = ({user}) => {

  const onLogin = async (e) => {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem('token'));

    const email = e.target.email.value
    const pass =  e.target.password.value

    const server = new ServerSettings();

    await axios.get(`${server.getApi()}api/auth/users`)
      .then(res => {
        const findUser = res.data.find(u => u.email === email);
        if(findUser) {
          localStorage.setItem('token', JSON.stringify({email: email}))
          document.location.reload();
        } else (
          console.log('user not found')
        )
      }).catch(error => console.error(error));
  }

  return (
    <div className={'wrapper'}>
      <h2>Login Page</h2>
      <form className={'registrationForm'} onSubmit={(e)=>onLogin(e)}>
        <input type="text" required placeholder={'email'} name={'email'}/>
        <input type="password" required placeholder={'password'} name={'password'}/>
        <button
          type={'submit'}
        >
          login
        </button>
        <span>Don`t have an account? <NavLink to={'/registration'}>Sign Up</NavLink></span>
      </form>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    user: state.user
  }
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);