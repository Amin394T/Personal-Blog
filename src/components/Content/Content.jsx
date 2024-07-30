import "./Content.css";
import useFetch from "../../utilities/hooks/useFetch";
import Markdown from "react-markdown";

function Content({ blogs, currentBlog, setSearchWord }) {

  const blogData = blogs.find((blog) => blog.path == currentBlog);
  const { data, loading, error } = useFetch(`./markdown/${blogData?.path || "_welcome"}.md`);
  if (error)
    return (<div className="error blog"> <div> &#x2716; </div> Oops! Something went wrong. </div>);
  if (loading)
    return (<div className="spinner blog"> <div> </div> </div>);

  document.title = blogData?.title || data.split('\n')[0].slice(2);

  let handleSearch = (query) => {
    setSearchWord(query.toLowerCase());
    history.pushState({}, '', window.location.pathname);
  }

  return (
    currentBlog ?
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
    <div className="blog blog-text">
      <Markdown>{data}</Markdown>
    </div>
  );
}

export default Content;