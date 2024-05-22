import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Row,
  UncontrolledTooltip,
} from "reactstrap";

export default function ProductList() {
  return (
    <div className="content">
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div className="col-md-6 col-lg-3">
          <Card className="card-stats">
            <CardBody>
              <CardImg
                alt="product"
                src={require("../../assets/img/usama-akram-kP6knT7tjn4-unsplash.jpg")}
              />
              <hr />
              <div>
                <CardTitle style={{ textAlign: "center" }}>
                  <h4 className="text-primary">Nike Shoes</h4>
                </CardTitle>
                <CardText>
                  <small>
                    "Lorem ipsum dolor amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore.
                  </small>
                </CardText>
              </div>
            </CardBody>

            <CardFooter>
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <div role="group" class="btn-group">
                  <button type="button" class="btn btn-info" id="cart">
                    <i class="fa-solid fa-cart-shopping"></i>
                  </button>

                  <UncontrolledTooltip placement="top" target="cart" delay={0}>
                    Add to Cart
                  </UncontrolledTooltip>

                  <button type="button" class="btn  btn-primary">
                    $5200
                  </button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="col-md-6 col-lg-3">
          <Card className="card-stats">
            <CardBody>
              <div>
                <CardImg
                  alt="product"
                  src={require("../../assets/img/samuel-lopes-FUR3LNiI2jc-unsplash.jpg")}
                />
              </div>
              <hr />
              <div>
                <CardTitle style={{ textAlign: "center" }}>
                  <h4 className="text-primary">Air Jordan</h4>
                </CardTitle>

                <CardText>
                  <small>
                    "Lorem ipsum dolor amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore.
                  </small>
                </CardText>
              </div>
            </CardBody>

            <CardFooter>
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <div role="group" class="btn-group">
                  <button type="button" class="btn btn-info" id="cart">
                    <i class="fa-solid fa-cart-shopping"></i>
                  </button>

                  <UncontrolledTooltip placement="top" target="cart" delay={0}>
                    Add to Cart
                  </UncontrolledTooltip>

                  <button type="button" class="btn  btn-primary" id="buynow">
                    $3000
                  </button>
                  <UncontrolledTooltip
                    placement="top"
                    target="buynow"
                    delay={0}
                  >
                    Buy Now
                  </UncontrolledTooltip>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="col-md-6 col-lg-3">
          <Card className="card-stats">
            <CardBody>
              <CardImg
                alt="product"
                src={require("../../assets/img/irene-kredenets-dwKiHoqqxk8-unsplash.jpg")}
              />
              <hr />
              <div>
                <CardTitle style={{ textAlign: "center" }}>
                  <h4 className="text-primary">Adidas Shoes</h4>
                </CardTitle>
                <CardText>
                  <small>
                    "Lorem ipsum dolor amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore.
                  </small>
                </CardText>
              </div>
            </CardBody>

            <CardFooter>
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <div role="group" class="btn-group">
                  <button type="button" class="btn btn-info" id="cart">
                    <i class="fa-solid fa-cart-shopping"></i>
                  </button>

                  <UncontrolledTooltip placement="top" target="cart" delay={0}>
                    Add to Cart
                  </UncontrolledTooltip>

                  <button type="button" class="btn  btn-primary">
                    $2500
                  </button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="col-md-6 col-lg-3">
          <Card className="card-stats">
            <CardBody>
              <CardImg
                alt="product"
                src={require("../../assets/img/martin-katler-Y4fKN-RlMV4-unsplash.jpg")}
              />
              <hr />
              <div>
                <CardTitle style={{ textAlign: "center" }}>
                  <h4 className="text-primary">Onitsuka Tigers</h4>
                </CardTitle>
                <CardText>
                  <small>
                    "Lorem ipsum dolor amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore.
                  </small>
                </CardText>
              </div>
            </CardBody>

            <CardFooter>
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <div role="group" class="btn-group">
                  <button type="button" class="btn btn-info" id="cart">
                    <i class="fa-solid fa-cart-shopping"></i>
                  </button>

                  <UncontrolledTooltip placement="top" target="cart" delay={0}>
                    Add to Cart
                  </UncontrolledTooltip>

                  <button type="button" class="btn  btn-primary">
                    $4500
                  </button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
