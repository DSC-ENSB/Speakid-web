import React from 'react';
import { Link } from 'react-router-dom'

const Main = () => {
  return (
    <main className="row justify-content-between align-items-center" id="main">
      <div className="col-lg-6 col-md-6 col-sm-12 text-center mt-5">
        <h1>Keep on touch with Patients any where
          easily on <span id="we-brand">SpeaKid.</span></h1>
        <p className=" text-center">
          watch all progress <br></br> in real time
        </p>
        <Link className="btn btn-register mx-2 py-3 px-3" to="/register">Register</Link>
        <Link className="btn btn-learn-more py-3 px-3" to="/learn-more">learn More</Link>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12" id="work">
      </div>
    </main >
  )
}
export default Main;