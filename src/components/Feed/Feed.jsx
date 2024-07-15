import "./Feed.css";

function Feed({ blogs, currentBlog, setCurrentBlog, searchWord }) {

  const filteredBlogs = blogs.filter((blog) => 
      (blog.tags.some(tag => tag.toLowerCase().includes(searchWord.toLowerCase()))) ||
      (blog.title.toLowerCase().includes(searchWord.toLowerCase()))
  );
  const sortedBlogs = filteredBlogs.sort((a, b) => new Date(b.date) - new Date(a.date));

  let handleSelectBlog = (id) => {
    setCurrentBlog(id);
    window.scrollTo(0, 0);
  }

  return (
    <div className="feed" style={{ width: currentBlog ? '300px' : 'auto' }}>
      {sortedBlogs.slice(0, currentBlog ? 6 : sortedBlogs.length).map(blog => (

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
