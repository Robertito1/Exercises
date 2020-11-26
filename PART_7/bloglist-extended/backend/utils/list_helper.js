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
  const obj = _.countBy(arrayOfBlogs, function (rec) {
    return rec.author;
  });
  const pairs = _.toPairs(obj);
  const values = Object.values(obj);
  const max = Math.max(...values);
  const arrayOfmostBlogs = pairs.find((e) => e[1] === max);
  const mostBlogs = new Object();
  mostBlogs.author = arrayOfmostBlogs[0];
  mostBlogs.blogs = arrayOfmostBlogs[1];

  return mostBlogs;
};

const mostLikes = (arrayOfBlogs) => {
  var obj = _.groupBy(arrayOfBlogs, "author");
  const authorAskeys = _.keysIn(obj);
  const groupedArrays = _.toArray(obj);

  const values = groupedArrays.map((array) => {
    const totallikes = array.reduce(reducer, 0);
    return totallikes;
  });

  const higestValue = Math.max(...values);
  const indexOfAuthor = values.indexOf(higestValue);
  const authorWithhighestlikes = authorAskeys[indexOfAuthor];

  const mostLikes = new Object();
  mostLikes.author = authorWithhighestlikes;
  mostLikes.likes = higestValue;

  return mostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  reducer,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
