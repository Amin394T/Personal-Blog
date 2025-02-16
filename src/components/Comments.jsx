import { useEffect, useState } from "react";
import "../styles/Comments.css";
import useFetch from "../utilities/useFetch";
import Editor from "./Editor";


function Comments({ id }) {
  const [comments, setComments] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const { data: fetchData, status: fetchStatus } = useFetch(`${import.meta.env.VITE_API_URL}/messages/${id}`, false);  

  const blogID = new URLSearchParams(window.location.search).get("blog");
  
  useEffect(() => {
    if (fetchData) setComments(JSON.parse(fetchData));
  }, [fetchData]);
  
  if (fetchStatus == "loading")
    return (<div className="spinner comments"> <div></div> </div>);
  if (fetchStatus == "error")
    return (<div className="error comments"> <div>&#x2716;</div> Oops! Something went wrong. </div>);

  return (
    <div className="comments">
      { blogID == id && <Editor {...{id, setComments, setShowEditor}} /> }
      {
        comments.map((comment) =>
          <div className="comments-list" key={comment.id} title={new Date(comment.date).toLocaleString()}>
            <div className="comment">
              <div className="comment-user">
                💬 &nbsp; {comment.user}
                {/* <span className="comment-control-edit"> ✏️ </span>
                <span className="comment-control-delete"> 🗑️ </span> */}
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
