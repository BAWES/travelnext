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

        // You must return a Promise when performing asynchronous tasks
        return event.data.adminRef.root.child(`/users/${userId}/totalCountriesVisited`).set(totalCountriesVisited);
    });

/**
 * When a user follows another user, save a copy in the users "followers"
 * and store number of followers/following user has.
 */
exports.storeFollowingOnFollow = functions.database.ref('/user-following/{user_id}/{following_user_id}')
    .onWrite(event => {
        // Grab the current value of what was written to the Realtime Database.
        const userId = event.params.user_id;
        const following_user_id = event.params.following_user_id;

        // Refs
        let rootRef = event.data.adminRef.root;
        
        // User Follower Count Increase
        let followerCountRef = rootRef.child(`/users/${following_user_id}/numFollowers`);
        let followerCountPromise = followerCountRef.transaction(function(current) {
            if (event.data.exists() && !event.data.previous.exists()) {
                return (current || 0) + 1;
            }
            else if (!event.data.exists() && event.data.previous.exists()) {
                return (current || 0) - 1;
            }
        });

        // User Following Count Increase
        let followingCountRef = rootRef.child(`/users/${userId}/numFollowing`);
        let followingCountPromise = followingCountRef.transaction(function(current) {
            if (event.data.exists() && !event.data.previous.exists()) {
                return (current || 0) + 1;
            }
            else if (!event.data.exists() && event.data.previous.exists()) {
                return (current || 0) - 1;
            }
        });

        // Return all promises
        return Promise.all([followerCountPromise, followingCountPromise]);
    });