import "./App.css";
import blogs from "./assets/markdown/.files_list";
import Navigation from "./components/Navigation/Navigation";
import Content from "./components/Content/Content";
import Feed from "./components/Feed/Feed";
import { useState } from "react";

function App() {
  const [currentBlog, setCurrentBlog] = useState(0);
  const [blogDisplay, setBlogDisplay] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const blogData = currentBlog != 0 ? blogs.find((blog) => blog.id == currentBlog) : blogs[0];

  return (
    <>
      <Navigation {...{ setBlogDisplay, setSearchWord }} />
      <div className="separator">
        {blogDisplay && <Content {...{ blogData }} />}
        <Feed {...{ setCurrentBlog, setBlogDisplay, searchWord, blogDisplay }} />
      </div>
    </>
  );
}

export default App;
