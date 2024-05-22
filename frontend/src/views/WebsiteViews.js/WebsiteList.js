import { getAllWebsites } from "actions/websiteAction";
import Loader from "components/Loader";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

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

export default function WebsiteList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, websites } = useSelector(
    (state) => state.allWebsites
  );

  const { keyword: urlKeyword } = useParams(); //if url has keyword it will fetch data accordingly

  const [keyword, setKeyword] = useState(urlKeyword);

  useEffect(() => {
    dispatch(getAllWebsites());
  }, []);

  const paginationItems = [];
  // const totalPages = users.userCount / users.resultPerPage;
  // // Loop to create pagination items
  // for (let i = 1; i <= totalPages; i++) {
  //   paginationItems.push(
  //     <PaginationItem key={i} className="pagination-item">
  //       <PaginationLink className="pagination-link" href="#">
  //         {i}
  //       </PaginationLink>
  //     </PaginationItem>
  //   );
  // }

  if (typeof websites === "undefined") {
    return <Loader />;
  }

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
                  <CardTitle tag="h3">Websites</CardTitle>
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
                        <th>User</th>
                        <th>Website Name</th>
                        <th>Hostname</th>
                        <th>Status</th>
                        <th>Domain</th>
                        <th>Created At</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {websites.map((website, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{website.user.name}</td>
                            <td>{website.websiteName}</td>
                            <td>{website.hostName}</td>
                            <td>{website.websiteStatus}</td>
                            <td>{website.domainName}</td>

                            <td>
                              {website.createdAt
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
                                <Link to={``}>
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

                                <button
                                  id="delete"
                                  className="btn-link btn-icon btn btn-danger btn-sm"
                                  color="danger"
                                  style={{
                                    margin: "auto 0.2em",
                                    fontSize: "1.3em",
                                  }}
                                  // onClick={() => deleteUserHandler(user._id)}
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
        </div>
      )}
    </>
  );
}
