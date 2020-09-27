const _ = require("lodash");

const dummy = (blogs) => {
  if (blogs) {
    return 1;
  }
};
const reducer = (sum, index) => {
  console.log("sum", sum);
  console.log("val", index.likes);
  return sum + index.likes;
};

const totalLikes = (arrayOfBlogs) => {
  const likesSum = arrayOfBlogs.reduce(reducer, 0);
  return likesSum;
};

const favoriteBlog = (arrayOfBlogs) => {
  if (arrayOfBlogs.length === 0) {
    return "there are no blogs yet";
  }
  console.log(arrayOfBlogs);
  const likesArray = arrayOfBlogs.map((blog) => blog.likes);
  console.log("likesArray", likesArray);
  const higestValue = Math.max(...likesArray);
  console.log("higest Value", higestValue);
  const favorite = arrayOfBlogs.find(
    (element) => element.likes === higestValue
  );
  return favorite;
};

const mostBlogs = (arrayOfBlogs) => {
  const element = _.maxBy(arrayOfBlogs, "author");
  console.log(element);
  return element;
};
module.exports = {
  dummy,
  totalLikes,
  reducer,
  favoriteBlog,
  mostBlogs,
};
