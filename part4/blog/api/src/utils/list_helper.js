const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  let sum = 0;
  blogs.forEach(blog => (sum += blog.likes));
  return sum;
};

const favoriteBlog = blogs => {
  let result = {
    title: '',
    author: '',
    likes: 0,
  };

  blogs.forEach(blog => {
    if (result.likes < blog.likes) {
      result = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
      };
    }
  });

  return result;
};

module.exports = { dummy, totalLikes, favoriteBlog };
