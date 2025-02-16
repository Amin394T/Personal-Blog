import { useRef, useState } from "react";
import "../styles/Editor.css";

function Editor({ id, setComments, setShowEditor }) {
  const editorRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [message, setMessage] = useState("");

  let handleStretchArea = () => {
    editorRef.current.style.height = "0";
    editorRef.current.style.height = editorRef.current.scrollHeight + "px";
  };

  let handleClearComment = () => {
    editorRef.current.value = "";
    handleStretchArea();
    setShowEditor(false);
  };

  let handleSubmitComment = async () => {
    const request = await fetch(`${import.meta.env.VITE_API_URL}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: usernameRef.current.value.trim(),
        password: passwordRef.current.value,
        content: editorRef.current.value,
        parent: id.toString(),
      }),
    });
    const response = await request.json();

    if (request.ok) {
      new URLSearchParams(window.location.search).get("blog") == id
        ? setComments((prevComments) => [response, ...prevComments])
        : setComments((prevComments) => [...prevComments, response]);
      handleClearComment();
      setMessage("");
    } else if (response.code == 31 && usernameRef.current.value) {
      const confirmCreateUser = window.confirm("Create a new Account?");
      if (!confirmCreateUser) {
        setMessage("Account Creation Required!");
        return;
      }

      const registerRequest = await fetch(
        `${import.meta.env.VITE_API_URL}/users/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: usernameRef.current.value,
            password: passwordRef.current.value,
          }),
        }
      );
      const registerResponse = await registerRequest.json();

      if (registerRequest.ok) handleSubmitComment();
      else if (registerResponse.code == 10) setMessage("Technical Error!");
      else setMessage(registerResponse.message);
    } else if (response.code == 30) setMessage("Technical Error!");
    else setMessage(response.message);
  };

  return (
    <div className="editor" key={id}>
      <textarea
        placeholder="Write a comment ..."
        ref={editorRef}
        onChange={handleStretchArea}
      />
      <div className="editor-authentication">
        <input ref={usernameRef} type="text" placeholder="Username" />
        <input ref={passwordRef} type="password" placeholder="Password" />
      </div>
      <div className="editor-controls">
        <button onClick={handleClearComment}>Cancel</button>
        <button onClick={handleSubmitComment}>Submit</button>
      </div>
      <span className="editor-message">{message}</span>
    </div>
  );
}

export default Editor;
