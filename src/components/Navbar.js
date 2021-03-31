import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

import db from '../config/db'
import avatar from '../static/user.png'

const Navbar = () => {
  const Logout = async () => {
    await db.auth().signOut();
    window.location = "/"
  }
  const [url, setURL] = useState("");
  const GetImage = () => {
    const userID = db.auth().currentUser.uid;
    const DownloadRef = db.storage().ref(`${userID}/image/`)
    DownloadRef
      .getDownloadURL()
      .then((url) => {
        setURL(url);
      });
  }
  useEffect(() => {
    GetImage()
  }, [])
  return (
    <nav className="unav">
      <div>
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {url === '' ?
              <img src={avatar} alt="avatar" className="image-user" />
              :
              <img src={url} alt="avatar" className="image-user" />
            }
          </button>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
            <Link to='/profile'>
              <li class="dropdown-item">Profile</li>
            </Link>
            <button class="dropdown-item" onClick={Logout} type="button">Sign out</button>
          </div>

        </div>
      </div>
      <div>
        <ul>
          <Link to="/user">
            <li><FontAwesomeIcon icon={faHome} className="nav-icone" /></li>
          </Link>
        </ul>
      </div>
    </nav>
  )
}
export default Navbar;