import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Content from "./components/Content/Content";
import Feed from "./components/Feed/Feed";
import { useEffect, useState } from "react";
import useFetch from "./utilities/hooks/useFetch";

function App() {
  const [currentBlog, setCurrentBlog] = useState(0);
  const [blogDisplay, setBlogDisplay] = useState(false);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    setBlogDisplay(false);
  }, [searchWord]);

  const { data, loading } = useFetch("/markdown/.files_list.json");
  if(loading)
    return <div className="spinner-container"> <div className="spinner"> </div> </div>;
  
  const blogs = JSON.parse(data);
  const blogData = currentBlog != 0 ? blogs.find((blog) => blog.id == currentBlog) : blogs[0];

  return (
    <>
      <Navigation {...{ setSearchWord }} />
      <div className="separator">
        {blogDisplay && <Content {...{ blogData }} />}
        <Feed {...{ blogs, setCurrentBlog, setBlogDisplay, searchWord, blogDisplay }} />
      </div>
    </>
  );
}

export default App;
