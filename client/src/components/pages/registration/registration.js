import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios';

import ServerSettings from '../../../services/serverSettings'

import './styled.scss';

const Registration = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    first_name: ''
  })

  const changeHandler = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const createNewUser = async (e) => {
    e.preventDefault();
    const server = new ServerSettings;

    await axios.post(`${server.getApi()}api/auth/registration/`, {...form}, {
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(res => {
        console.log(res.data)
        localStorage.setItem('token', JSON.stringify({email: form.email}))
        //document.location.reload()
      }).catch(error => console.error(error));
  }

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className={'wrapper'}>
      <h2>Registration Page</h2>
      <form className={'registrationForm'} onSubmit={(e) => createNewUser(e)}>
        <input type="text" required placeholder={'first name...'} name={'first_name'} onChange={changeHandler}/>
        <input type="email" required placeholder={'email'} name={'email'} onChange={changeHandler}/>
        <div className="inputPassWrap">
          <input type={passwordShown ? "text" : "password"}
                 required
                 placeholder={'password(min length 6 symbols)'}
                 name={'password'}
                 onChange={changeHandler}
          />
          <button type={'button'} onClick={togglePassword}>{passwordShown ? "hide" : "show"}</button>
        </div>
        <button
          type={'submit'}
        >
          Registration
        </button>
        <span>Do you have an account? <NavLink to={'/'}>Sign In</NavLink></span>
      </form>
    </div>
  )
}

export default Registration;