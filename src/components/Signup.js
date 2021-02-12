import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import db from '../config/db'

const Signup = () => {
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [tel, setTel] = useState('')
  const [passwd, setPasswd] = useState('')
  const [checkPasswd, setCheckpasswd] = useState('')
  const [isProg, setIsProg] = useState(false)
  const [err, setErr] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (fname === '' || lname === '') {
      setErr('Personale information should not be empty')
    }
    else if (passwd !== checkPasswd) {
      setErr('Password Don\'t match ')
      console.log(passwd, checkPasswd)
    }
    else {
      setIsProg(true)
      db.auth()
        .createUserWithEmailAndPassword(email, passwd)
        .then((response) => {
          const uid = response.user.uid;
          const data = {
            id: uid,
            fname,
            lname,
            email,
            passwd,
            phoneNUmber: tel,
          };
          const usersRef = db.database().ref(`doc/${uid}`);
          usersRef.set(data)
            .then(() => window.location = '/user')
          setIsProg(false)
        })
        .catch((err) => {
          setIsProg(false)
          setErr(err.message);
        });
    }
  }
  return (
    <div className="px-sm-1 py-3 p-md-3 col-md-9 offset-md-3 offset-lg-5 col-sm-12 col-lg-6 col-xl-6 vh-100">
      <div>
        <h6 className="text-right">Already have an account?
        <Link to="/login"> login</Link>
        </h6>
      </div>
      <div className="pt-2 px-3">
        <div className="mt-5 px-1 px-md-1 px-lg-3 px-xl-5">
          <h2 className="px-3">Create an account</h2>
          <div className="px-sm-2 px-md-4">
            <div className={err == null ? "d-none" : "alert alert-danger "} role="alert">
              {err}
            </div>
          </div>
          <form action="/" method="POST" id="mrof">
            <div>
              <div className="row px-sm-1 px-md-3">
                <div className="col-12 col-md-6">
                  <label className="mx-2">First Name <span>*</span></label>
                  <br></br>
                  <input
                    name="fname"
                    value={fname}
                    onChange={(ev) => setFname(ev.target.value)}
                    type="text"
                    required
                    className="input form-control mx-2 py-4"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="mx-2">Last Name <span>*</span></label>
                  <br></br>
                  <input
                    name="lname"
                    type="text"
                    value={lname}
                    required
                    onChange={(ev) => setLname(ev.target.value)}
                    className="input form-control mx-2 py-4"
                  />
                </div>
                <br></br>
              </div>
              <div className="col-12  p px-sm-1 px-md-3 my-2">
                <label className="mx-2">E-mail <span>*</span></label>
                <br></br>
                <input
                  name="email"
                  type="email"
                  value={email}
                  required
                  onChange={(ev) => setEmail(ev.target.value)}
                  className="input form-control py-4 mx-2"
                />
              </div>
              <div className="col-12 px-sm-1 px-md-3">
                <label className="mx-2">Phone Number <span>*</span></label>
                <br></br>
                <input
                  name="tel"
                  type="tel"
                  value={tel}
                  onChange={(ev) => setTel(ev.target.value)}
                  required
                  className="input form-control py-4 mx-2" />
              </div>
              <div className="row px-sm-1 px-md-3">
                <div className="col-12 col-md-6  px-sm-1 px-md-3 my-2">
                  <label className="mx-2">Password <span>*</span></label>
                  <br></br>
                  <input
                    value={passwd}
                    onChange={(ev) => setPasswd(ev.target.value)}
                    name="passwd"
                    required
                    type="password"
                    className="input form-control  mx-2 py-4" />
                </div>
                <div className="col-12 col-md-6 px-sm-1 px-md-3 my-2">
                  <label className="mx-2">Confirm Password <span>*</span></label>
                  <br></br>
                  <input
                    value={checkPasswd}
                    onChange={(ev) => setCheckpasswd(ev.target.value)}
                    name="checkPasswd"
                    type="password"
                    required
                    className="input form-control  mx-2 py-4" />
                </div>
              </div>
              <div className="col-12  px-sm-1 px-md-3">
                <p className="px-sm-1 px-md-3">by registring you are agree on
                <Link to='/terms'>Terms & condition</Link> of Speakid service</p>
              </div>
              <div className="col-12  px-sm-1 px-md-3 my-2">
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
                  <input type="submit" onClick={handleSubmit} className="btn py-sm-3 py-md-3 register-btn mx-2" value="Register for free" />
                }
              </div>
            </div>
          </form>
        </div>
      </div>
    </div >
  )
}
export default Signup;