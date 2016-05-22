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

var test2 = fireBaseRef.child('test2');
test2.set({
  testUser2: {
    name: 'test2',
  }
}, onComplete);

var getTest = test.on('value', function(snapshot) {
  'use strict';
  console.log(snapshot.val());
}, function (errorObject) {
  'use strict';
  console.log('The read failed: " + errorObject.code');
});

var getTest2 = test2.on('value', function(snapshot) {
  'use strict';
  console.log(snapshot.val());
}, function (errorObject) {
  'use strict';
  console.log('The read failed: " + errorObject.code');
});
