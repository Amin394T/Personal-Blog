import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Content from "./components/Content/Content";
import Feed from "./components/Feed/Feed";
import { useEffect, useState } from "react";
import useFetch from "./utilities/hooks/useFetch";

function App() {
  const [currentBlog, setCurrentBlog] = useState(0);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    searchWord == " " && setSearchWord("");
    setCurrentBlog(0);
    document.title = "Personal Blog";
  }, [searchWord]);

  const { data, loading, error } = useFetch("./markdown/_files_list.json");
  if(loading)
    return (<div className="spinner"> <div> </div> </div>);
  if (error)
    return (<div className="error"> <div> &#x2716; </div> Oops! Something went wrong. </div>);
  
  const blogs = JSON.parse(data);
  const blogData = blogs.find((blog) => blog.id == currentBlog);

  return (
    <>
      <Navigation {...{ searchWord, setSearchWord }} />
      <div className="separator">
        <Content {...{ blogData }} />
        <Feed {...{ blogs, currentBlog, setCurrentBlog, searchWord }} />
      </div>
    </>
  );
}

export default App;