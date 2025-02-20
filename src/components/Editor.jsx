import { useEffect, useRef, useState } from "react";
import "../styles/Editor.css";

function Editor({ id, setComments, setShowEditor }) {
  const editorRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    if (storedUsername) usernameRef.current.value = storedUsername;
    if (storedPassword) passwordRef.current.value = storedPassword;
  }, []);

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

    const request = await fetch(`${import.meta.env.VITE_API_URL}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
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
    } else if (response.code == 31 && username) {
      const confirmCreateUser = window.confirm("هل تود تسجيل حساب جديد؟");
      if (!confirmCreateUser) {
        setMessage("تحتاج تسجيل حساب!");
        return;
      }

      const registerRequest = await fetch(
        `${import.meta.env.VITE_API_URL}/users/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password })
        }
      );
      const registerResponse = await registerRequest.json();

      if (registerRequest.ok) handleSubmitComment();
      else {
        switch (registerResponse.code) {
            case 11: setMessage("لا يسمح بغير الحروف والأرقام في اسم المستخدم!");
                break;
            case 12: setMessage("طول اسم المستخدم غير مناسب!");
                break;
            case 13: setMessage("طول الرمز السري غير مناسب!");
                break;
            default: setMessage("حدث عطب تقني !");
        }
      }  
    }
    else {
        switch (response.code) {
            case 31: setMessage("اسم المستخدم غير صحيح!");
                break;
            case 32: setMessage("الرمز السري غير صحيح!");
                break;
            case 33: setMessage("الحساب محظور!");
                break;
            case 34: setMessage("التعليق فارغ!");
                break;
            default: setMessage("حدث عطب تقني !");
        }
    }
  };

  return (
    <div className="editor" key={id}>
      <textarea placeholder="اكتب تعليقا ..." ref={editorRef} onChange={handleStretchArea} />
      <div className="editor-authentication">
        <input ref={usernameRef} type="text" placeholder="اسم المستخدم" />
        <input ref={passwordRef} type="password" placeholder="الرمز السري" />
      </div>
      <div className="editor-controls">
        <button onClick={handleClearComment}>إلغاء</button>
        <button onClick={handleSubmitComment}>إرسال</button>
      </div>
      <span className="editor-message">{message}</span>
    </div>
  );
}

export default Editor;