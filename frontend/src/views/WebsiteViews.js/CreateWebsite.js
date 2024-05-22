import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
} from "reactstrap";
import "../../assets/css/CreateWebsite.css";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "actions/userAction";
import Loader from "components/Loader";
import { toast } from "react-toastify";
import { createWebsite } from "actions/websiteAction";

export default function CreateWebsite() {
  const dispatch = useDispatch();

  const { loading, user, error } = useSelector((state) => state.user);

  const {
    loading: newWebsiteLoading,
    newWebsite,
    isCreated,
    error: newWebsiteError,
  } = useSelector((state) => state.newWebsite);

  const [websiteData, setWebsiteData] = useState({
    user: "",
    websiteName: "",
    hostName: "",
    websiteStatus: "ACTIVE",
    domainName: "",
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
    if (newWebsiteError) {
      toast.error(newWebsiteError.message);
    }
    if (isCreated) {
      toast.success("Website created Successfully");
    }
  }, [error, newWebsiteError, isCreated]);

  const handleCreateWebsite = () => {
    dispatch(createWebsite(websiteData));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="content">
          <Row>
            <Col md="6">
              <Card>
                <CardHeader>
                  <h5 className="title">New Website</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="11">
                        <FormGroup>
                          <label>User</label>
                          <Input
                            style={{ textTransform: "capitalize" }}
                            defaultValue={`${user.firstName}  ${user.lastName}`}
                            placeholder="Your Name.."
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="11">
                        <FormGroup>
                          <label htmlFor="">Name of website</label>
                          <Input
                            placeholder="Website Name.."
                            type="text"
                            defaultValue={websiteData.websiteName}
                            onChange={(e) =>
                              setWebsiteData((prevState) => ({
                                ...prevState,
                                user: user && user._id,
                                websiteName: e.target.value,
                              }))
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="11">
                        <FormGroup>
                          <label htmlFor="status-dropdown">Status</label>
                          <UncontrolledDropdown>
                            <DropdownToggle
                              caret
                              data-toggle="dropdown"
                              id="status-dropdown"
                            >
                              {websiteData.websiteStatus}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                onClick={(e) =>
                                  setWebsiteData((prevState) => ({
                                    ...prevState,
                                    websiteStatus: "ACTIVE",
                                  }))
                                }
                              >
                                ACTIVE
                              </DropdownItem>
                              <DropdownItem
                                onClick={(e) =>
                                  setWebsiteData((prevState) => ({
                                    ...prevState,
                                    websiteStatus: "DRAFT",
                                  }))
                                }
                              >
                                DRAFT
                              </DropdownItem>
                              <DropdownItem
                                onClick={(e) =>
                                  setWebsiteData((prevState) => ({
                                    ...prevState,
                                    websiteStatus: "DISABLE",
                                  }))
                                }
                              >
                                DISABLE
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col md="6">
              <Card>
                <CardHeader>
                  <h5 className="title">Domain</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="11">
                        <FormGroup>
                          <label>Domain Name</label>
                          <Input
                            placeholder="Domain name.."
                            type="text"
                            defaultValue={websiteData.domainName}
                            onChange={(e) =>
                              setWebsiteData((prevState) => ({
                                ...prevState,
                                domainName: e.target.value,
                              }))
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <div class="checkbox-wrapper-46">
                          <input type="checkbox" id="cbx-46" class="inp-cbx" />
                          <label for="cbx-46" class="cbx">
                            <span>
                              <svg
                                viewBox="0 0 12 10"
                                height="10px"
                                width="12px"
                              >
                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                              </svg>
                            </span>
                            <span>
                              <strong>SSL</strong>(Secure Sockets Layer)
                            </span>
                          </label>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter style={{ textAlign: "end" }}>
                  <Button
                    className="btn-fill"
                    color="primary"
                    onClick={handleCreateWebsite}
                  >
                    Submit
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}
