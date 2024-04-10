import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAllUsers, clearErrors, deleteUser } from "../actions/userAction";
import { DELETE_USER_RESET } from "../constants/userConstants";
import EditIcon from "@mui/icons-material/Edit";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import DeleteIcon from "@mui/icons-material/Delete";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID", flex: 0.5 },

    {
      field: "email",
      headerName: "Email",
      flex: 0.4,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.3,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      flex: 0.3,
      cellClassName: (params) => {
        return params.api.getCellValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.7,
      headerName: "Actions",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button>
              <Link
                to={`/admin/users/${params.api.getCellValue(params.id, "id")}`}
              >
                <EditIcon />
              </Link>
            </Button>

            <Button>
              <Link
                target="_blank"
                to={`/admin/impersonate/${params.api.getCellValue(
                  params.id,
                  "id"
                )}`}
              >
                <ManageAccountsIcon />
              </Link>
            </Button>

            <Button
              onClick={() =>
                deleteUserHandler(params.api.getCellValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <div className="dashboard">
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
            autoWidth
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
