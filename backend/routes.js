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
  res.json({success:true, message: 'Hello World!'})
})

router.post('/login', passport.authenticate('local'), function(req, res) {
  console.log(req.user.username,"has logged in:",req.user._id);
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

router.use(function(req, res, next) {
  if (!req.user) {
    res.json({success: false, message: "Not logged in! Req.user has not been provided and needs to be seen to. Set the with credentials flag of all axios calls to secure routes to true. Do that and you've successfully made it into MORDOR!!!🗻 🕷 🗡 🏔  🏹 💍 👿 🌋 "})
  } else {
    console.log(req.user.username, "has passed the gate, press on!😡 🛡 ⚔️");
    next()
  }
})

router.get('/document/list', function(req, res) {
  User.findById(req.user._id).populate('docsList', 'ts name').exec((err, user) => {
    if (err) {
      res.json({success: false, message: err})
    } else if (user.docsList.length === 0) {
      res.json({success: false, user: user, message: "No docs found."})
    } else {
      res.json({success: true, user: user, message: "Docs found."})
    }
  })
});

router.post('/document/new', function(req, res) {
  const newDoc = new Document({
    owner: req.user._id,
    collaborators: [req.user._id],
    name: req.body.name,
    ts: new Date(),
    contentState: req.body.contentState
  });
  const user = req.user;
  user.docsList.push(newDoc._id);
  console.log(newDoc._id);
  Promise.all([newDoc.save(), user.save()]).then(resultArr => {
    console.log("Created new doc:",newDoc.name,"for",req.user.username);
    res.json({success: true, message: "New Doc created"})
  }).catch(err => {
    res.json({success: false, message: err})
  })
});

router.get('/document/add/:docId', function(req, res) {
  Document.findById(req.params.docId).exec((err, doc) => {
    if (err) {
      res.json({success: false, message: err})
    } else if (!doc) {
      res.json({success: false, message: "No doc found with that ID."})
    } else if (doc.collaborators.indexOf(req.user._id === -1) {
      user.docsList.push(doc._id);
      doc.collaborators.push(req.user._id);
      Promise.all([user.save(), doc.save()]).then(a => {
        console.log("Found new doc:",doc.name,"for", req.user.username);
        res.json({success: true, user: user, message: "Was not collaborator but you are now."})
      }).catch(err => {
        res.json({success: false, message: err})
      })
    } else {
      console.log("Already had that old doc:",doc.name,"for", req.user.username);
      res.json({success: true, req.user, message: "Adding a doc you already have."})
    }
  })
});

router.get('/document/get/:docId', function(req, res) {
  Document.findById(req.params.docId).exec((err, doc) => {
    if (err) {
      res.json({success: false, message: err})
    } else if (!doc) {
      res.json({success: false, message: "No doc found with that ID."})
    } else {
      if (doc.collaborators.indexOf(req.user._id) === -1) {
        User.findById(req.user._id).exec((err, user) => {
          user.docsList.push(doc._id);
          doc.collaborators.push(req.user._id);
          Promise.all([user.save(), doc.save()]).then(a => {
            console.log("Found new doc:",doc.name,"for", req.user.username);
            res.json({success: true, document: doc, message: "Was not member but is now."})
          }).catch(err => {
            res.json({success: false, message: err})
          })
        })
      } else {
        console.log("Found old doc:",doc.name,"for", req.user.username);
        res.json({success: true, document: doc, message: "Opening a doc you have seen before."})
      }
    }
  })
});


router.post('/document/save/:docId', function(req, res) {
  if (!req.body.contentState) {
    res.json({success: false, message: "No contentState provided"})
  } else {
    Document.findByIdAndUpdate({
      _id: req.params.docId
    }, {contentState: req.body.contentState, name: req.body.name}).then(result => {
      console.log("Saved doc:",req.body.name,"for", req.user.username);
      res.json({success: true, message: "You've successfully made it into MORDOR!!!🗻 🕷 🗡 🏔  🏹 💍 👿 🌋 "})
    }).catch(err => {
      res.json({success: false, message: err})
    })
  }
});

router.get('/logout', function(req, res) {
  console.log(req.user.username,"has logged out. Bye Felicia🙈");
  req.logout();
  res.json({success: true});
});

module.exports = router;
