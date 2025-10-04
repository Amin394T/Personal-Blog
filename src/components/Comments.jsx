import { useEffect, useState } from "react";
import "../styles/Comments.css";
import useFetch from "../utilities/useFetch";
import Editor from "./Editor";


function Comment({ comment, setComments }) {
  const [editing, setEditing] = useState(false);

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

    if (request.ok)
      setComments(prev => prev.filter((comment) => comment.id != id));
    else if (response.code == 60)
      alert("Technical Error!");
    else
      alert(response.message);
  };


  if (editing)
      return (<Editor id={comment.id} content={comment.content} setComments={setComments} mode="update" show={setEditing} />);

  return (
    <div className="comment-card">
      <div className="comment-user">
        💬 &nbsp; {comment.user}
        { 
          comment.user == localStorage.getItem('username') &&
          <span>
            <span className="comment-modify" onClick={() => setEditing(true)} title="Modify"> 📋 </span>
            <span className="comment-delete" onClick={() => handleDelete(comment.id)} title="Delete"> 🗑️ </span>
          </span>
        }
      </div>
      <div className="comment-text">{comment.content}</div>
    </div>
  )
}


function Comments({ parent }) {
  const [comments, setComments] = useState([]);
  const { data: fetchData, status: fetchStatus } = useFetch(`${import.meta.env.VITE_API_URL}/messages/${parent}`, false);
  
  useEffect(() => {
    if (fetchData)
      setComments(JSON.parse(fetchData));
  }, [fetchData]);

  if (fetchStatus == "loading")
    return (<div className="spinner comments"> <div></div> </div>);
  if (fetchStatus == "error")
    return null;


  return (
    <div className="comment-section">
      <Editor id={parent} setComments={setComments} mode="create" show={true} />
      {
        comments.map((comment) =>
          <div className="comments-thread" key={comment.id}>

            <Comment comment={comment} setComments={setComments} />
            <div className="comment-replies">
              {
                comment.replies && comment.replies.map((reply) =>
                    <Comment key={reply.id} comment={reply} setComments={setComments} />
                )
              }
            </div>
            <Editor id={comment.id} setComments={setComments} mode="create" show={false} />

          </div>
        )
      }
    </div>
  );
}

export default Comments;