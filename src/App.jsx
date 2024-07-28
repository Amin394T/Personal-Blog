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
    const path = new URLSearchParams(window.location.search).get('blog');
    if(path) setCurrentBlog(path);
  }, []);

  const { data, loading, error } = useFetch("./markdown/_files_list.json");
  if (error)
    return (<div className="error"> <div> &#x2716; </div> حدث عطب تقني ! </div>);
  if(loading)
    return (<div className="spinner"> <div> </div> </div>);
  
  const blogs = JSON.parse(data);
  const blogData = blogs.find((blog) => blog.id == currentBlog);

  return (
    <>
      <Navigation {...{ setCurrentBlog, searchWord, setSearchWord }} />
      <div className="separator">
        {!searchWord && <Content {...{ blogData, setSearchWord }} />}
        <Feed {...{ blogs, currentBlog, setCurrentBlog, searchWord, setSearchWord }} />
      </div>
    </>
  );
}

export default App;