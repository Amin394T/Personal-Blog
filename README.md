Click here for a demo : https://amin394t.github.io/Personal-Blog/

## FUNCTIONAL SPECIFICATION

This is a simple blog website that displays a list of blogs, allows searching blogs, and displays the content of a selected blog. It is adapted for both computer, tablet, and smartphone views.

The default view shows a welcome message, followed by a list of all blogs. On the navigation bar, you can use the search bar to filter blogs by title and by tags, while clicking on the blog's logo will return you to the home screen.

The content section displays the current blog's title, main tag, author, and date, followed by the blog's content, then at the very bottom a list of all tags associated to this blog, which are clickable and work as search shortcuts.

The feed section displays all blogs sorted by date, and is affected by the search feature. It contains blog cards that display a blog's thumbnail, main tag, and title.

(OPTIONAL) The comments section shows an input area with fields where credentials must be specified (serves for both sign-on and sign-up), besides them are a submit and cancel buttons. The blog's comments list follows, along with their replies. Each comment has a controls menu allowing replying, updating and deleting the comment.


## TECHNICAL SPECIFICATION

This is a lightweight React client-side rendered single page application, where the source of data is static markdown files. Created with Vite, no TypeScript used, the only extra library is React-Markdown for the purpose of handling Markdown conversion to HTML.

The application is divided into 3 components (described previously), Routing has been handled through the native browser history API, the application reads and writes the blog ID and search keyword in the URL, this is to allow sharing links to specific blogs and filtered lists, and using the browser's backward and forward buttons.

There are 2 state variables, one holding the ID of the currently selected blog, and the other holding the search keywords, they are both present at the root component for easier state sharing between components, no state manager was used since there are only 2 levels in the component tree and only 2 states.

(OPTIONAL) Comments feature appears if a valid API URL is specified in ".env". Using the [Comment-API](https://github.com/Amin394T/Comment-API) ExpressJS API is recommended, check it out to learn about supported operations. API errors are displayed through browser alert pop-ups.


## USAGE INSTRUCTIONS

Use the version found in the build branch. Blogs can be added to the /markdown folder as markdown files, to make it appear in the application an entry containing the blog's metadata should be added in the _files_list.json file present in the same folder (copy and modify an existing entry). In the same folder you can also modify the welcome message and blog title by editing the _welcome.json file.

Thumbnail images can be added in the /images folder, it should preferably have a 3:2 aspect ratio or close. In the same folder you can also modify the header logo (_logo.png, 2:1 aspect ratio), tab icon (_head.png, 1:1 aspect ratio), and placeholder image (_placeholder.png, 3:2 aspect ratio).

You can delete the mock-up blogs and their images, and remove their entries from _files_list.json. Do not remove any file starting with an underscore, be it in /markdown or /images, and do not modify/remove any file outside these 2 folders, except if you know what you're doing.

(OPTIONAL) To activate the comments feature, host the aforementioned API on a cloud service that supports NodeJS, then build the project's main branch manually after changing the API URL in the ".env" file to the one relative to your host service.