import React, { useState, useEffect } from "react";
import { Container, Row, Card } from "react-bootstrap";

const Author = () => {
  const [author, setauthor] = useState([]);

  useEffect(() => {
    const getaut = async () => {
      return await fetch("https://fswd-wp.devnss.com/wp-json/wp/v2/users")
        .then((response) => response.json())
        .then((data) => setauthor(data));
    };
    getaut();

    return(() => {
      setauthor([])
    })
  },[]);

  return (
    <Container className="mt-5">
      <Row>
        {author.map((aut) => {
          return (
            <Card style={{ width: "18rem" }} key={aut.id} className="mx-3">
              <Card.Img variant="top" src={aut.avatar_urls['96']} />
              <Card.Body>
                <Card.Title>{aut.name}</Card.Title>
              </Card.Body>
            </Card>
          );
        })}
      </Row>
    </Container>
  );
};

export default Author;
