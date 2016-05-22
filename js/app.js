//Handle Firebase Data
var fireBaseRef = new Firebase ('https://project-7555322063986067860.firebaseio.com');

var onComplete = function(error) {
  'use strict';
  if (error) {
    console.log('Synchronization failed');
  } else {
    console.log('Synchronization succeeded');
  }
};

var test = fireBaseRef.child('test');
test.set({
  testUser: {
    name: 'test',
  }
}, onComplete);

var getTest = test.on('value', function(snapshot) {
  'use strict';
  console.log(snapshot.val());
}, function (errorObject) {
  'use strict';
  console.log('The read failed: " + errorObject.code');
});

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
  var inputAuthor = $('#author-name-input').val();
  var inputContent = $('#author-content-input').val();
  console.log(inputAuthor, inputContent);

  Post.All.push(new Post(inputAuthor, inputContent));
  //Append all posts to posts-list
  $('#posts-list').html(null);
  Post.prototype.appendAll(Post.All);

  $('#author-name-input').val('');
  $('#author-content-input').val('');
});
