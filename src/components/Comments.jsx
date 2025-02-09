import { useEffect, useRef, useState } from "react";
import "../styles/Comments.css";
import useFetch from "../utilities/useFetch";
import useSubmit from "../utilities/useSubmit";


function CommentSection({ id }) {
  const [comments, setComments] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const { data: fetchData, status: fetchStatus } = useFetch(`${import.meta.env.VITE_API_URL}/messages/${id}`);  

  const blogID = new URLSearchParams(window.location.search).get("blog");
  
  useEffect(() => {
    if (fetchData) setComments(JSON.parse(fetchData));
  }, [fetchData]);
  
  if (fetchStatus == "loading")
    return (<div className="spinner content"> <div></div> </div>);
  if (fetchStatus == "error")
    return (<div className="error content"> <div>&#x2716;</div> Oops! Something went wrong. </div>);

  return (
    <div className="comment-section">
      { blogID == id && <CommentEditor {...{id, setComments, setShowEditor}} /> }
      {
        comments.map((comment) =>
          <div className="comments" key={comment.id} title={new Date(comment.date).toLocaleString()}>
            <div className="comment">
              <div className="comment-user">
                💬 &nbsp; {comment.user}
                {/* <span className="comment-control-edit"> ✏️ </span>
                <span className="comment-control-delete"> 🗑️ </span> */}
              </div>
              <div className="comment-text">{comment.content}</div>
            </div>
            { blogID == id && <CommentSection id={comment.id} /> }
          </div>
        )
      }
      { showEditor && blogID != id && <CommentEditor {...{id, setComments, setShowEditor}} /> }
      { blogID != id && !showEditor && <button onClick={() => setShowEditor(!showEditor)}> Reply </button> }
    </div>
  );
}

function CommentEditor({ id, setComments, setShowEditor }) {
  const editorRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const { data: submitData, status: submitStatus } = useSubmit(`${import.meta.env.VITE_API_URL}/messages`);
  
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
    console.log("1: " + submitStatus);
    const response = await submitData({
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      content: editorRef.current.value,
      parent: id.toString()
    });
    
    console.log("2: " + submitStatus);
    if (submitStatus == "complete" && response) {
      setComments(prevComments => [...prevComments, response]);
      handleCancelComment();
    }
    console.log("3: " + submitStatus);
  };
  
  return (
      <div className="comment-editor" key={id}>
        <textarea placeholder="Write a comment ..." ref={editorRef} onChange={handleStretchArea} />
        <div className="comment-editor-login">
          <input ref={usernameRef} type="text" placeholder="Username" />
          <input ref={passwordRef} type="password" placeholder="Password" />
        </div>
        <div className="comment-editor-status">
          { submitStatus == "loading" && "Submitting in progress..." }
          { submitStatus == "error" && "Submission failed!" }
        </div>
        <div className="comment-editor-controls">
          <button onClick={handleCancelComment}>Cancel</button>
          <button onClick={handleSubmitComment}>Submit</button>
        </div>
      </div>
  );
}

export default CommentSection;
