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
    null;

  let handleDelete = async (id) => {
    const confirmDelete = window.confirm('هل تريد حذف التعليق؟');
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

    switch (response.code) {
      case 69: setComments(comments.filter(comment => comment.id !== id));
          break;
      case 61: alert("اسم المستخدم غير صحيح!");
          break;
      case 62: alert("الرمز السري غير صحيح!");
          break;
      case 63: alert("الحساب محظور!");
          break;
      case 64: alert("التعليق غير موجود!");
          break;
      case 65: alert("ليس لديك صلاحية الحذف!");
          break;
      case 66: alert("انقضى الحد الزمني!");
          break;
      default: alert("حدث عطب تقني!");
    }
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
                { 
                  comment.user == localStorage.getItem('username') &&
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
          : <button onClick={() => setShowEditor(true)}> تعليق </button>
        )
      }
    </div>
  );
}

export default Comments;