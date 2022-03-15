import React, { useState, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import dayjs from "dayjs";
// import Postdetail from "./Postdetail";

function Post() {
  const params = useParams();

  const [postdetail, setPostdetail] = useState([]);
  const [comment, setComment] = useState([]);

  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  async function getcomment() {
    return await fetch(
      `https://fswd-wp.devnss.com/wp-json/wp/v2/comments/?post=${params.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setComment(data);
      });
  }

  useEffect(() => {
    getcomment();
    const getPost = async () => {
      await fetch(`https://fswd-wp.devnss.com/wp-json/wp/v2/posts/${params.id}`)
        .then((response) => response.json())
        .then((data) => {
          setPostdetail(data);
        });
    };
    getPost();

    return () => {
      setPostdetail([]);
      setComment([]);
    };
  }, []);

  const Showpost = () => {
    if (postdetail.length !== 0) {
      return (
        <Card className="mt-5">
          <Card.Header>
            <h2>{postdetail.title.rendered}</h2>
          </Card.Header>
          <Card.Text
            dangerouslySetInnerHTML={{ __html: postdetail.content.rendered }}
          ></Card.Text>
        </Card>
      );
    } else {
      return <div>Post is Loading....</div>;
    }
  };

  const Showcomment = () => {
    if (comment.length !== 0) {
      return comment.map((com) => {
        return (
          <Card key={com.id} className="mt-2">
            <Card.Body>
              <Card.Title>{com.author_name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Commented: {dayjs(com.date).format("DD MMMM YYYY — hh:mm")}
              </Card.Subtitle>
              <Card.Text
                dangerouslySetInnerHTML={{
                  __html: com.content.rendered,
                }}
              />
            </Card.Body>
          </Card>
        );
      });
    } else {
      return <div>Comment is Loading....</div>;
    }
  };

  const submitComment = async () => {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "Basic ZnN3ZDpmc3dkLWNtcw==",
      },
      body: JSON.stringify({
        author_name: author,
        content: content,
        post: params.id,
      }),
    };

    try {
      await fetch(
        "https://fswd-wp.devnss.com/wp-json/wp/v2/comments",
        options
      )
        .then((response) => response.json())
        .then((data) => console.log(data));
      getcomment();
    } catch (error) {
      throw error;
    }
  };

  return (
    <Container>
      <Showpost />
      <Card className="mt-2">
        <Card.Body>
          <Card.Header><h2>Comments</h2></Card.Header>
          <Card.Title>
            <input
              value={author}
              placeholder="Name"
              onChange={(val) => setAuthor(val.target.value)}
            />
          </Card.Title>
          <Card.Text>
            <textarea type="text" name="content" cols="145" rows="3" value={content} onChange={(val) => setContent(val.target.value)} placeholder="Comment..."></textarea>
            <Button onClick={submitComment}>Comment</Button>
          </Card.Text>
        </Card.Body>
      </Card>
      <Showcomment />
    </Container>
  );
}

export default Post;
