import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios';

import ServerSettings from '../../../services/serverSettings'

import './styled.scss';

const Registration = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const changeHandler = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const createNewUser = async (e) => {
    e.preventDefault();
    const server = new ServerSettings;

    await axios.post(`${server.getApi()}api/auth/registration/`, {...form},{
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(res => {
        console.log(res.data)
        localStorage.setItem('token', JSON.stringify({email: form.email}))
        document.location.reload()
      }).catch(error => console.error(error));
  }

  return (
    <div className={'wrapper'}>
      <h2>Registration Page</h2>
      <form className={'registrationForm'} onSubmit={(e) => createNewUser(e)}>
        <input type="email" required placeholder={'email'} name={'email'} onChange={changeHandler}/>
        <input type="password" required placeholder={'min length 6 symbols'} name={'password'} onChange={changeHandler}/>
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