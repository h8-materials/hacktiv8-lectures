import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_USER = gql`
  query GetUser($userId: ID) {
    getUser(id: $userId) {
      id
      name
      age
    }
  }
`;

const UserDetail = ({ userId }) => {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      userId: userId,
    },
  });
  
  return (
    <div>
      <h3>User Datail</h3>
      <h3>{userId}</h3>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default UserDetail;
