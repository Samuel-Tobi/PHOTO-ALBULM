import React, { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then(
        (result) => {
          const usersWithModifiedPhoneNumber = result.map((user) => ({
            ...user,
            phone: user.phone.split(" ")[0],
            extension: user.phone.split(" ")[1],
          }));
          console.warn(result);
          setUsers(usersWithModifiedPhoneNumber);
          setError("");
        },

        (_error) => {
          setError("Error in loading users");
        }
      );
  }, []);

  const usersHtml = users.map((user, key) => (
    <div key={key} className="user">
      <p>
        <b>Name: </b>
        <span>{user.name}</span>
      </p>

      <p>
        <b>Email: </b>
        <a href={`mailto:${user.email}`} target="_blank" rel="noreferrer">
          {user.email}
        </a>
      </p>

      <p>
        <b>Phone no: </b>
        {user.extension && (
          <span>
            <span> ({user.extension}) </span>
          </span>
        )}
        <a href={`tel:${user.phone}`}>{user.phone}</a>
      </p>

      <p>
        <b>Website: </b>
        <a href={user.website} target="_blank" rel="noreferrer">
          {user.website}
        </a>
      </p>
      <p>
        <b>Address: </b>
        <span>
          {user.address.street}, {user.address.suite}, {user.address.city}, {""}
          {user.address.zipcode}
        </span>
      </p>
    </div>
  ));
  return (
    <div className="Users">
      <h1>User</h1>
      {usersHtml}
    </div>
  );
}
