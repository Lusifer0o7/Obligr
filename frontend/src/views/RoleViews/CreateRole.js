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
import { BackgroundColorContext } from "contexts/BackgroundColorContext";

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

  return (
    <BackgroundColorContext.Consumer>
      {({ color }) => (
        <div className="content">
          <div>
            <Row>
              <div className="card col-md-4">
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
                  {permissionLoading ||
                  typeof permissionLoading === undefined ? (
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
                                data={color}
                              >
                                <div style={{ padding: "0.7em" }}>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                    }}
                                  >
                                    <h4
                                      style={{ color: "white", margin: 0 }}
                                      className="card-title"
                                    >
                                      {permission.name}
                                    </h4>

                                    <div class="checkbox-wrapper">
                                      <label class="toggleButton">
                                        <input
                                          type="checkbox"
                                          id={permission._id}
                                          onChange={(e) => {
                                            const id = permission._id;
                                            setRoleData((prevFormData) => ({
                                              ...prevFormData, // Keep the rest of the roleData object unchanged
                                              permissions: e.target.checked
                                                ? [
                                                    ...prevFormData.permissions,
                                                    id,
                                                  ] // Add the ID if checked
                                                : prevFormData.permissions.filter(
                                                    (existingId) =>
                                                      existingId !== id
                                                  ), // Remove the ID if unchecked
                                            }));
                                          }}
                                        />
                                        <div>
                                          <svg viewBox="0 0 44 44">
                                            <path
                                              transform="translate(-2.000000, -2.000000)"
                                              d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758"
                                            ></path>
                                          </svg>
                                        </div>
                                      </label>
                                    </div>
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
      )}
    </BackgroundColorContext.Consumer>
  );
}
