import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUsersFromFeed } from "../utils/feedSlice";
import axios from "axios";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, gender, age, about, photoURL } = user;
  const dispatch = useDispatch();

  const hanldeSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUsersFromFeed(userId));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={photoURL} alt="profile" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {gender && age && (
          <p className="font-semibold">{age + ", " + gender}</p>
        )}
        <p className="font-semibold">{about}</p>

        <div className="card-actions justify-center my-2">
          <button
            className="btn bg-red-600 hover:bg-red-800 text-white"
            onClick={() => hanldeSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn bg-green-600 hover:bg-green-800 text-white"
            onClick={() => hanldeSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
