const { dummy, totalLikes, favoriteBlog } = require('../utils/list_helper');
const { blogs, listWithOneBlog } = require('./helper');

describe('dummy', () => {
  test('return one', () => {
    const blogs = [];

    expect(dummy(blogs)).toBe(1);
  });
});

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    expect(totalLikes(listWithOneBlog)).toBe(5);
  });

  test('when list has many blogs, equals to the sum of their likes', () => {
    expect(totalLikes(blogs)).toBe(36);
  });
});

describe('favorite blog', () => {
  test('of a list of many blogs', () => {
    expect(favoriteBlog(blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 12,
      title: 'Canonical string reduction',
    });
  });
});
