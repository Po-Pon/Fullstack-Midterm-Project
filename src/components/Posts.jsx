import React, { useState, useEffect } from "react";
import { Button, Card, Container, Row } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";


const Posts = () => {
  
  let [post, setPost] = useState([]);
  const [category, setCategory] = useState([]);

  const [currentPost, setCurrentPost] = useState([]);

  async function getpost() {
    return await fetch("https://fswd-wp.devnss.com/wp-json/wp/v2/posts")
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        setCurrentPost(data)
      });
  }

  async function getcategory() {
    return await fetch("https://fswd-wp.devnss.com/wp-json/wp/v2/categories")
      .then((response) => response.json())
      .then((data) => setCategory(data));
  }


  function catefilter(id) {
    if (id === "") {
      setCurrentPost(post)
    } else {
      let dod = post.filter(post => {
        let num = post.categories
        return num.some((val) => val === parseInt(id))
      })
      setCurrentPost(dod)
    }
  }

  function getnameCategory(cate) {
    return cate.map((id) => {
      let num = Object.values(category).find((obj) => {
        return obj.id === id
      })
      return num.name
    })
  }

  useEffect(() => {
    getpost();
    getcategory();

    return(() => {
      setCurrentPost([])
      setPost([])
      setCategory([])
    })
  }, []);

  // Category(3), Style(20), Runner(75), Classic(77), Life(78), Uncategorized(1)
  return (

    <Container fluid bg="dark">
      <Row bg="dark">
        <Card>
          <Card.Header>
            <Nav variant="tabs" defaultActiveKey="" onSelect={(selectedKey) => catefilter(selectedKey)}>
              <Nav.Item>
                <Nav.Link eventKey="">ALL</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="3">Category</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="20">Style</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="75">Runner</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="77">Classic</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="78">Life</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="1">Uncategorized</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
        </Card>
        {
          currentPost.map(postdetail => {
            return (
              <div key={postdetail.id}>
                <Card>
                  <Card.Body>
                    <Card.Title>{postdetail.title.rendered}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Category: {
                      getnameCategory(postdetail.categories).join(', ')
                    }</Card.Subtitle>
                    <Card.Text dangerouslySetInnerHTML={{ __html: postdetail.excerpt.rendered }} />
                    <Link to={{
                      pathname: `/post/${postdetail.id}`,
                      state: {postdetail}
                    }}>
                      <Button variant="info"> Read More...</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            )
          })
        }
      </Row>
    </Container>
  );
}

export default Posts;
