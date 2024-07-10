import "./Feed.css";

function Feed({ blogs, setCurrentBlog, setBlogDisplay, searchWord, blogDisplay }) {

  const filteredBlogs = blogs.filter(blog => {
    return (
      (blog.tags.some(tag => tag.toLowerCase().includes(searchWord.toLowerCase()))) ||
      (blog.title.toLowerCase().includes(searchWord.toLowerCase()))
    );
  });

  const sortedBlogs = filteredBlogs.sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleSelectBlog = id => {
    setCurrentBlog(id);
    setBlogDisplay(true);
  };

  return (
    <div className="feed">
      {sortedBlogs.slice(0, blogDisplay ? 6 : sortedBlogs.length).map(blog => (

        <div className="feed-blog" onClick={() => handleSelectBlog(blog.id)} key={blog.id}>
          <span className="feed-blog-tag">{blog.tags[0]}</span>
          <img className="feed-blog-thumbnail" src={`/images/${blog.path}.png`} alt={blog.title} />
          <div className="feed-blog-title">{blog.title}</div>
        </div>
      
      ))}
    </div>
  );
}

export default Feed;
