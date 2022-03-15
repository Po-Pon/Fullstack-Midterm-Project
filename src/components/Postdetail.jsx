import React from "react";

const Postdetail = (props) => {
  return (
    <div className="mx-auto px-8 px-56 py-12 border border-primary">
      <div>
        <div className="mb-12">
          <h2 className="my-3">{props.post.title.rendered}</h2>
        </div>
        <div dangerouslySetInnerHTML={{ __html: props.post.content.rendered}} />
      </div>
    </div>
  );
};

export default Postdetail;
