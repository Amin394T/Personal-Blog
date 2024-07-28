import "./Content.css";
import useFetch from "../../utilities/hooks/useFetch";
import Markdown from "react-markdown";
import { useEffect } from "react";

function Content({ blogData, setSearchWord }) {
  
  const { data, loading, error } = useFetch(`./markdown/${blogData?.path}.md`);

  useEffect(() => {
    document.title = blogData?.title || "حدث عطب تقني";
  }, [blogData]);

  let handleSearch = (query) => {
    setSearchWord(query.toLowerCase());
    history.pushState({}, '', window.location.pathname);
  }

  if (error || !blogData)
    return (<div className="error blog"> <div> &#x2716; </div> حدث عطب تقني ! </div>);
  if (loading)
    return (<div className="spinner blog"> <div> </div> </div>);

  return (
    blogData.id != 0 ?
    <div className="blog">

      <div className="blog-info">
        <h1 className="blog-info-title">{blogData.title}</h1>
        <span>📘 &nbsp;{blogData.tags[0]}</span>
        <span>🖊️ &nbsp;{blogData.author}</span>
        <span>🕓 &nbsp;{blogData.date}</span>
      </div>

      <div className="blog-text"> <Markdown>{data}</Markdown> </div>

      <span className="blog-tags">
        { blogData.tags.map((tag) => <span key={tag} onClick={() => handleSearch(tag)}>&#35; {tag}</span>) }
      </span>
    
    </div>
    :
    <div className="blog blog-welcome">
      <h1 className="blog-info-title">{blogData.title}</h1>
      <div className="blog-text"> <Markdown>{data}</Markdown> </div>
    </div>
  );
}

export default Content;