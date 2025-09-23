// functions/checkCredits.js
const admin = require("firebase-admin");

async function checkCredits(userId, serviceId, requiredCredits) {
  const serviceRef = admin
    .firestore()
    .collection("Credits")
    .doc(userId)
    .collection("UserCredits")
    .doc(serviceId);

  const docSnap = await serviceRef.get();

  if (!docSnap.exists) {
    return { allowed: false, available: 0 };
  }

  const data = docSnap.data();
  const available = data.available || 0;

  return {
    allowed: available >= requiredCredits,
    available,
  };
}

module.exports = { checkCredits };
