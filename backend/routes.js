//ROUTER SETUP
const express = require('express');
const router = express.Router();
//MODELS
const User = require('./models/models').User;
const Document = require('./models/models').Document;
//PASSPORT
const passport = require('./auth');
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

router.use(function(req,res,next){
  if (!req.user) {
    res.send({success:false, message: "Not logged in! Req.user has not been provided and needs to be seen to. Set the with credentials flag of all axios calls to secure routes to true. Do that and you've successfully made it into MORDOR!!!🗻 🕷 🗡 🏔  🏹 💍 👿 🌋 "})
  } else {
    console.log("We've passed the gate, press on!😡 🛡 ⚔️");
    next()
  }
})

router.get('/document/:docId', function(req, res) {
  Document.findById(req.params.docId).exec((err, doc) => {
    if (err) {
      res.json({success: false, message: err})
    } else if (!doc) {
      res.json({success: false, message: "No doc found with that ID."})
    }else {
      if (doc.collaborators.indexOf(req.user._id) === -1) {
      // if ('yes' === 'not') {
        User.findById(req.user._id).exec((err,user) => {
          user.docsList.push(doc._id);
          doc.collaborators.push(req.user._id);
          console.log("NEW USER\n",user.docsList,"\n\nNEW DOC\n",doc.collaborators);
          Promise.all([
            user.save(),
            doc.save()
          ]).then(a => {
            console.log("find doc new user:",a);
            res.json({success: true, document: doc, message: "Was not member but is now."})
          }).catch(err=>{
            res.json({success: false, message: err})
          })
        })
      } else {
        res.json({success: true, document: doc, message: "Opening a doc you have seen before."})
      }
    }
  })
});

router.post('/document/new', function(req, res) {
  const newDoc = new Document({
    owner: req.user._id,
    collaborators: [req.user._id],
    name: req.body.name,
    ts: new Date(),
    contentState: req.body.contentState,
  });
  const user = req.user;
  user.docsList.push(newDoc._id);
  console.log(newDoc._id);
  Promise.all([
    newDoc.save(),
    user.save()
  ]).then(resultArr => {
    res.send({success:true, document: resultArr[0], user: resultArr[1]})
  }).catch(err => {
    res.send({success:false, message: err})
  })
});

router.post('/document/save/:docId', function(req, res) {
  if (!req.body.contentState) {
    res.json({success:false, message:"No contentState provided"})
  } else {
    Document.findByIdAndUpdate({
      _id: req.params.docId
    }, {contentState: req.body.contentState}).then(result => {
      res.json({success:true})
    }).catch(err=>{
      res.json({success:false,message:err})
    })
  }
});

router.get('/logout', function(req, res) {
  req.logout();
  res.json({success:true});
});

module.exports = router;
