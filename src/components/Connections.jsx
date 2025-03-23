import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(response?.data?.data));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections?.length === 0) {
    return (
      <div className="my-10 text-center font-bold">
        <h1 className="text-2xl">😔 No connections to display!</h1>
      </div>
    );
  }

  return (
    <div className="my-10 text-center">
      <h2 className="font-bold text-2xl mb-4">CONNECTIONS 🌍</h2>

      {connections?.map((connection) => {
        const { _id, firstName, lastName, age, gender, photoURL, about } =
          connection;

        return (
          <div
            className="flex mx-auto bg-base-300 p-4 w-2/3 rounded-lg my-4 items-center"
            key={_id}
          >
            <div>
              <img
                alt="profile-img"
                className="w-20 h-20 rounded-full object-cover aspect-square flex-shrink-0"
                src={photoURL}
              />
            </div>
            <div className="text-left mx-5">
              <p className=" font-semibold text-xl">
                {firstName + " " + lastName}
              </p>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
