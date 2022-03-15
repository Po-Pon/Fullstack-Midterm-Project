import React from "react";
import { Card } from "react-bootstrap";

function Comment(props) {

    let comment = props.comment;

  return (
    <div>
      <Card style={{ width: "2rem" }}>
            <Card.Body>
              <Card.Title>{comment.autor_name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {comment.date}
              </Card.Subtitle>
              <Card.Text dangerouslySetInnerHTML={{ __html: comment.content.rendered }} />
            </Card.Body>
          </Card>
    </div>
  );
};

export default Comment;
