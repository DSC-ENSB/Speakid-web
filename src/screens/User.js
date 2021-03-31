import React, { useState } from 'react'
import Dashboard from '../components/Dashboard';
import Navbar from '../components/Navbar';
import SidePanal from '../components/SidePanal'
import db from '../config/db'


const User = () => {
  const [PatientDetails, setPatientsAnswers] = useState([])
  const onSelect = (id) => {
    const UserRef = db.database().ref(`user/${id}/answers`);
    UserRef
      .once('value')
      .then((snapShot) => {
        setPatientsAnswers(snapShot.val())
      })
      .catch(err => console.log(err))

  }
  return (
    <>
      <Navbar />
      <SidePanal onSelect={onSelect} />
      <Dashboard PatienAnswers={PatientDetails} />
    </>)
}
export default User;