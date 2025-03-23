import React, { useState } from "react";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoURL,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (e) {
      setError(e?.response?.data);
      console.error(e);
    }
  };

  return (
    <>
      <div className="flex my-10 justify-center">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-xl bg-opacity-80">
            <div className="card-body">
              <h2 className="card-title">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name:</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name:</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs my-2"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Photo URL :</span>
                  </div>
                  <input
                    type="text"
                    value={photoURL}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setPhotoURL(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age:</span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Gender:</span>
                  </div>
                  <select
                    className="select select-bordered"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option disabled value="">
                      Pick one
                    </option>
                    <option>female</option>
                    <option>male</option>
                    <option>others</option>
                  </select>
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">About:</span>
                  </div>
                  <textarea
                    className="textarea"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>
                </label>
              </div>
              <p className="text-error font-semibold my-2 text-center">
                {error}
              </p>
              <div className="card-actions justify-center">
                <button className="btn btn-neutral" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, gender, age, about, photoURL }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>Profile Updated successfully</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
