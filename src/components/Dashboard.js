import React, { useState, useEffect } from 'react';
import db from '../config/db'

const Dashboard = (props) => {
  const [query, setQuery] = useState('')
  return (
    <div className="row margin-t">

      <div className="col-12 offset-md-5 col-md-7 mb-2">
        <div className="card custome-box ">
          <div className="row">
            <div className="card-body">
              <div className="col-12 px-md2">
                <label className="mx-2">Patients Name <span>*</span></label>
                <br></br>
                <input
                  value={query}
                  onChange={(ev) => setQuery(ev.target.value)}
                  name="search"
                  required
                  type="text"
                  className="input form-control  mx-2 py-4" placeholder="Search ..." />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-12 p-2">
        <div className="card">
          <div className="row">
            <div className="card-body col-md-7 offset-5">
              <div className="px-sm-3 px-md-3 information-box">
                {Object.values(props.PatienAnswers).map((el, i) => {
                  return (
                    <p><span>{Object.values(el)}</span> {Object.keys(el)} </p>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Dashboard;