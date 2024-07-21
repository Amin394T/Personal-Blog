import "./Feed.css";

function Feed({ blogs, currentBlog, setCurrentBlog, searchWord, setSearchWord }) {

  const filteredBlogs = blogs.filter((blog) => 
      (blog.tags.some(tag => tag.toLowerCase().includes(searchWord))) ||
      (blog.title.toLowerCase().includes(searchWord))
  );
  const sortedBlogs = filteredBlogs.sort((a, b) => new Date(b.date) - new Date(a.date));

  const relatedBlogs = currentBlog && !searchWord ? sortedBlogs.filter((blog) =>
    blog.tags[0] == blogs.find((blog) => blog.id == currentBlog).tags[0])
  : sortedBlogs.filter((blog) => blog.id != 0);

  let handleSelectBlog = (id) => {
    setCurrentBlog(id);
    setSearchWord("");
    window.scrollTo(0, 0);
  }

  return (
    <div className="feed" style={{ width: currentBlog && !searchWord ? '300px' : 'auto' }}>
      {relatedBlogs.slice(0, currentBlog ? 6 : relatedBlogs.length).map((blog) => (

        <div className="feed-blog" onClick={() => handleSelectBlog(blog.id)} key={blog.id}>
          <span className="feed-blog-tag">{blog.tags[0]}</span>
          <img className="feed-blog-thumbnail" src={`./images/${blog.image || "_placeholder.png"}`} />
          <div className="feed-blog-title">{blog.title}</div>
        </div>
      
      ))}
    </div>
  );
}

export default Feed;