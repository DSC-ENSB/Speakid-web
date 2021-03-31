import React, { useState } from 'react'
import db from '../config/db'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends, faChartPie } from '@fortawesome/free-solid-svg-icons'

const SidePanal = (props) => {
  const [usersData, setUsersData] = useState(false)
  const [loader, setLoader] = useState(false)
  const [patients, setPatients] = useState([])
  const [res, setResponse] = useState([])

  const getPatients = () => {
    setLoader(true)
    setUsersData(!usersData)
    const getdata = () => {
      const docID = db.auth().currentUser.uid;
      const DBref = db.database().ref(`doc/${docID}/patients`);
      DBref
        .once('value')
        .then((snapShot) => {
          setPatients(Object.values(snapShot.val() || {}))
          SelectPatients()
        })
        .catch(err => console.log(err))
    }
    const SelectPatients = () => {
      let users = []
      patients.map((el) => {
        const UserRef = db.database().ref(`user/${el}`);
        UserRef
          .once('value')
          .then((snapShot) => {
            if (snapShot.val() !== null) {
              console.log(snapShot.val())
              users.push(snapShot.val())
              setResponse(users)
              setLoader(false)
            }
            else {
              setLoader(false)
            }
          }).catch(err => console.log(err))
      })
      setLoader(false)
    }
    if (usersData) {
      getdata()
    }
  }
  return (
    <>
      <div className="panal">
        <div>
          <ul>
            <li title="Patients list">
              <a onClick={getPatients}>
                <FontAwesomeIcon icon={faUserFriends} className="icone-panal" />
              </a>
            </li>
            <li title="Statistcs">
              <a onClick={getPatients}>
                <FontAwesomeIcon icon={faChartPie} className="icone-panal" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={usersData ? 'togglerSide' : 'd-none'}>
        <div>
          <h5 className="li-heading">Patients list</h5>
        </div>
        {loader ?
          <div className="d-flex justify-content-center v-center">
            <svg width="75" height="75" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#05ffd5">
              <g fill="none" fill-rule="evenodd" stroke-width="2">
                <circle cx="22" cy="22" r="1">
                  <animate attributeName="r"
                    begin="0s" dur="1.8s"
                    values="1; 20"
                    calcMode="spline"
                    keyTimes="0; 1"
                    keySplines="0.165, 0.84, 0.44, 1"
                    repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity"
                    begin="0s" dur="1.8s"
                    values="1; 0"
                    calcMode="spline"
                    keyTimes="0; 1"
                    keySplines="0.3, 0.61, 0.355, 1"
                    repeatCount="indefinite" />
                </circle>
                <circle cx="22" cy="22" r="1">
                  <animate attributeName="r"
                    begin="-0.9s" dur="1.8s"
                    values="1; 20"
                    calcMode="spline"
                    keyTimes="0; 1"
                    keySplines="0.165, 0.84, 0.44, 1"
                    repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity"
                    begin="-0.9s" dur="1.8s"
                    values="1; 0"
                    calcMode="spline"
                    keyTimes="0; 1"
                    keySplines="0.3, 0.61, 0.355, 1"
                    repeatCount="indefinite" />
                </circle>
              </g>
            </svg>
          </div>
          :
          res !== null ?
            res.map((el) => {
              return (
                <button
                  onClick={() => props.onSelect(el.id)}
                  className={usersData ? 'toggleSide col-6 col-md-6 col-lg-12 p-4 m-2 users-list' : 'd-none'}>
                  {el.displayName}
                </button>
              )
            })
            :
            <div className={usersData ? 'togglerSide col-12 pt-4' : 'd-none'}>
              <h5 className='text-center li-heading'>Wait while Patient add you</h5>
            </div>

        }
      </div>
    </>
  )
}
export default SidePanal;