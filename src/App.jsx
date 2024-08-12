import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Content from "./components/Content/Content";
import Feed from "./components/Feed/Feed";
import { startTransition, useEffect, useState } from "react";
import useFetch from "./utilities/hooks/useFetch";

function App() {
  const [currentBlog, setCurrentBlog] = useState(null);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    const path = new URLSearchParams(window.location.search).get("blog");
    if (path) setCurrentBlog(path);
    // TO-DO: revert title
  }, []);

  const { data, loading, error } = useFetch("./markdown/_files_list.json");
  if (error)
    return (<div className="error"> <div>&#x2716;</div> Oops! Something went wrong. </div>);
  if (loading)
    return (<div className="spinner"> <div></div> </div>);

  const blogs = JSON.parse(data);
  const blogData = blogs.find((blog) => blog.path == currentBlog);

  let handleSearch = (query) => {
    startTransition(() => setSearchWord(query.toLowerCase()));
    setCurrentBlog(null);
    window.scrollTo(0, 0);
    history.pushState({}, "", window.location.pathname);
    document.title = "Searching ...";
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
      {currentBlog && <Content {...{ blogData, handleSearch }} />}
      {!currentBlog && <Feed {...{ blogs, handleSelection, searchWord }} />}
    </>
  );
}

export default App;
