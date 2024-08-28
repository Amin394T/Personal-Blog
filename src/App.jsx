import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Content from "./components/Content/Content";
import Feed from "./components/Feed/Feed";
import { startTransition, useEffect, useState } from "react";
import useFetch from "./utilities/useFetch";

function App() {
  const [currentBlog, setCurrentBlog] = useState(null);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    const path = new URLSearchParams(window.location.search).get("blog");
    if (path) setCurrentBlog(path);
    window.addEventListener('popstate', () => setCurrentBlog(null));
  }, []);

  const welcome = JSON.parse(useFetch("./markdown/_welcome.json").data);

  const { data, status } = useFetch("./markdown/_files_list.json");
  if (status == "loading")
    return (<div className="spinner"> <div></div> </div>);
  if (status == "error")
    return (<div className="error"> <div>&#x2716;</div> حدث عطب تقني ! </div>);

  const blogs = JSON.parse(data);
  const blogData = blogs.find((blog) => blog.path == currentBlog);

  let handleSearch = (query) => {
    startTransition(() => setSearchWord(query.toLowerCase()));
    setCurrentBlog(null);
    window.scrollTo(0, 0);
    history.pushState({}, "", window.location.pathname);
    document.title = welcome.name;
  };

  let handleSelection = (path) => {
    setCurrentBlog(path);
    setSearchWord("");
    window.scrollTo(0, 0);
    history.pushState({ blog: path }, "", `?blog=${path}`);
  };

  return (
    <>
      <Navigation {...{ searchWord, handleSearch }} />

      { !currentBlog && !searchWord &&
        <div className="content">
          <h1> {welcome.heading} </h1>
          <p> {welcome.line_1} </p>
          <p> {welcome.line_2} </p>
          <p> {welcome.line_3} </p>
        </div> }

      { currentBlog && <Content {...{ blogData, handleSearch }} /> }
      { !currentBlog && <Feed {...{ blogs, handleSelection, searchWord }} /> }
    </>
  );
}

export default App;