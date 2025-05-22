const admin = require('firebase-admin');
const serviceAccount = require('./firebase-config.json');

function initializeApp() {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://book-api-bea17.firebaseio.com"
        });
    }
}

initializeApp();

module.exports = admin.firestore();