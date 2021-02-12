import React, { useState, useEffect } from 'react'
import avatar from '../static/user.png'
import db from '../config/db'

const ProfileInforamtion = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState('')
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");

  const GetData = async () => {
    setIsLoading(true)
    const userID = db.auth().currentUser.uid;
    const usersRef = await db.database().ref(`doc/${userID}`);
    usersRef
      .once('value')
      .then((snapShot) => {
        setUser(snapShot.val())
        setIsLoading(false)
      }).catch(err => console.log(err))
  }
  const GetImage = () => {
    const userID = db.auth().currentUser.uid;
    const DownloadRef = db.storage().ref(`${userID}/image/`)
    DownloadRef
      .getDownloadURL()
      .then((url) => {
        setFile(null);
        setURL(url);
      });
  }
  const uploadFile = () => {
    const input = document.getElementById('avatar-img')
    const userID = db.auth().currentUser.uid;
    // check Image type *.png *.jpg 
    input.click()
    input.addEventListener('change', (e) => {
      setFile(e.target.files[0])
      console.log(e.target.files[0])
      const uploadRef = db.storage().ref(`${userID}/image/`).put(file);
      uploadRef.on("state_changed", () => {
        db.storage()
          .ref(`${userID}/image`)
          .getDownloadURL()
          .then((url) => {
            setFile(null);
            setURL(url);
          });
      });
    })
  }

  useEffect(() => {
    GetImage()
    GetData()
  }, [])
  return (
    <div className="row margin-t">

      {isLoading ?
        <div className="col-12 col-md-6 custome-box p-2 mb-3 loader">
          <div className="card">
            <div className="card-body">
              <svg width="75" height="75" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#ef002c">
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
          </div>

        </div>
        :
        <div className="col-12 col-md-6 p-2 mb-3">
          <div className="card custome-box ">
            <div className="row">
              <div className="card-header col-12">
                <div className="card-title ml-2 ml-md-5">
                  <h4>Profile Infomation</h4>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-3 ml-2 ml-md-5">
                    <form>
                      <input type="file" id="avatar-img" />
                    </form>
                    {url === '' ?
                      <img src={avatar} alt="u" className="avatar" onClick={uploadFile} />
                      :
                      <img src={url} alt="u" className="avatar" />
                    }
                  </div>
                  <div className="col-7 v-center">
                    <h4> {`${user.fname}  ${user.lname}`}</h4>
                  </div>
                  <div className="col-12 my-4 ml-2 ml-md-5">
                    {`Phone Number : ${user.phoneNUmber}`}
                  </div>
                  <div className="col-12 my-4 ml-2 ml-md-5">
                    {`Email : ${user.email}`}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      }
    </div >
  )
}
export default ProfileInforamtion;