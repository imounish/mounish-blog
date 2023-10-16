exports.createPages = async ({ graphql, actions }) => {
  const postsPerPage = parseInt(process.env.GATSBY_POSTS_PER_PAGE) || 10;
  const categoriesPerPage = parseInt(
    process.env.GATSBY_CATEGORIES_PER_PAGE || 6
  );
  const authorsPerPage = parseInt(process.env.GATSBY_AUTHORS_PER_PAGE || 4);

  // template paths
  const singleBlogTemplate = require.resolve(
    './src/templates/single-blog-post.js'
  );
  const blogsListTemplate = require.resolve(
    './src/templates/blog-post-list.js'
  );
  const singleCategoryTemplate = require.resolve(
    './src/templates/single-category.js'
  );
  const categoryListTemplate = require.resolve(
    './src/templates/category-list.js'
  );
  const singleAuthorTemplate = require.resolve('./src/templates/single-author.js');
  const authorListTemplate = require.resolve('./src/templates/author-list.js');

  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityBlog {
        nodes {
          id
          slug {
            current
          }
        }
      }
      allSanityCategory {
        nodes {
          id
          slug {
            current
          }
        }
      }
      allSanityAuthor {
        nodes {
          id
          slug {
            current
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;
  const blogs = result.data.allSanityBlog.nodes;
  const categories = result.data.allSanityCategory.nodes;
  const authors = result.data.allSanityAuthor.nodes;

  // single blog pages
  blogs.forEach((blog) => {
    createPage({
      path: `/posts/${blog.slug.current}`,
      component: singleBlogTemplate,
      context: { id: blog.id },
    });
  });

  // single category pages
  categories.forEach((category) => {
    createPage({
      path: `/categories/${category.slug.current}`,
      component: singleCategoryTemplate,
      context: { id: category.id },
    });
  });

  // single author pages
  authors.forEach((author) => {
    createPage({
      path: `/authors/${author.slug.current}`,
      component: singleAuthorTemplate,
      context: { id: author.id },
    })
  })

  // blog list pages
  const totalBlogListPages = Math.ceil(blogs.length / postsPerPage);
  Array.from({ length: totalBlogListPages }).forEach((_, index) => {
    createPage({
      path: index === 0 ? '/posts' : `/posts/${index + 1}`,
      component: blogsListTemplate,
      context: {
        limit: postsPerPage,
        offset: index * postsPerPage,
        numberOfPages: totalBlogListPages,
        currentPage: index + 1,
      },
    });
  });

  // category list pages
  const totalCategoryListPages = Math.ceil(
    categories.length / categoriesPerPage
  );
  Array.from({ length: totalCategoryListPages }).forEach((_, index) => {
    createPage({
      path: index === 0 ? '/categories' : `/categories/${index + 1}`,
      component: categoryListTemplate,
      context: {
        limit: categoriesPerPage,
        offset: index * categoriesPerPage,
        numberOfPages: totalCategoryListPages,
        currentPage: index + 1,
      },
    });
  });

  // author list pages
  const totalAuthorListPages = Math.ceil(authors.length / authorsPerPage);
  Array.from({ length: totalAuthorListPages }).forEach((_, index) => {
    createPage({
      path: index === 0 ? '/authors' : `/authors/${index + 1}`,
      component: authorListTemplate,
      context: {
        limit: authorsPerPage,
        offset: index * authorsPerPage,
        numberOfPages: totalAuthorListPages,
        currentPage: index + 1,
      },
    });
  });
};
