import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Content from "./components/Content/Content";
import Feed from "./components/Feed/Feed";
import { useEffect, useState } from "react";
import useFetch from "./utilities/hooks/useFetch";

function App() {
  const [currentBlog, setCurrentBlog] = useState(null);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    const path = new URLSearchParams(window.location.search).get("blog");
    if(path) setCurrentBlog(path);
  }, []);

  if(searchWord) document.title = "Searching ...";

  const { data, loading, error } = useFetch("./markdown/_files_list.json");
  if (error)
    return (<div className="error"> <div>&#x2716;</div> Oops! Something went wrong. </div>);
  if(loading)
    return (<div className="spinner"> <div></div> </div>);

  const blogs = JSON.parse(data);

  return (
    <>
      <Navigation {...{ setCurrentBlog, searchWord, setSearchWord }} />
      <div className="separator">
        { !searchWord && <Content {...{ blogs, currentBlog, setSearchWord }} /> }
        <Feed {...{ blogs, currentBlog, setCurrentBlog, searchWord, setSearchWord }} />
      </div>
    </>
  );
}

export default App;