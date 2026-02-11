/*
 * This script assigns admin privileges to a user in your Firebase project.
 *
 * HOW TO USE:
 * 1. Install dependencies from your project root:
 *    npm install
 *
 * 2. Get your Service Account Key:
 *    - Go to your Firebase project settings -> Service accounts.
 *    - Click "Generate new private key".
 *    - A JSON file will be downloaded. Rename it to "service-account-key.json"
 *      and place it in the root directory of this project.
 *
 * 3. Get the User UID:
 *    - Go to Firebase Console -> Authentication -> Users.
 *    - Copy the UID of the user you want to make an admin.
 *
 * 4. Update the UID below:
 *    - Paste the copied UID into the `USER_UID_TO_MAKE_ADMIN` variable.
 *
 * 5. Run the script from your project root:
 *    node set-admin-claim.js
 *
 * NOTE: After running, the user must log out and log back in for the
 *       admin privileges to take effect in the web app.
 */

const admin = require("firebase-admin");
const path = require("path");

// --- CONFIGURATION ---
// PASTE THE USER UID YOU COPIED FROM THE FIREBASE CONSOLE HERE
const USER_UID_TO_MAKE_ADMIN = "PASTE_YOUR_USER_UID_HERE";
// ---------------------

// Path to your service account key JSON file
const serviceAccountPath = path.join(__dirname, "service-account-key.json");

try {
  const serviceAccount = require(serviceAccountPath);

  if (USER_UID_TO_MAKE_ADMIN === "PASTE_YOUR_USER_UID_HERE") {
    console.error("\nERROR: Please edit this script (set-admin-claim.js) and replace 'PASTE_YOUR_USER_UID_HERE' with the actual User UID from your Firebase project.\n");
    process.exit(1);
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  admin.auth().setCustomUserClaims(USER_UID_TO_MAKE_ADMIN, { admin: true })
    .then(() => {
      console.log(`\n✅ Success! User ${USER_UID_TO_MAKE_ADMIN} has been made an admin.`);
      console.log("   The user must now log out and log back in for the changes to apply.\n");
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n❌ Error setting custom claims:", error.message);
      if (error.code === 'auth/user-not-found') {
        console.error(`   Could not find a user with the UID: "${USER_UID_TO_MAKE_ADMIN}". Please double-check the UID.`);
      }
      process.exit(1);
    });

} catch (error) {
  if (error.code === 'MODULE_NOT_FOUND') {
    console.error(`\n❌ ERROR: The "service-account-key.json" file was not found.`);
    console.error(`   Please download it from your Firebase project settings and place it in the project root.\n`);
  } else {
    console.error("\nAn unexpected error occurred:", error);
  }
  process.exit(1);
}
