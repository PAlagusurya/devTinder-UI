import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(response?.data?.data));
    } catch (e) {
      console.error(e);
    }
  };

  const reviewRequests = async (status, id) => {
    try {
      const res = axios.post(
        `${BASE_URL}/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests?.length === 0) {
    return (
      <div className="my-10 text-center font-bold">
        <h1 className="text-2xl">No requests Found</h1>
      </div>
    );
  }

  return (
    <div className="my-10 text-center">
      <h2 className="font-bold text-2xl mb-4">Connection requests</h2>

      {requests?.map((request) => {
        const { _id, firstName, lastName, age, gender, photoURL, about } =
          request.fromUserId;

        return (
          <div
            className="flex mx-auto bg-base-300 rounded-lg justify-between my-4 items-center p-4 w-2/3"
            key={_id}
          >
            <div>
              <img
                alt="profile-img"
                className="w-20 h-20 rounded-full object-cover aspect-square flex-shrink-0"
                src={photoURL}
              />
            </div>
            <div className="text-left mx-4">
              <p className=" font-semibold text-xl">
                {firstName + " " + lastName}
              </p>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div className="flex justify-center my-2">
              <button
                className="btn bg-red-600 hover:bg-red-800 text-white"
                onClick={() => reviewRequests("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn bg-green-600 hover:bg-green-800 text-white"
                onClick={() => reviewRequests("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
