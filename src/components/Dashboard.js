import React, { useState, useEffect } from 'react';
import db from '../config/db'

const Dashboard = () => {
  const [query, setQuery] = useState('')
  const [trigger, settrigger] = useState(false)
  const [PatientDetails, setPatientDetails] = useState([])
  const [patients, setPatients] = useState([])
  const [res, setResponse] = useState([])

  const FetchPatientsData = async () => {
    const docID = db.auth().currentUser.uid;
    const DBref = await db.database().ref(`doc/${docID}/patients`);
    DBref
      .once('value')
      .then((snapShot) => {
        setPatients(snapShot.val())
      })
      .then(() => SelectPatients())
      .catch(err => console.log(err))
  }

  const SelectPatients = () => {
    patients.map((el) => {
      const UserRef = db.database().ref(`user/${el}`);
      UserRef
        .once('value')
        .then((snapShot) => {
          setResponse(snapShot.val())
          settrigger(true)
        }).catch(err => console.log(err))
    })
  }
  const renderData = n => {
    console.log(res)
    // const obj = res.filter(n => res.displayName == n)
    setPatientDetails(n)
  }
  useEffect(async () => {
    await FetchPatientsData()
  }, [])
  return (
    <div className="row margin-t">

      <div className="col-12 col-md-12 p-2 mb-2">
        <div className="card custome-box ">
          <div className="row">
            <div className="card-header col-12">
              <div className="card-title ml-md-4">
                <h4>Search For your Patients</h4>
              </div>
            </div>
            <div className="card-body">
              <div className="col-12 px-sm-1 px-md-3">
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
      <div className="col-12 col-md-12 p-2 mb-2">
        <div className="card custome-box">
          <div className="row">
            <div className="card-header col-2">
              {res !== null ?
                <button
                  onClick={() => renderData(res.displayName)}
                  className="col-6 col-md-6 col-lg-12 custome-box p-4 m-2 file-box">
                  {res.displayName}
                </button>
                :
                <div className='col-12'>
                  <p className='text-center'>Wait Patient add you</p>
                </div>
              }
            </div>
            <div className="card-body">
              <div className="col-9 offset-1 px-sm-1 px-md-3">
                {/* {PatientDetails.map((el) => { */}
                <p>{PatientDetails}</p>
                {/* })} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Dashboard;