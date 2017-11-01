var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  docsList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document'
      }]
});

var docsSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  collaborators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  ts: {
    type: Date
  },
  contentState: {
    type: String
  }
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
