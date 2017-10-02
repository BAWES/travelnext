// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');

/**
 * Calculate user progress based on countries he selected.
 */
exports.calculateUserProgress = functions.database.ref('/user-country-selection/{user_id}')
    .onWrite(event => {        
        // Grab the current value of what was written to the Realtime Database.
        const userId = event.params.user_id;
        const originalUserSelection = event.data.val();

        let totalCountriesVisited = 0;

        Object.keys(originalUserSelection).forEach(regionKey => {
            if (originalUserSelection[regionKey].countries) {
                totalCountriesVisited += Object.keys(originalUserSelection[regionKey].countries).length;
            }
        });

        console.log("total countries", totalCountriesVisited);

        const userRef = event.data.adminRef.root.child(`/users/${userId}`);

        // You must return a Promise when performing asynchronous tasks
        return userRef.child("totalCountriesVisited").set(totalCountriesVisited);
    });