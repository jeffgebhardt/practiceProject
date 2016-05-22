//Firebase Reference
var postsListRef = new Firebase ('https://project-7555322063986067860.firebaseio.com/postsList');

//Success message
var onComplete = function(error) {
  'use strict';
  if (error) {
    console.log('Synchronization failed');
  } else {
    console.log('Synchronization succeeded');
  }
};

//Clear Messages
Post.prototype.clearData = function(){
  'use strict';
  postsListRef.remove();
};

//Set Data
Post.prototype.pushData = function(dataWePassIn){
  'use strict';
  dataWePassIn.map(function(post){
    postsListRef.push({newPost: post}, onComplete);
  });
};

//Array holding all posts
Post.All = [];

//Create Message object
function Post(postAuthor, postContent){
  'use strict';
  this.postAuthor = postAuthor;
  this.postContent = postContent;
};

//Write post to HTML
Post.prototype.toHtml = function(){
  'use strict';
  var $source = $('#posts-template').html();
  var template = Handlebars.compile($source);
  return template(this);
};

//Append Data to DOM
Post.prototype.appendAll = function(dataToAppend) {
  'use strict';
  dataToAppend.map(function(p) {
    return $('#posts-list').append(p.toHtml());
  });
};

//Submit posts event listener
$('button').on('click', function(){
  'use strict';

  //Get data from input fields
  var inputAuthor = $('#author-name-input').val();
  var inputContent = $('#author-content-input').val();
  console.log(inputAuthor, inputContent);

  //Create new post object
  Post.All.push(new Post(inputAuthor, inputContent));

  //Clear input fields
  $('#posts-list').html(null);

  //Clear Firebase data
  Post.prototype.clearData();

  //Push all data to firebase
  Post.prototype.pushData(Post.All);

  //Append all posts to posts-list
  Post.prototype.appendAll(Post.All);

  $('#author-name-input').val('');
  $('#author-content-input').val('');
});
