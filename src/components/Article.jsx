import "../styles/Article.css";
import useFetch from "../utilities/useFetch";
import Markdown from "react-markdown";

function Article({ blogData, handleSearch }) {
  const { data, status } = useFetch(`./markdown/${blogData?.path}.md`);

  if (status == "loading")
    return (<div className="spinner article"> <div></div> </div>);
  if (status == "error" || !blogData)
    return (<div className="error article"> <div>&#x2716;</div> حدث عطب تقني ! </div>);

  document.title = `قراءة: "${blogData.title}"`;

  return (
    <div className="article">
      <h1>{blogData.title}</h1>

      <div className="article-info">  
        <span>📘 &nbsp;{blogData.tags[0]}</span>
        <span>🖊️ &nbsp;{blogData.author}</span>
        <span>🕓 &nbsp;{blogData.date}</span>
      </div>

      <Markdown>{data}</Markdown>
      
      <span className="article-tags">
        { blogData.tags.map((tag) => <span key={tag} onClick={() => handleSearch(tag)}>&#35; {tag}</span>) }
      </span>
    </div>
  );
}

export default Article;