import { useEffect, useState } from "react";
import "../styles/Comments.css";
import useFetch from "../utilities/useFetch";
import Editor from "./Editor";

function Comments({ parent }) {
  const [comments, setComments] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [showControls, setShowControls] = useState(null);
  const [content, setContent] = useState(null);
  const { data: fetchData, status: fetchStatus } = useFetch(`${import.meta.env.VITE_API_URL}/messages/${parent}`, false);  

  const isReply = new URLSearchParams(window.location.search).get("blog") != parent;
  
  useEffect(() => {
    if (fetchData) setComments(JSON.parse(fetchData));
  }, [fetchData]);
  
  if (fetchStatus == "loading")
    return (<div className="spinner comments"> <div></div> </div>);
  if (fetchStatus == "error")
    return (<div className="error comments"> <div>&#x2716;</div> Oops! Something went wrong. </div>);

  let handleDisplayControls = (id) => {
    setShowControls(showControls === id ? null : id);
  };

  let handleReply = (comment) => {
    setContent(`@${comment.user} `);
    setShowEditor(comment.id);
  };

  let handleDelete = async (id) => {
    const confirmDelete = window.confirm('Delete this comment?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/messages/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: localStorage.getItem('username'),
          password: localStorage.getItem('password')
        }),
      });
      if (response.ok) {
        setComments(comments.filter(comment => comment.id !== id));
      } else {
        console.error('Failed to delete the comment');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  let handleModify = (comment) => {
    setContent(comment.content);
    setShowEditor(comment.id);
  };

  return (
    <div className="comments">
      { !isReply && <Editor {...{parent, setComments, setShowEditor}} /> }
      {
        comments.map((comment) =>
          <div className="comments-list" key={comment.id} title={new Date(comment.date).toLocaleString().concat(comment.status == "edited" ? " (edited)" : "")}>
            <div className="comment">
              <div className="comment-user">
                💬 &nbsp; {comment.user}
                <span className="comment-controls" onClick={() => handleDisplayControls(comment.id)}> ...
                  {showControls == comment.id && (
                    <ul className="comment-controls-list">
                      <li onClick={() => handleReply(comment)}>💬 &nbsp; Reply</li>
                      <li onClick={() => handleModify(comment)}>✏️ &nbsp; Modify</li>
                      <li onClick={() => handleDelete(comment.id)}>🗑️ &nbsp; Delete</li>
                    </ul>
                  )}
                </span>
              </div>
              <div className="comment-text">{comment.content}</div>
            </div>
            { !isReply && <Comments parent={comment.id} /> }
            { isReply && showEditor == comment.id && <Editor {...{parent, content, setComments, setShowEditor}} /> }
          </div>
        )
      }
      {
        isReply && (showEditor == true
          ? <Editor {...{parent, setComments, setShowEditor}} /> 
          : <button onClick={() => setShowEditor(true)}> Reply </button>
      )}
    </div>
  );
}

export default Comments;