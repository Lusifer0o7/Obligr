import React, { useEffect, useState } from "react";
import "../../assets/css/UpdateRoles.css";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Input,
  Label,
  Table,
} from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import { getAllRoles, getAllPermissions } from "actions/roleAction";
import { updateRole } from "actions/roleAction";
import { toast } from "react-toastify";
import { UPDATE_ROLE_RESET } from "constants/roleConstants";
import Loader from "components/Loader";

export default function UpdateRoles() {
  const dispatch = useDispatch();

  const {
    loading: roleLoading,
    roles,
    error: roleError,
  } = useSelector((state) => state.allRoles);
  const cardBarRef = React.useRef(null);

  const {
    loading: permissionLoading,
    permissions,
    error: permissionError,
  } = useSelector((state) => state.permission);

  const { loading, isUpdated, isDeleted, error } = useSelector(
    (state) => state.Role
  );

  const [checkedPermissions, setCheckedPermissions] = useState([]);

  const handleCheckUpdate = (roleId, permissions, e) => {
    const existingIndex = checkedPermissions.findIndex(
      (item) => item.roleId === roleId
    );
    const isChecked = e.target.checked;

    if (existingIndex !== -1) {
      const updatedPermissions = [...checkedPermissions];
      if (isChecked) {
        const permissionIndex =
          updatedPermissions[existingIndex].permissions.indexOf(permissions);
        if (permissionIndex === -1) {
          updatedPermissions[existingIndex].permissions.push(permissions);
          setCheckedPermissions(updatedPermissions);
        }
      } else {
        updatedPermissions[existingIndex].permissions = updatedPermissions[
          existingIndex
        ].permissions.filter((id) => id !== permissions);
        setCheckedPermissions(updatedPermissions);
      }
    } else {
      const role = roles.find((role) => role._id === roleId);
      if (isChecked) {
        setCheckedPermissions((prevPermissions) => [
          ...prevPermissions,
          {
            roleId: roleId,
            name: role.name,
            permissions: [permissions, ...role.permissions],
          },
        ]);
      } else {
        setCheckedPermissions((prevPermissions) => [
          ...prevPermissions,
          {
            roleId: roleId,
            name: role.name,
            permissions: role.permissions.filter((id) => id !== permissions),
          },
        ]);
      }
    }
  };

  const handleRoleUpdate = (id) => {
    const roleData = checkedPermissions.find((ele) => ele.roleId === id);
    dispatch(updateRole(roleData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
    if (isUpdated) {
      dispatch({ type: UPDATE_ROLE_RESET });
      toast.success(`Role Successfully Updated`);
    }
    if (isDeleted) {
      toast.error(`Role Successfully Deleted`);
    }
    dispatch(getAllRoles());

    dispatch(getAllPermissions());
  }, [isUpdated, error]);

  if (loading || roleLoading || permissionLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="content">
      <div className="role-container">
        <header>
          <div>
            <h1>Roles</h1>
            <p>👇 Scroll down to see all roles.</p>
          </div>
        </header>
        <div className="col-md-12">
          <ul id="cards">
            {roles &&
              roles.map((role, index) => {
                return (
                  <li
                    key={role._id}
                    className="role-card"
                    id={`card_${index + 1}`}
                    style={{ "--index": index + 1 }}
                    ref={cardBarRef}
                  >
                    <div className="card__content">
                      <div>
                        <h1
                          style={{
                            textTransform: "capitalize",
                            color: "whitesmoke",
                          }}
                        >
                          {role.name}

                          <button
                            className="btn-link btn-icon btn btn-info btn-sm"
                            style={{
                              color: "#00f2c3",
                              margin: "auto 0.5em",
                            }}
                          >
                            <i className="tim-icons icon-pencil"></i>
                          </button>
                        </h1>

                        <p>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleRoleUpdate(role._id)}
                          >
                            Update
                          </button>
                        </p>
                      </div>
                      <span>
                        <Card className="card-tasks permission-container">
                          <CardHeader>
                            <h4 className="title d-inline text-info">
                              Permissions.
                            </h4>
                          </CardHeader>
                          <CardBody>
                            <div
                              className="table-full-width table-responsive"
                              id="adnan"
                              key={index}
                            >
                              <Table>
                                <tbody>
                                  {permissions &&
                                    permissions.map((permission) => {
                                      const isChecked =
                                        role.permissions.includes(
                                          permission._id
                                        );

                                      return (
                                        <tr key={permission._id}>
                                          <td>
                                            <FormGroup check>
                                              <Label check>
                                                <Input
                                                  defaultChecked={isChecked}
                                                  defaultValue=""
                                                  type="checkbox"
                                                  onChange={(e) => {
                                                    handleCheckUpdate(
                                                      role._id,
                                                      permission._id,
                                                      e
                                                    );
                                                  }}
                                                />
                                                <span className="form-check-sign">
                                                  <span className="check" />
                                                </span>
                                              </Label>
                                            </FormGroup>
                                          </td>
                                          <td>
                                            <p className="title">
                                              {permission.name}
                                            </p>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                </tbody>
                              </Table>
                            </div>
                          </CardBody>
                        </Card>
                      </span>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}
