import "../styles/App.css";
import Navigation from "./Navigation";
import Content from "./Content";
import Feed from "./Feed";
import { startTransition, useState } from "react";
import useFetch from "../utilities/useFetch";

function App() {
  const [currentBlog, setCurrentBlog] = useState(new URLSearchParams(window.location.search).get("blog"));
  const [searchWord, setSearchWord] = useState(new URLSearchParams(window.location.search).get("search") ?? "");

  const welcome = JSON.parse(useFetch("./markdown/_welcome.json").data);
  //useEffect
  if (!searchWord && !currentBlog) document.title = welcome.name;
  
  window.onpopstate = () => {
    setCurrentBlog(new URLSearchParams(window.location.search).get("blog"));
    setSearchWord(new URLSearchParams(window.location.search).get("search") ?? "");
  };

  const { data, status } = useFetch("./markdown/_files_list.json");
  if (status == "loading")
    return (<div className="spinner"> <div></div> </div>);
  if (status == "error" || !data)
    return (<div className="error"> <div>&#x2716;</div> Oops! Something went wrong. </div>);

  const blogsList = JSON.parse(data);
  const blogData = blogsList.find((blog) => blog.path == currentBlog);

  let handleSearch = (query) => {
    startTransition(() => setSearchWord(query.toLowerCase()));
    setCurrentBlog(null);
    window.scrollTo(0, 0);
    searchWord
      ? history.replaceState({ query }, "", `?search=${query}`)
      : history.pushState({ query }, "", `?search=${query}`);
    document.title = welcome.name;
  };

  let handleSelection = (path) => {
    setCurrentBlog(path);
    setSearchWord("");
    window.scrollTo(0, 0);
    history.pushState({ path }, "", `?blog=${path}`);
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

      { currentBlog
        ? <Content {...{ blogData, handleSearch }} />
        : <Feed {...{ blogsList, handleSelection, searchWord }} />
      }
    </>
  );
}

export default App;
