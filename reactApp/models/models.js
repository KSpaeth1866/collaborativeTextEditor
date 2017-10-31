var mongoose = require('mongoose');
var connect = process.env.MONGODB_URI || require('./connect');
mongoose.connect(connect);

var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  docsList: [{
    docId: mongoose.Schema.Types.ObjectId,
      }]
});

var docsSchema = mongoose.Schema({
  editorState: {
    type: Object
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
  },
  collaborators: [{
    userId: mongoose.Schema.Types.ObjectId,
  }],
  name: {
    type: String,
    unique: true
  },
});
// 
// docsSchema.methods.addCollaborator = function (cb){
//   this.
//     Follow.find({following: this._id}).populate('follower').exec(function(err, peopleWhoFollowYou){
//       if(err) {
//         res.send(err);
//       } else {
//         // peopleYouFollow
//         Follow.find({follower: saveUserId}).populate('following').exec(function(err, peopleYouFollow){
//           if (err) {
//             res.send(err);
//           } else {
//             callback(null, peopleYouFollow, peopleWhoFollowYou);
//           }
//         })
//       }
//     })
// }
//


var User = mongoose.model('User', userSchema);
var Document = mongoose.model('Document', docsSchema);

module.exports = {
  User: User,
  Document: Document,
};
