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
import { deleteUser, loadImpersonatedUser } from "actions/userAction";
import Loader from "components/Loader";
import { DELETE_USER_RESET } from "constants/userConstants";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import styles from "../assets/css/UserList.css";
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
  Pagination,
  PaginationItem,
  PaginationLink,
  Input,
  UncontrolledTooltip,
} from "reactstrap";
import Spinner from "components/Spinner";

function UserList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const { keyword: urlKeyword } = useParams(); //if url has keyword it will fetch data accordingly

  const [keyword, setKeyword] = useState(urlKeyword);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const createdAt = (date) => {
    date.toISOString().substring(0, 10);
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
      navigate("/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    if (!error) {
      dispatch(getAllUsers(keyword));
    }
  }, [dispatch, error, isDeleted, deleteError, urlKeyword]);

  const paginationItems = [];
  const totalPages = users.userCount / users.resultPerPage;
  // Loop to create pagination items
  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <PaginationItem key={i} className="pagination-item">
        <PaginationLink className="pagination-link" href="#">
          {i}
        </PaginationLink>
      </PaginationItem>
    );
  }

  return (
    <>
      {loading && users ? (
        <Loader />
      ) : (
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h3">Users</CardTitle>
                </CardHeader>
                <div className="search-container">
                  <Input
                    className="search-bar"
                    placeholder="Search.."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  ></Input>
                  <Button
                    className="search-button btn-link btn btn-primary "
                    color="primary"
                    onClick={() => navigate(`/admin/users/${keyword}`)}
                  >
                    <i class="tim-icons icon-zoom-split"></i>
                  </Button>
                </div>

                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile No.</th>
                        <th>Role</th>
                        <th>Created At</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td style={{ textTransform: "capitalize" }}>
                              {`${user.firstName} ${user.lastName}`}
                            </td>

                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.role.name}</td>
                            <td>
                              {user.createdAt
                                .substring(0, 10)
                                .split("-")
                                .reverse()
                                .join("-")}
                            </td>
                            <td
                              className="text-center"
                              style={{ width: "11em", textAlign: "right" }}
                            >
                              <span style={{ width: "100%" }}>
                                <Link to={`/update-user/${user._id}`}>
                                  <button
                                    id="edit"
                                    className="btn-link btn-icon btn btn-info btn-sm"
                                    style={{
                                      color: "#00f2c3",
                                      fontSize: "1.3em",
                                      margin: "auto 0.2em",
                                    }}
                                  >
                                    <i class="tim-icons icon-pencil"></i>
                                  </button>
                                  <UncontrolledTooltip
                                    placement="top"
                                    target="edit"
                                    delay={0}
                                  >
                                    Edit
                                  </UncontrolledTooltip>
                                </Link>

                                <Link
                                  to={`/${user.role.name}/dashboard`}
                                  color="info"
                                  target="_blank"
                                >
                                  <button
                                    id="Imp-user"
                                    className="btn-link btn-icon btn btn-primary btn-sm"
                                    style={{
                                      margin: "auto 0.2em",
                                      color: "#5e72e4",
                                    }}
                                    onClick={() =>
                                      // navigate(`/admin/impersonate/${user._id}`)
                                      dispatch(loadImpersonatedUser(user._id))
                                    }
                                  >
                                    <i className="fa-solid fa-user-gear"></i>
                                  </button>
                                  <UncontrolledTooltip
                                    placement="top"
                                    target="Imp-user"
                                    delay={0}
                                  >
                                    Impersonate
                                  </UncontrolledTooltip>
                                </Link>

                                <button
                                  id="delete"
                                  className="btn-link btn-icon btn btn-danger btn-sm"
                                  color="danger"
                                  style={{
                                    margin: "auto 0.2em",
                                    fontSize: "1.3em",
                                  }}
                                  onClick={() => deleteUserHandler(user._id)}
                                >
                                  <i class="tim-icons icon-simple-remove"></i>
                                </button>
                                <UncontrolledTooltip
                                  placement="top"
                                  target="delete"
                                  delay={0}
                                >
                                  Delete
                                </UncontrolledTooltip>
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
            <Col>
              <Pagination className="pagination-container">
                <PaginationItem className="pagination-item-prev">
                  <PaginationLink className="pagination-link-prev" tag="span">
                    <i class="fa-solid fa-angles-left"></i>
                  </PaginationLink>
                </PaginationItem>

                {paginationItems}

                <PaginationItem className="pagination-item-next">
                  <PaginationLink className="pagination-link-next" href="#">
                    <i class="fa-solid fa-angles-right"></i>
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
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
