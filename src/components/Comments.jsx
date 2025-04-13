import { useEffect, useRef, useState } from "react";
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
  const controlsRefs = useRef({});
  
  useEffect(() => {
    if (fetchData) setComments(JSON.parse(fetchData));
  }, [fetchData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!controlsRefs.current[showControls].contains(event.target))
        setShowControls(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showControls]);
  
  if (fetchStatus == "loading")
    return (<div className="spinner comments"> <div></div> </div>);
  if (fetchStatus == "error")
    return null;

  let handleReply = (comment) => {
    setContent(`@${comment.user} `);
    setShowEditor(comment.id);
  };

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

  let handleModify = (comment) => {
    setContent(comment.content);
    setShowEditor(comment.id);
  };

  return (
    <div className="comments">
      { !isReply && <Editor {...{id: parent, setComments, setShowEditor, mode: "create"}} /> }
      {
        comments.map((comment) => { return( <>
          <div className="comments-list" key={comment.id} title={new Date(comment.date).toLocaleString().concat(comment.status == "edited" ? " (edited)" : "")}>
            <div className="comment">
              <div className="comment-user">
                💬 &nbsp; {comment.user}
                <span 
                  className="comment-controls" 
                  ref={(ref) => (controlsRefs.current[comment.id] = ref)}
                  onClick={() => setShowControls(showControls ? null : comment.id )}
                > ...
                  {
                    showControls == comment.id && (
                      <ul className="comment-controls-list">
                        <li onClick={() => handleReply(comment)}>💬 &nbsp; Reply</li>
                        <li onClick={() => handleModify(comment)}>✏️ &nbsp; Modify</li>
                        <li onClick={() => handleDelete(comment.id)}>❌ &nbsp; Delete</li>
                      </ul>
                    )
                  }
                </span>
              </div>
              <div className="comment-text">{comment.content}</div>
            </div>
            { !isReply && <Comments parent={comment.id} /> }
            { isReply && showEditor == comment.id && <Editor {...{id: comment.id, content, setComments, setShowEditor, mode: "update"}} /> }
          </div>
          { !isReply && <Editor {...{id: parent, setComments, setShowEditor, mode: "update"}} /> }
          </>
        )})
      }
      {
        isReply && (showEditor == true
          ? <Editor {...{id: parent, setComments, setShowEditor, mode: "create"}} /> 
          : <button onClick={() => setShowEditor(true)}> Reply </button>
        )
      }
    </div>
  );
}

export default Comments;