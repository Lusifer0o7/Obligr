import { getAllPermissions } from "actions/roleAction";
import Loader from "components/Loader";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Input, Row } from "reactstrap";
import "../../assets/css/CreateRole.css";
import { toast } from "react-toastify";
import { clearErrors } from "actions/userAction";
import { createRole } from "actions/roleAction";
import Spinner from "components/Spinner";
import { CREATE_ROLE_RESET } from "constants/roleConstants";

export default function CreateRole() {
  const dispatch = useDispatch();

  const {
    loading: permissionLoading,
    permissions,
    error: permissionError,
  } = useSelector((state) => state.permission);
  const {
    loading: newRoleLoading,
    newRole,
    isCreated,
    error: newRoleError,
  } = useSelector((state) => state.newRole);

  const [roleData, setRoleData] = useState({
    name: "",
    permissions: [],
  });

  useEffect(() => {
    if (permissionError) {
      toast.error(permissionError);
      dispatch(clearErrors());
    }
    if (newRoleError) {
      toast.error(newRoleError);
      dispatch(clearErrors());
    }
    if (isCreated) {
      toast.success(`${roleData.name} role has been created Successfully`);
      setRoleData({ name: "", permissions: [] });
    }

    dispatch({
      type: CREATE_ROLE_RESET,
    });

    dispatch(getAllPermissions());
  }, [permissionError, newRoleError, isCreated, dispatch]);

  const roleSubmitHandler = () => {
    dispatch(createRole(roleData));
  };
  console.log(roleData);

  return (
    <div className="content">
      <div>
        <Row>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Create Role.</h4>
              </div>
              <div className="card-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Give it a name.."
                  value={roleData.name}
                  onChange={(e) =>
                    setRoleData({
                      ...roleData,
                      name: e.target.value, // Update the name property
                    })
                  }
                />
                <button
                  className="btn-link btn btn-primary"
                  style={{ float: "right" }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </Row>
        <Row>
          <div className=" card col-md-12">
            <div className="card-header">
              <h3 className="card-title">Assign Permissions.</h3>
            </div>
            <Row>
              <div className="col-md-6"></div>
              <div className="col-md-6" style={{ float: "right" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Permissions.."
                  value=""
                />
                <button
                  className="btn-link btn btn-primary"
                  style={{ float: "right" }}
                >
                  Search
                </button>
              </div>
            </Row>
            <div className="card-body">
              {permissionLoading || typeof permissionLoading === undefined ? (
                <div style={{ textAlign: "center" }}>
                  <Spinner />
                </div>
              ) : (
                <Row
                  style={{
                    display: " grid",
                    gridTemplateColumns: " auto auto auto",
                  }}
                >
                  {permissions &&
                    permissions.map((permission) => {
                      return (
                        <Col key={permission._id}>
                          <div
                            className="card"
                            style={{
                              background:
                                "linear-gradient(0deg, #3358f4 0%, #1d8cf8 100%)",
                            }}
                          >
                            <div className="card-header">
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <h4
                                  style={{ color: "white" }}
                                  className="card-title"
                                >
                                  {permission.name}
                                  <p>
                                    <code
                                      style={{
                                        fontSize: "0.8em",
                                      }}
                                    >
                                      path: "{permission.path}"
                                    </code>
                                  </p>
                                </h4>

                                <label
                                  className="switch-button "
                                  htmlFor={permission._id}
                                >
                                  <div className="switch-outer">
                                    <input
                                      id={permission._id}
                                      type="checkbox"
                                      onChange={(e) => {
                                        const id = permission._id;
                                        setRoleData((prevFormData) => ({
                                          ...prevFormData, // Keep the rest of the roleData object unchanged
                                          permissions: e.target.checked
                                            ? [...prevFormData.permissions, id] // Add the ID if checked
                                            : prevFormData.permissions.filter(
                                                (existingId) =>
                                                  existingId !== id
                                              ), // Remove the ID if unchecked
                                        }));
                                      }}
                                    />
                                    <div className="button">
                                      <span className="button-toggle"></span>
                                      <span className="button-indicator"></span>
                                    </div>
                                  </div>
                                </label>
                              </div>
                            </div>
                          </div>
                        </Col>
                      );
                    })}
                </Row>
              )}
            </div>
          </div>
        </Row>
        <Row>
          <Col>
            <button
              className="btn-simple btn btn-primary"
              style={{ float: "right" }}
            >
              Cancel
            </button>
            <button
              className="btn-simple btn btn-primary"
              style={{ float: "right" }}
            >
              Reset
            </button>
            <button
              className="btn-simple btn btn-primary"
              style={{ float: "right" }}
              onClick={roleSubmitHandler}
            >
              Submit
            </button>
          </Col>
        </Row>
      </div>
    </div>
  );
}
