import { useEffect, useState } from "react";
import "../styles/Comments.css";
import useFetch from "../utilities/useFetch";
import Editor from "./Editor";

function Comments({ id }) {
  const [comments, setComments] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [showControls, setShowControls] = useState(null);
  const { data: fetchData, status: fetchStatus } = useFetch(`${import.meta.env.VITE_API_URL}/messages/${id}`, false);  

  const blogID = new URLSearchParams(window.location.search).get("blog");
  
  useEffect(() => {
    if (fetchData) setComments(JSON.parse(fetchData));
  }, [fetchData]);
  
  if (fetchStatus == "loading")
    return (<div className="spinner comments"> <div></div> </div>);
  if (fetchStatus == "error")
    return (<div className="error comments"> <div>&#x2716;</div> Oops! Something went wrong. </div>);

  const handleDisplayControls = (commentId) => {
    setShowControls(showControls === commentId ? null : commentId);
  };

  const handleDelete = async (commentId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/messages/${commentId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: localStorage.getItem('username'),
          password: localStorage.getItem('password')
        }),
      });
      if (response.ok) {
        setComments(comments.filter(comment => comment.id !== commentId));
      } else {
        console.error('Failed to delete the comment');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="comments">
      { blogID == id && <Editor {...{id, setComments, setShowEditor}} /> }
      {
        comments.map((comment) =>
          <div className="comments-list" key={comment.id} title={new Date(comment.date).toLocaleString().concat(comment.status == "edited" ? " (edited)" : "")}>
            <div className="comment">
              <div className="comment-user">
                💬 &nbsp; {comment.user}
                <span className="comment-controls" onClick={() => handleDisplayControls(comment.id)}> ...
                  {showControls === comment.id && (
                    <ul className="comment-controls-list">
                      <li>Reply</li>
                      <li>Modify</li>
                      <li onClick={() => handleDelete(comment.id)}>Delete</li>
                    </ul>
                  )}
                </span>
              </div>
              <div className="comment-text">{comment.content}</div>
            </div>
            { blogID == id && <Comments id={comment.id} /> }
          </div>
        )
      }
      { showEditor && blogID != id && <Editor {...{id, setComments, setShowEditor}} /> }
      { blogID != id && !showEditor && <button onClick={() => setShowEditor(!showEditor)}> Reply </button> }
    </div>
  );
}

export default Comments;