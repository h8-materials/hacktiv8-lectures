import React, { useState } from "react";
import UserDetail from "../components/UserDetail";
import { useQuery, gql, useMutation } from "@apollo/client";

const GET_USERS = gql`
  query GetUser {
    getUsers {
      id
      name
      age
    }
  }
`;

const ADD_USER = gql`
  mutation AddUser($newUser: UserInput) {
    addUser(user: $newUser) {
      id
      name
      age
    }
  }
`;

const User = () => {
  const [userInput, setUserInput] = useState({
    name: "",
    age: "",
  });
  const [userId, setUserId] = useState(null);

  const { data, loading, error } = useQuery(GET_USERS);
  const [
    addUser,
    { data: dataAddUser, loading: loadingAddUser, error: errorAddUser },
  ] = useMutation(ADD_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const onChange = (e) => {
    let { name, value } = e.target;
    const newInput = { ...userInput, [name]: value };
    setUserInput(newInput);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addUser({
      variables: {
        newUser: { ...userInput, age: Number(userInput.age) },
      },
    });
  };

  const handleDetail = (id) => {
    setUserId(id);
  };

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (errorAddUser) {
    return <h1>errorAddUser</h1>;
  }

  return (
    <div>
      <h2>User Page</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={userInput.name}
          name="name"
          onChange={onChange}
          placeholder="Name"
        />
        <input
          type="text"
          value={userInput.age}
          name="age"
          onChange={onChange}
          placeholder="Age"
        />
        <button type="submit"> Add User</button>
      </form>
      <div className="row">
        <div className="column">
          <h2>User List</h2>
          <ul>
            {data.getUsers.map((user) => (
              <li key={user.id}>
                {user.name}{" "}
                <button onClick={() => handleDetail(user.id)}>Detail</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="column">
          <h2>Detail</h2>
          {userId && <UserDetail userId={userId} />}
        </div>
      </div>
    </div>
  );
};

export default User;
