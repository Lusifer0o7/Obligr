/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { getAllUsers } from "actions/userAction";
import { clearErrors } from "actions/userAction";
import { deleteUser } from "actions/userAction";
import Loader from "components/Loader";
import { DELETE_USER_RESET } from "constants/userConstants";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../assets/css/UserList.css";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
} from "reactstrap";

function UserList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, users } = useSelector((state) => state.allUsers);

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
      toast.error(error, { toastId: "error" });
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    if (!error) {
      dispatch(getAllUsers());
    }
  }, [dispatch, error, isDeleted, deleteError]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h3">Users</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>_Id</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                        <th>Phone No.</th>
                        <th>Role</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => {
                        return (
                          <tr key={user._id}>
                            <td>{user._id}</td>
                            <td style={{ textTransform: "capitalize" }}>
                              {user.firstName}
                            </td>
                            <td style={{ textTransform: "capitalize" }}>
                              {user.lastName}
                            </td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.role.name}</td>
                            <td className="text-center">
                              <span>
                                <Link to={`/admin/user/${user._id}`}>
                                  <Button
                                    className="btn-round btn-icon"
                                    color="info"
                                    style={{ margin: "5px" }}
                                  >
                                    <i className="fa-regular fa-pen-to-square"></i>
                                  </Button>
                                </Link>

                                <Link to={`/admin/impersonate/${user._id}`}>
                                  <Button
                                    className="btn-round btn-icon"
                                    color="primary"
                                    style={{ margin: "5px" }}
                                  >
                                    <i className="fa-solid fa-user-gear"></i>
                                  </Button>
                                </Link>

                                <Button
                                  className="btn-round btn-icon"
                                  color="danger"
                                  style={{ margin: "5px" }}
                                  onClick={() => deleteUserHandler(user._id)}
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </Button>
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      )}
    </>
  );
}

export default UserList;
