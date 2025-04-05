import { useEffect, useState } from "react";
import "../styles/Comments.css";
import useFetch from "../utilities/useFetch";
import Editor from "./Editor";

function Comments({ parent }) {
  const [comments, setComments] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const { data: fetchData, status: fetchStatus } = useFetch(`${import.meta.env.VITE_API_URL}/messages/${parent}`, false);  

  const isReply = new URLSearchParams(window.location.search).get("blog") != parent;
  
  useEffect(() => {
    if (fetchData) setComments(JSON.parse(fetchData));
  }, [fetchData]);
  
  if (fetchStatus == "loading")
    return (<div className="spinner comments"> <div></div> </div>);
  if (fetchStatus == "error")
    return null;

  let handleDelete = async (id) => {
    const confirmDelete = window.confirm('Delete this comment?');
    if (!confirmDelete) return;

    const request = await fetch(`${import.meta.env.VITE_API_URL}/messages/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password')
      }),
    });
    const response = await request.json();

    if (request.ok) setComments(comments.filter(comment => comment.id !== id));
    else if (response.code != 60) alert(response.message);
  };

  return (
    <div className="comments">
      { !isReply && <Editor {...{id: parent, setComments, setShowEditor}} /> }
      {
        comments.map((comment) =>
          <div className="comments-list" key={comment.id} title={new Date(comment.date).toLocaleString()}>
            <div className="comment">
              <div className="comment-user">
                💬 &nbsp; {comment.user}
                { comment.user == localStorage.getItem('username') &&
                  <span className="comment-controls" onClick={() => handleDelete(comment.id)}> ❌ </span>
                }
              </div>
              <div className="comment-text">{comment.content}</div>
            </div>
            { !isReply && <Comments parent={comment.id} /> }
          </div>
        )
      }
      {
        isReply && (showEditor == true
          ? <Editor {...{id: parent, setComments, setShowEditor}} /> 
          : <button onClick={() => setShowEditor(true)}> Reply </button>
        )
      }
    </div>
  );
}

export default Comments;