import { useEffect, useRef } from "react";
import "../styles/Editor.css";

function Editor({ id, content, setComments, setShowEditor, mode }) {
  const editorRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    editorRef.current.value = content || "";
    usernameRef.current.value = localStorage.getItem("username");
    passwordRef.current.value = localStorage.getItem("password");
  }, [content]);

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
    const username = usernameRef.current.value.trim();
    const password = passwordRef.current.value;

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    if (mode == "create") {

      const request = await fetch(`${import.meta.env.VITE_API_URL}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          content: editorRef.current.value,
          parent: id.toString()
        })
      });
      const response = await request.json();

      if (response.code == 39) {
        new URLSearchParams(window.location.search).get("blog") == id
          ? setComments((prevComments) => [response, ...prevComments])
          : setComments((prevComments) => [...prevComments, response]); 
        handleClearComment();
      }
      else if (response.code == 31 && username) {
        const confirmCreateUser = window.confirm("Create a new Account?");
        if (!confirmCreateUser) {
          alert("Account Creation Required!");
          return;
        }

        const registerRequest = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        const registerResponse = await registerRequest.json();

        if (registerResponse.code == 19) handleSubmitComment();
        else if (registerResponse.code == 10) alert("Technical Error!");
        else alert(registerResponse.message);
        
      }
      else if (response.code == 30) alert("Technical Error!");
      else alert(response.message);

    } else if (mode == "update") {

      const request = await fetch(`${import.meta.env.VITE_API_URL}/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          content: editorRef.current.value
        })
      });
      const response = await request.json();

      if (response.code == 59) {
        setComments((prevComments) =>
          prevComments.map((comment) => comment.id == id ? { ...comment, content: response.content } : comment)
        );
        handleClearComment();
      }
      else if (response.code == 50) alert("Technical Error!");
      else alert(response.message);
    }
  };


  return (
    <div className="editor" key={id}>
      <textarea placeholder="Write a comment ..." ref={editorRef} onChange={handleStretchArea} />
      <div className="editor-authentication">
        <input ref={usernameRef} type="text" placeholder="Username" />
        <input ref={passwordRef} type="password" placeholder="Password" />
      </div>
      <div className="editor-controls">
        <button onClick={handleClearComment}>Cancel</button>
        <button onClick={handleSubmitComment}>Submit</button>
      </div>
    </div>
  );
}

export default Editor;
