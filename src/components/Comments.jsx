import "../styles/Comments.css";
import useFetch from "../utilities/useFetch";

function Comments({ id }) {
  const { data, status } = useFetch(`${import.meta.env.VITE_API_URL}/messages/${id}`);

  if (status == "loading")
    return (<div className="spinner content"> <div></div> </div>);
  if (status == "error")
    return (<div className="error content"> <div>&#x2716;</div> Oops! Something went wrong. </div>);

  const comments = JSON.parse(data);
  
  return (
    <>
      {comments.map((comment) =>
        <div className="comments" key={comment.id}>
          <div className="comment">
            <div className="comment-user">💬 &nbsp; {comment.user}</div>
            <div className="comment-text">{comment.content}</div>
          </div>
          <Comments {...{id: comment.id}} />
        </div>
      )}
    </>
  );
}

export default Comments;
