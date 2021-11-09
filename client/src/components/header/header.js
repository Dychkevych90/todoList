import React, {useEffect, useState} from 'react'

import './styled.scss'

const Header = () => {
  const [user, setUser] = useState({});

  const getUser = () => {
    const user = JSON.parse(localStorage.getItem('token'));
    setUser(user)
  }

  useEffect(()=> {
    getUser();
  }, [])

  const logOut = () => {
    localStorage.removeItem('token');
    document.location.reload();
  }

  return (
    <div className={'header'}>
      <div className="name">{user.email}</div>
      <button onClick={logOut}>log out</button>
    </div>
  )
}

export default Header;