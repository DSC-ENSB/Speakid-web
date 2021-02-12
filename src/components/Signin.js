import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import db from '../config/db'

const Login = () => {
  const [email, setEmail] = useState('')
  const [passwd, setPasswd] = useState('')
  const [isProg, setIsProg] = useState(false)
  const [err, setErr] = useState(null)

  const handleSubmit = (event) => {
    if (email === '' || passwd === '') {
      setErr('Fill the inputs ')
    }
    else {
      setIsProg(true)
      db.auth()
        .signInWithEmailAndPassword(email, passwd)
        .then((res) => {
          const uid = res.user.uid;
          const usersRef = db.database().ref(`doc/${uid}`);
          usersRef
            .once('value')
            .then((snapShot) => {
              if (snapShot.val() != null) {
                setErr('User does not exist !');
              }
            })
            .then(() => {
              setIsProg(false);
              window.location = "/user"
            })
            .catch((err) => {
              setIsProg(false)
              setErr(err.message);
            });
        })
        .catch((err) => {
          setIsProg(false)
          setErr(err.message);
        });
    }
    event.preventDefault()
  }
  return (
    <div className="px-sm-1 py-3 p-md-3 col-md-9 offset-md-3 offset-lg-5 col-sm-12 col-lg-6 col-xl-6 vh-100">
      <div>
        <h6 className="text-right">Do not have an account?
        <Link to="/register"> Register</Link>
        </h6>
      </div>
      <div className="mt-5 middler">
        <div className="mt-5 px-1 px-md-1 px-lg-3 px-xl-5">
          <h2 className="px-3 mb-5">Welcome Back</h2>
          <div className="px-sm-2 px-md-4">
            <div className={err == null ? "d-none" : "alert alert-danger "} role="alert">
              {err}
            </div>
          </div>
          <form action="/user" method="POST" id="mrof">
            <div>
              <div className="col-12 px-sm-1 px-md-3 my-2">
                <label className="mx-2">E-mail <span>*</span></label>
                <br></br>
                <input
                  name="email"
                  type="email"
                  value={email}
                  required
                  onChange={(ev) => setEmail(ev.target.value)}
                  className="input form-control py-4 mx-2"
                  placeholder="E-mail *" />
              </div>
              <div className="col-12 px-sm-1 px-md-3 my-2">
                <label className="mx-2">Password <span>*</span></label>
                <br></br>
                <input
                  value={passwd}
                  onChange={(ev) => setPasswd(ev.target.value)}
                  name="passwd"
                  required
                  type="password"
                  className="input form-control  mx-2 py-4" placeholder="password *" />
              </div>

              <div className="col-12 px-sm-1 px-md-3 my-2">
                {isProg ?
                  <div className="svgLoading py-sm-2 py-md-2 mx-2">
                    <svg width="35" height="35" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
                      <g fill="none" fill-rule="evenodd">
                        <g transform="translate(1 1)" stroke-width="2">
                          <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
                          <path d="M36 18c0-9.94-8.06-18-18-18">
                            <animateTransform
                              attributeName="transform"
                              type="rotate"
                              from="0 18 18"
                              to="360 18 18"
                              dur="1s"
                              repeatCount="indefinite" />
                          </path>
                        </g>
                      </g>
                    </svg>
                  </div>
                  :
                  <input type="submit" onClick={handleSubmit} className="btn py-sm-3 py-md-3  mx-2 register-btn" value="LOGIN" />
                }
              </div>
              <h6 className="text-left px-sm-1 px-md-4 my-3">
                <Link to="/reset-password">Forget password ?</Link>
              </h6>
            </div>
          </form>
        </div>
      </div>
    </div >
  )
}
export default Login;