Click here for a demo : https://amin394t.github.io/Personal-Blog/

## FUNCTIONAL SPECIFICATION

This is a simplistic blog website template that displays a list of blogs, allows searching blogs, and displays the content of a selected blog. It is adapted for both computer and smartphone/tablet views.

The default view shows the list of all blogs sorted by date, you can return to it from anywhere by clicking on the website logo located in the navigation bar, while the search bar allows filtering blogs by title and by tags.

The content section displays the current blog's title, tags (the main tag under the title and all of them at the end of the blog), author, and date, followed by the blog's content.

The feed section displays all blogs when no blog is currently selected, and only 6 blogs when a blog is displayed, it is affected by the search feature however, regardless of whether a blog is being displayed or not. The feed contains blog cards that display a blog's thumbnail, main tag, and title, it is always sorted by date.


## TECHNICAL SPECIFICATION

This is a lightweight React client-side rendered single page application created with Vite, no TypeScript used, the only added library is React-Markdown for the purpose of handling Markdown conversion to HTML.

The application is divided into 3 components (described previously), there is no real navigation, hence the abscence of a router, the feed component that displays the list of blogs in the home view also serves as the feed side-bar when a blog is displayed, this is handled through states and flex-box.

There are 2 state variables, one holding the search keywords, and the other holding the ID of the currently selected blog, which is also used to determine whether the blog component is visible or not. They are both present at the root component for easier state sharing between components, no state manager was used since there are only 2 levels in the component tree.

The source of data is static markdown files, blogs can be added to the public/markdown folder, no special formatting required, to make it appear in the application an entry containing the blog's metadata should be added in the .files_list.json file present in the same folder (copy and modify an existing entry). Thumbnail images can be added in the public/images folder, it should preferably have a 3:2 aspect ration or close to that.