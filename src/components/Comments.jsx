import { useEffect, useRef, useState } from "react";
import "../styles/Comments.css";
import useFetch from "../utilities/useFetch";
import useSubmit from "../utilities/useSubmit";

function CommentDiscussion({ id }) {
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
      </div>
    )
  );
}

function CommentSection({ id }) {
  const editorRef = useRef();
  const [comments, setComments] = useState([]);
  
  const { data: submitData, status: submitStatus } = useSubmit(`${import.meta.env.VITE_API_URL}/messages`);
  const { data: fetchData, status: fetchStatus } = useFetch(`${import.meta.env.VITE_API_URL}/messages/${id}`);  
  
  useEffect(() => {
    if (fetchData) setComments(JSON.parse(fetchData));
  }, [fetchData]);
  
  let handleStretchArea = () => {
    editorRef.current.style.height = "0";
    editorRef.current.style.height = editorRef.current.scrollHeight + "px";
  };

  let handleClearComment = () => {
    editorRef.current.value = "";
    handleStretchArea();
  };

  let handleSubmitComment = async () => {
    const content = editorRef.current.value;
    if (!content) return;
    
    const response = await submitData({
      username: "RandomGuy69",
      password: "pwd",
      content,
      parent: id
    });

    if (response) setComments(prevComments => [...prevComments, response]);
    if(submitStatus == "error") handleClearComment();
  };
  
  if (fetchStatus == "loading")
    return (<div className="spinner content"> <div></div> </div>);
  if (fetchStatus == "error")
    return (<div className="error content"> <div>&#x2716;</div> Oops! Something went wrong. </div>);

  return (
    <div className="comment-section">
      <div className="comment-editor">
        <textarea placeholder="Write a comment..." ref={editorRef} onChange={handleStretchArea} />
        <button onClick={handleClearComment}>Clear</button>
        <button onClick={handleSubmitComment}>Submit</button>
      </div>
      {
        comments.map((comment) =>
          <div className="comments" key={comment.id}>
            <div className="comment">
              <div className="comment-user">💬 &nbsp; {comment.user}</div>
              <div className="comment-text">{comment.content}</div>
            </div>
            <CommentDiscussion {...{id: comment.id}} />
          </div>
        )
      }
    </div>
  );
}

export default CommentSection;
