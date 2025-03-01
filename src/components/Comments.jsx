import { useEffect, useState } from "react";
import "../styles/Comments.css";
import useFetch from "../utilities/useFetch";
import Editor from "./Editor";

function Comments({ parent }) {
  const [comments, setComments] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [showControls, setShowControls] = useState(null);
  const [mention, setMention] = useState(null);
  const { data: fetchData, status: fetchStatus } = useFetch(`${import.meta.env.VITE_API_URL}/messages/${parent}`, false);  

  const blogID = new URLSearchParams(window.location.search).get("blog");
  
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

  let handleMention = (user) => {
    setMention(user);
    setShowEditor(true);
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

  return (
    <div className="comments">
      { blogID == parent && <Editor {...{parent, setComments, setShowEditor}} /> }
      {
        comments.map((comment) =>
          <div className="comments-list" key={comment.id} title={new Date(comment.date).toLocaleString().concat(comment.status == "edited" ? " (edited)" : "")}>
            <div className="comment">
              <div className="comment-user">
                💬 &nbsp; {comment.user}
                <span className="comment-controls" onClick={() => handleDisplayControls(comment.id)}> ...
                  {showControls === comment.id && (
                    <ul className="comment-controls-list">
                      <li onClick={() => handleMention(comment.user)}>💬 Reply</li>
                      <li>✏️ Modify</li>
                      <li onClick={() => handleDelete(comment.id)}>🗑️ Delete</li>
                    </ul>
                  )}
                </span>
              </div>
              <div className="comment-text">{comment.content}</div>
            </div>
            { blogID == parent && <Comments parent={comment.id} /> }
          </div>
        )
      }
      { showEditor && blogID != parent && <Editor {...{parent, mention, setComments, setShowEditor}} /> }
      { blogID != parent && !showEditor && <button onClick={() => setShowEditor(!showEditor)}> Reply </button> }
    </div>
  );
}

export default Comments;