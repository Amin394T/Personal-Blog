import "../styles/Comment.css";
import useFetch from "../utilities/useFetch";

function Comment({ id }) {
  const { data, status } = useFetch(`${import.meta.env.VITE_API_URL}/messages/${id}`);

  if (status == "loading")
    return (<div className="spinner content"> <div></div> </div>);
  if (status == "error")
    return (<div className="error content"> <div>&#x2716;</div> Oops! Something went wrong. </div>);

  const comment = JSON.parse(data);

  return (
    <div className="comment content">
      <div className="comment-user">💬 &nbsp; {comment.user}</div>
      <div className="comment-text">{comment.content}</div>
    </div>
  );
}

export default Comment;
