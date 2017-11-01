//ROUTER SETUP
const express = require('express');
const router = express.Router();
//Draft js object to setup EditorState
const {EditorState} = require('draft-js');
//MODELS
const User = require('./models/models').User;
const Document = require('./models/models').Document;
//PASSPORT
const passport = require('./auth');
router.use(passport.initialize());
/* GET home page. */
router.get('/', function(req, res) {
  res.send('Hello World!')
})
router.post('/test', function(req, res) {
  User.findById(req.body.id).populate('docsList','ts name').exec( (err,user) => {
    if (!err) {
      console.log(user);
      res.send({success:true,user:user})
    }

  })
})

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.json({success: true, user: req.user});
});

router.post('/register', function(req, res) {
  const newUser = new User({username: req.body.username, password: req.body.password});
  newUser.save(err => {
    if (err) {
      res.json({success: false, message: err})
    } else {
      res.json({success: true})
    }
  })
});

// router.use(function(req,res,next){
//   if (!req.user) {
//     res.send({success:false, message: "Not logged in!"})
//   } else {
//     next()
//   }
// })

router.get('/document/:docId', function(req, res) {
  Document.findById(req.params.docId).exec((err, doc) => {
    if (err) {
      res.json({success: false, message: err})
    } else {
      if (doc.collaborators.indexOf(req.user._id) === 'not') {
        User.findById(req.body.user._id).exec((err,user) => {
          user.docsList.push(doc._id);
          doc.collaborators.push(req.user._id)
          Promise.all([
            user.save(),
            doc.save()
          ]).then(a => {
            console.log("find doc new user:",a);
            res.json({success: true, document: doc})
          }).catch(err=>{
            res.json({success: false, message: err})
          })
        })
      } else {
        res.json({success: true, document: doc})
      }
    }
  })
});

router.post('/document/new', function(req, res) {
  const newDoc = new Document({
    owner: req.body.user._id,
    collaborators: [req.body.user._id],
    name: req.body.name,
    ts: new Date(),
    editorState: EditorState.createEmpty(),
  });
  console.log(newDoc._id);
  Promise.all([
    newDoc.save(),
    User.findById(req.body.user._id).exec( (err,user) => {
      user.docsList.push(newDoc._id)
      user.save()
    })
  ]).then(resultArr => {
    res.send({success:true, document: resultArr[0], user: resultArr[1]})
  }).catch(err => {
    res.send({success:false, message: err})
  })
});

router.post('/document/save/:docId', function(req, res) {
  Document.findByIdAndUpdate({
    _id: req.params.docId
  }, {editorState: req.body.editorState}).then(result => {
    res.json({success:true})
  }).catch(err=>{
    res.json({success:false,message:err})
  })
});

router.get('/logout', function(req, res) {
  req.logout();
  res.json({success:true});
});

module.exports = router;
