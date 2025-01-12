import { useRef } from "react";
import "../styles/Comments.css";
import useFetch from "../utilities/useFetch";

function Comment({ id }) {
  const { data, status } = useFetch(`${import.meta.env.VITE_API_URL}/messages/${id}`);

  if (status == "loading")
    return (<div className="spinner content"> <div></div> </div>);
  if (status == "error")
    return (<div className="error content"> <div>&#x2716;</div> Oops! Something went wrong. </div>);

  const comments = JSON.parse(data);
  
  return (
    comments.map((comment) =>
      <div className="comments" key={comment.id}>
        <div className="comment">
          <div className="comment-user">💬 &nbsp; {comment.user}</div>
          <div className="comment-text">{comment.content}</div>
        </div>
        <Comment {...{id: comment.id}} />
      </div>
    )
  );
}

function CommentSection({ id }) {
  const textareaRef = useRef();

  let handleStretchArea = () => {
    const area = textareaRef.current;
    area.style.height = "0";
    area.style.height = area.scrollHeight + "px";
  };

  let handleClearComment = () => {
    const area = textareaRef.current;
    area.value = "";
    handleStretchArea();
  };

  return (
    <div className="comment-section">
      <div className="comment-editor">
        <textarea placeholder="Write a comment..." ref={textareaRef} onChange={handleStretchArea} />
        <button onClick={handleClearComment}>Clear</button>
        <button>Submit</button>
      </div>
      <Comment {...{id}} />
    </div>
  );
}

export default CommentSection;
