import { useEffect, useRef, useState } from "react";
import "../styles/Comments.css";
import useFetch from "../utilities/useFetch";


function CommentSection({ id }) {
  const [comments, setComments] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const { data: fetchData, status: fetchStatus } = useFetch(`${import.meta.env.VITE_API_URL}/messages/${id}`, false);  

  const blogID = new URLSearchParams(window.location.search).get("blog");
  
  useEffect(() => {
    if (fetchData) setComments(JSON.parse(fetchData));
  }, [fetchData]);
  
  if (fetchStatus == "loading")
    return (<div className="spinner comment-section"> <div></div> </div>);
  if (fetchStatus == "error")
    return (<div className="error comment-section"> <div>&#x2716;</div> حدث عطب تقني ! </div>);

  return (
    <div className="comment-section">
      { blogID == id && <CommentEditor {...{id, setComments, setShowEditor}} /> }
      {
        comments.map((comment) =>
          <div className="comments" key={comment.id} title={new Date(comment.date).toLocaleString()}>
            <div className="comment">
              <div className="comment-user">
                💬 &nbsp; {comment.user}
              </div>
              <div className="comment-text">{comment.content}</div>
            </div>
            { blogID == id && <CommentSection id={comment.id} /> }
          </div>
        )
      }
      { showEditor && blogID != id && <CommentEditor {...{id, setComments, setShowEditor}} /> }
      { blogID != id && !showEditor && <button onClick={() => setShowEditor(!showEditor)}> تعليق </button> }
    </div>
  );
}

function CommentEditor({ id, setComments, setShowEditor }) {
  const editorRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [message, setMessage] = useState("");
  
  let handleStretchArea = () => {
    editorRef.current.style.height = "0";
    editorRef.current.style.height = editorRef.current.scrollHeight + "px";
  };

  let handleCancelComment = () => {
    editorRef.current.value = "";
    handleStretchArea();
    setShowEditor(false);
  };

  let handleSubmitComment = async () => {
    const request = await fetch(`${import.meta.env.VITE_API_URL}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
        content: editorRef.current.value,
        parent: id.toString()
      }),
    });
    const response = await request.json();
    
    if (request.ok) {
      new URLSearchParams(window.location.search).get("blog") == id
        ? setComments(prevComments => [response, ...prevComments])
        : setComments(prevComments => [...prevComments, response]);
      handleCancelComment();
      setMessage(""); 
    }
    else if (request.status == 401) {
      const confirmCreateUser = window.confirm("هل تود تسجيل حساب جديد؟");
      if (!confirmCreateUser) {
        setMessage("تحتاج تسجيل حساب!");
        return;
      }

      const registerRequest = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameRef.current.value,
          password: passwordRef.current.value
        }),
      });
      
      registerRequest.ok
        ? handleSubmitComment()
        : setMessage("بيانات الحساب خاطئة!");
    }
    else {
      setMessage(response.message);
    }
  };
  
  return (
      <div className="comment-editor" key={id}>
        <textarea placeholder="اكتب تعليقا ..." ref={editorRef} onChange={handleStretchArea} />
        <div className="comment-editor-auth">
          <input ref={usernameRef} type="text" placeholder="اسم المستخدم" />
          <input ref={passwordRef} type="password" placeholder="الرمز السري" />
          {message}
        </div>
        <div className="comment-editor-controls">
          <button onClick={handleCancelComment}>إلغاء</button>
          <button onClick={handleSubmitComment}>إرسال</button>
        </div>
      </div>
  );
}

export default CommentSection;