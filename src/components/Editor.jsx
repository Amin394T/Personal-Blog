import { useEffect, useRef } from "react";
import "../styles/Editor.css";

function Editor({ id, setComments, setShowEditor }) {
  const editorRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    usernameRef.current.value = localStorage.getItem("username");
    passwordRef.current.value = localStorage.getItem("password");
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

  let handleRegistration = async (username, password) => {
    const confirmCreateUser = window.confirm("هل تريد تسجيل حساب جديد؟");
      if (!confirmCreateUser) {
        alert("تحتاج حسابا للتعليق!");
        return;
      }

      const request = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password })
      });
      const response = await request.json();

      switch (response.code) {
        case 19: handleSubmit();
          break;
        case 11: alert("لا يسمح بغير الحروف والأرقام في اسم المستخدم!");
          break;
        case 12: alert("طول اسم المستخدم غير مناسب!");
          break;
        case 13: alert("طول الرمز السري غير مناسب!");
          break;
        default: alert("حدث عطب تقني!");
      }
  }

  let handleSubmit = async () => {
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
    else if (response.code == 31 && username)
      handleRegistration(username, password);
    else {
      switch (response.code) {
        case 31: alert("اسم المستخدم غير صحيح!");
          break;
        case 32: alert("الرمز السري غير صحيح!");
          break;
        case 33: alert("الحساب محظور!");
          break;
        case 34: alert("التعليق فارغ!");
          break;
        default: alert("حدث عطب تقني!");
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
        <button onClick={handleSubmit}>إرسال</button>
      </div>
    </div>
  );
}

export default Editor;