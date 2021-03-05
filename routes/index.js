// $ npm install firebase-admin --save
var admin = require("firebase-admin");
 var serviceAccount = require("../firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://restapp-87097-default-rtdb.firebaseio.com"
});

// admin.initializeApp(functions.config().firebase);

const db = admin.database();

const { Router}= require('express');
const router = Router();

router.get('/', (req, res) => {
    db.ref('contacts').once('value', (snapshot) => {
       data = snapshot.val();
       res.render('index', {contacts: data})
    });
})

router.post('/new-contact', (req, res) => {
    const newContact = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        mobile: req.body.mobile
    }
    db.ref('contacts').push(newContact);
    res.redirect('/');
});

router.get('/delete-contact/:id', (req, res) => {
    db.ref('contacts/' + req.params.id).remove();
    res.redirect('/');
});

module.exports = router;
