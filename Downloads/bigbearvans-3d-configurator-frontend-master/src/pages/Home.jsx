import { Card, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";

import "./Home.css";

const Home = () => {
  const { user } = useAuth();
  const cards = [
    {
      title: "White",
      link: "/white",
      img: "./images/white-removebg-preview.png",
      bgClass: "bg-white",
    },
    {
      title: "Black",
      link: "/black",
      img: "./images/black-removebg-preview.png",
      bgClass: "bg-dark text-white",
    },
    {
      title: "Blue Grey",
      link: "/blue-grey",
      img: "./images/blue-grey-removebg-preview.png",
      bgClass: "bg-primary bg-opacity-10",
    },
    {
      title: "Graphite Grey",
      link: "/graphite-grey",
      img: "./images/graphite-grey-removebg-preview.png",
      bgClass: "bg-secondary bg-opacity-10",
    },
    {
      title: "Pebble",
      link: "/pebble",
      img: "./images/pebble-removebg-preview.png",
      bgClass: "bg-light",
    },
    {
      title: "Silver Grey",
      link: "/silver-grey",
      img: "./images/silver-grey-removebg-preview.png",
      bgClass: "bg-info bg-opacity-10",
    },
    {
      title: "Stone Grey",
      link: "/stone-grey",
      img: "./images/stone-grey-removebg-preview.png",
      bgClass: "bg-warning bg-opacity-10",
    },
  ];

  return (
    <>
      <Navbar user={user} />
      <div className="home-container d-flex align-items-center justify-content-center min-vh-90">
        <div className="container px-4">
          <h1 className="text-center mt-4 p-5 mb-lg-5 display-5 fw-bold text-uppercase">
            Select Your Color
          </h1>
          <div className="row g-4 justify-content-center">
            {/* First 3 cards */}
            {cards.slice(0, 3).map((card, index) => (
              <div
                key={index}
                className="col-12 col-sm-6 col-md-4 col-xl-3 d-flex justify-content-center"
              >
                <Link to={card.link} className="text-decoration-none w-100">
                  <Card
                    className={`h-100 border-2 border-transparent  $ {card.bgClass} transition-all`}
                  >
                    <div className="card-img-container p-3">
                      <Card.Img
                        variant="top"
                        src={card.img}
                        className="card-img-custom"
                      />
                    </div>
                    <Card.Body className="d-flex flex-column pb-4">
                      <Card.Title className="text-center fs-5 fw-bold mb-3">
                        {card.title}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            ))}

            {/* Next 4 cards */}
            {cards.slice(3).map((card, index) => (
              <div
                key={index + 3}
                className="col-12 col-sm-6 col-md-4 col-xl-3 d-flex justify-content-center"
              >
                <Link to={card.link} className="text-decoration-none w-100">
                  <Card
                    className={`h-100 border-2 border-transparent  $ {card.bgClass} transition-all`}
                  >
                    <div className="card-img-container p-3">
                      <Card.Img
                        variant="top"
                        src={card.img}
                        className="card-img-custom"
                      />
                    </div>
                    <Card.Body className="d-flex flex-column pb-4">
                      <Card.Title className="text-center fs-5 fw-bold mb-3">
                        {card.title}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
