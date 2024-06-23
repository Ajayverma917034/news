import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditUserForm from "../../components/admin/EditUserForm";
import "./usercss.css";
import httpClient from "../../services/httpClient";
import toast from "react-hot-toast";
import AddNewUser from "../../components/admin/AddNewUser";

const columns = [
  { field: "email", headerName: "Email", width: 250 },
  { field: "fullName", headerName: "Name", width: 150 },
  { field: "username", headerName: "User Name", width: 150 },
  { field: "role", headerName: "User Role", width: 150 },
  {
    field: "edit",
    headerName: "Edit",
    width: 100,
    renderCell: (params) => (
      <button className="" onClick={() => params.row.onClick(params.row)}>
        Edit
      </button>
    ),
  },
];

const UserList = () => {
  const [searchText, setSearchText] = useState("");
  const [addNewUser, setAddNewUser] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  if (selectedUser) {
    toast.error("Under Development");
    setSelectedUser(null);
  }

  const fetchUsers = () => {
    httpClient
      .post(`admin/get-all-user`)
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handlePermissionChange = (event) => {
    setSelectedPermission(event.target.value);
  };

  const filteredRows = users
    .filter(
      (user) =>
        (user.username.toLowerCase().includes(searchText.toLowerCase()) ||
          user.email.toLowerCase().includes(searchText.toLowerCase())) &&
        (selectedPermission === "" || user.role === selectedPermission)
    )
    .map((user) => ({ ...user, onClick: handleEditClick }));

  return (
    <>
      <div className="user-list">
        <div className="header">
          <h2>User's List</h2>
          <button
            className="add-user-button bg-blue"
            onClick={() => setAddNewUser(true)}
          >
            + Add New User
          </button>
        </div>
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search user name, email ..."
            value={searchText}
            onChange={handleSearchChange}
          />
          <select
            className="search-select"
            value={selectedPermission}
            onChange={handlePermissionChange}
          >
            <option value="">User Permissions</option>
            <option value="admin">Admin</option>
            <option value="reporter">Reporter</option>
          </select>
          <button className="search-button bg-blue">Search</button>
        </div>
      </div>
      <div className="flex-1 p-6 bg-gray-100">
        <div className="h-80 bg-white shadow-md rounded-lg">
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            getRowId={(row) => row.username}
          />
        </div>
        {/* {selectedUser && <EditUserForm user={selectedUser} setSelectedUser={setSelectedUser} />} */}
        {addNewUser && <AddNewUser setAddNewUser={setAddNewUser} />}
      </div>
    </>
  );
};

export default UserList;
