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
  }, []);

  const welcome = JSON.parse(useFetch("./markdown/_welcome.json").data);

  const { data, loading, error } = useFetch("./markdown/_files_list.json");
  if (loading)
    return (<div className="spinner"> <div></div> </div>);
  if (error)
    return (<div className="error"> <div>&#x2716;</div> Oops! Something went wrong. </div>);

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
        <div className="blog welcome">
          <h1 className="blog-info-title"> {welcome.heading} </h1>
          <div className="blog-text"> {welcome.line_1} </div> <br/>
          <div className="blog-text"> {welcome.line_2} </div> <br/>
          <div className="blog-text"> {welcome.line_3} </div>
        </div>
      }
      { currentBlog && <Content {...{ blogData, handleSearch }} /> }
      { !currentBlog && <Feed {...{ blogs, handleSelection, searchWord }} /> }
    </>
  );
}

export default App;
