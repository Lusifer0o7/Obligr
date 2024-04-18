import React, { useEffect, useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import Loader from "components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetails } from "actions/userAction";
import { clearErrors } from "actions/userAction";
import { updateUser } from "actions/userAction";
import { UPDATE_USER_RESET } from "constants/userConstants";
import { getAllRoles } from "actions/roleAction";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: roleLoading,
    error: roleError,
    roles,
  } = useSelector((state) => state.role);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState({
    id: "",
    name: "",
  });

  const { id } = useParams();
  const userId = id;

  useEffect(() => {
    if (!roles) {
      dispatch(getAllRoles());
    }

    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setSelectedRole({ id: user.role._id, name: user.role.name });
    }

    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (roleError) {
      alert(roleError);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, isUpdated, updateError, user, userId, roles]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", selectedRole.id);

    dispatch(updateUser(userId, myForm));
  };

  const RoleSelectHandler = (event, _id, name) => {
    if (event) {
      event.preventDefault();
    }
    setSelectedRole({ id: _id, name: name });
  };

  return (
    <>
      {user === undefined || roles === undefined ? (
        <Loader />
      ) : (
        <div className="content">
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Edit Profile</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            caret
                            color="info"
                            data-toggle="dropdown"
                          >
                            {selectedRole.name}
                          </DropdownToggle>
                          <DropdownMenu>
                            {roles.map((role) => {
                              return (
                                <DropdownItem
                                  key={role._id}
                                  onClick={(e) =>
                                    RoleSelectHandler(e, role._id, role.name)
                                  }
                                >
                                  {role.name}
                                </DropdownItem>
                              );
                            })}
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                            defaultValue={user.name}
                            placeholder="Company"
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Last Name</label>
                          <Input
                            defaultValue="Andrew"
                            placeholder="Last Name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <Input
                            defaultValue={user.email}
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Address</label>
                          <Input
                            defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                            placeholder="Home Address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>City</label>
                          <Input
                            defaultValue="Mike"
                            placeholder="City"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <label>Country</label>
                          <Input
                            defaultValue="Andrew"
                            placeholder="Country"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label>Postal Code</label>
                          <Input placeholder="ZIP Code" type="number" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="8">
                        <FormGroup>
                          <label>About Me</label>
                          <Input
                            cols="80"
                            defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in
                            that two seat Lambo."
                            placeholder="Here can be your description"
                            rows="4"
                            type="textarea"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button
                    className="btn-fill"
                    color="primary"
                    type="submit"
                    onClick={updateUserSubmitHandler}
                  >
                    Save
                  </Button>
                </CardFooter>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar"
                        src={require("assets/img/emilyz.jpg")}
                      />
                      <h5 className="title">{user.name}</h5>
                    </a>
                    <p className="description">Ceo/Co-Founder</p>
                  </div>
                  <div className="card-description">
                    Do not be scared of the truth because we need to restart the
                    human foundation in truth And I love you like Kanye loves
                    Kanye I love Rick Owens’ bed design but the back is...
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="button-container">
                    <Button className="btn-icon btn-round" color="facebook">
                      <i className="fab fa-facebook" />
                    </Button>
                    <Button className="btn-icon btn-round" color="twitter">
                      <i className="fab fa-twitter" />
                    </Button>
                    <Button className="btn-icon btn-round" color="google">
                      <i className="fab fa-google-plus" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default UpdateUser;
