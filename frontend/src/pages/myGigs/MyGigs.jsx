import React from "react";
import { Link } from "react-router-dom";
import "./MyGigs.scss";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function MyGigs() {
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();

  // Log current user for debugging
  //console.log("Current User:", currentUser);

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs", currentUser._id],
    queryFn: () => {
      console.log("Fetching gigs for userId:", currentUser?._id);
      return newRequest.get(`/gigs?userId=${currentUser._id}`).then((res) => {
       // console.log("Fetched gigs:", res.data);
        return res.data;
      });
    },
  });
  

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
     // console.log("Gig deleted, refetching list...");
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (id) => {
   // console.log("Deleting gig with ID:", id);
    mutation.mutate(id);
  };

  return (
    <div className="myGigs">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Gigs</h1>
            {currentUser?.isSeller ? (
              <Link to="/add">
                <button>Add New Gig</button>
              </Link>
            ) : (
              <p>You are not a seller. Become a seller to post gigs.</p>
            )}
          </div>
          {data.length === 0 ? (
            <p>No gigs found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Sales</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((gig) => (
                  <tr key={gig._id}>
                    <td>
                      <img className="image" src={gig.cover} alt="" />
                    </td>
                    <td>{gig.title}</td>
                    <td>{gig.price}</td>
                    <td>{gig.sales}</td>
                    <td>
                      <img
                        className="delete"
                        src="./img/delete.png"
                        alt=""
                        onClick={() => handleDelete(gig._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default MyGigs;
