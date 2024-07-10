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
    searchWord == " " && setSearchWord("");
    setCurrentBlog(null);
    document.title = "Personal Blog";
  }, [searchWord]);

  const { data, loading } = useFetch("/markdown/.files_list.json");
  if(loading)
    return <div className="spinner-container"> <div className="spinner"> </div> </div>;
  
  const blogs = JSON.parse(data);
  const blogData = currentBlog != 0 && blogs.find((blog) => blog.id == currentBlog);

  return (
    <>
      <Navigation {...{ setSearchWord }} />
      <div className="separator">
        {currentBlog && <Content {...{ blogData }} />}
        <Feed {...{ blogs, currentBlog, setCurrentBlog, searchWord }} />
      </div>
    </>
  );
}

export default App;