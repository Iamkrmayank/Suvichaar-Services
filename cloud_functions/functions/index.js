// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// const fetch = require("node-fetch");
// const FormData = require("form-data");
// const cors = require("cors")({ origin: true });

// admin.initializeApp();

// // 🔒 Securely stored here, not in frontend
// const apiUrl = "https://ocr-api.whiteisland-424148cf.centralindia.azurecontainerapps.io/ocr-file";
// const apiKey = "31d1fdb5-936c-407c-8922-7d980739006e";

// exports.processOcrCore = functions.https.onRequest((req, res) => {
//   cors(req, res, async () => {
//     try {
//       // 1️⃣ Verify Firebase Auth token
//       const authHeader = req.headers.authorization;
//       if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({ error: "Unauthorized - No token provided" });
//       }

//       const idToken = authHeader.split("Bearer ")[1];
//       let decodedToken;
//       try {
//         decodedToken = await admin.auth().verifyIdToken(idToken);
//       } catch (error) {
//         return res.status(403).json({ error: "Unauthorized - Invalid token" });
//       }

//       console.log("✅ User authenticated:", decodedToken.uid);

//       // 2️⃣ Validate file upload
//       if (!req.rawBody || !req.headers["content-type"]) {
//         return res.status(400).json({ error: "No file uploaded" });
//       }

//       // 3️⃣ Prepare file for Azure API
//       const formData = new FormData();
//       formData.append("file", req.rawBody, {
//         contentType: req.headers["content-type"],
//         filename: "upload.pdf",
//       });

//       // 4️⃣ Send to Azure OCR API
//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: {
//           "x-api-key": apiKey,
//         },
//         body: formData,
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         return res.status(response.status).send(errorText);
//       }

//       // 5️⃣ Stream result back
//       res.setHeader(
//         "Content-Type",
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//       );
//       response.body.pipe(res);
//     } catch (err) {
//       console.error("❌ OCR Function error:", err);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   });
// });


// --------------------------------------working withour the credit logic-------------------------------------------------------


const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
const FormData = require("form-data");
const cors = require("cors")({ origin: true });

admin.initializeApp();

// 🔒 Azure OCR API endpoints + keys
const CORE_API_URL = "https://ocr-api.whiteisland-424148cf.centralindia.azurecontainerapps.io/ocr-core";
const CORE_API_KEY = "31d1fdb5-936c-407c-8922-7d980739006e";

const ADV_API_URL = "https://mistral-ocr-api.whiteisland-424148cf.centralindia.azurecontainerapps.io/ocr-advanced";
const ADV_API_KEY = "20d32a89-a017-425d-bc50-ab3578df5c66";

// 🔁 Shared logic
// async function handleOcrRequest(req, res, apiUrl, apiKey) {
//   try {
//     // 1️⃣ Verify Firebase Auth token
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ error: "Unauthorized - No token provided" });
//     }

//     const idToken = authHeader.split("Bearer ")[1];
//     let decodedToken;
//     try {
//       decodedToken = await admin.auth().verifyIdToken(idToken);
//     } catch (error) {
//       return res.status(403).json({ error: "Unauthorized - Invalid token" });
//     }

//     console.log("✅ User authenticated:", decodedToken.uid);

//     // 2️⃣ Validate file upload
//     if (!req.rawBody || !req.headers["content-type"]) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     // 3️⃣ Prepare file for Azure API
//     const formData = new FormData();
//     formData.append("file", req.rawBody, {
//       contentType: req.headers["content-type"],
//       filename: "upload.pdf",
//     });

//     // 4️⃣ Send to Azure OCR API
//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         "x-api-key": apiKey,
//       },
//       body: formData,
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       return res.status(response.status).send(errorText);
//     }

//     // 5️⃣ Forward result back to client
//     res.setHeader(
//       "Content-Type",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//     );

//     // ✅ Forward credits info header if Azure sends it
//     // const creditsUsed = response.headers.get("x-credits-used");
//     // if (creditsUsed) {
//     //   res.setHeader("X-Credits-Used", creditsUsed);
//     // }


//     // 🔁 Forward ALL headers from Azure
//     response.headers.forEach((value, key) => {
//       res.setHeader(key, value);
//     });

//     response.body.pipe(res);
//   } catch (err) {
//     console.error("❌ OCR Function error:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }


// async function handleOcrRequest(req, res, apiUrl, apiKey) {
//   try {
//     // 1️⃣ Verify Firebase Auth token
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ error: "Unauthorized - No token provided" });
//     }

//     const idToken = authHeader.split("Bearer ")[1];
//     let decodedToken;
//     try {
//       decodedToken = await admin.auth().verifyIdToken(idToken);
//     } catch (error) {
//       return res.status(403).json({ error: "Unauthorized - Invalid token" });
//     }

//     console.log("✅ User authenticated:", decodedToken.uid);

//     // 2️⃣ Validate file upload
//     if (!req.rawBody || !req.headers["content-type"]) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     // 3️⃣ Prepare file for Azure API
//     const formData = new FormData();
//     formData.append("file", req.rawBody, {
//       contentType: req.headers["content-type"] || "application/pdf",
//       filename: "upload.pdf",
//     });

//     // 4️⃣ Send to Azure OCR API
//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         "x-api-key": apiKey,
//         ...formData.getHeaders(),
//       },
//       body: formData,
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       return res.status(response.status).send(errorText);
//     }

//     // 5️⃣ Forward result back to client
//     res.setHeader(
//       "Content-Type",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//     );

//     // ✅ Forward credits explicitly
//     const creditsUsed = response.headers.get("x-credits-used");
//     if (creditsUsed) {
//       res.setHeader("x-credits-used", creditsUsed);
//     }

//     // 🔁 Forward all other headers
//     response.headers.forEach((value, key) => {
//       if (key.toLowerCase() !== "x-credits-used") {
//         res.setHeader(key, value);
//       }
//     });

//     response.body.pipe(res);
//   } catch (err) {
//     console.error("❌ OCR Function error:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// async function handleOcrRequest(req, res, apiUrl, apiKey) {
//   try {
//     // 1️⃣ Verify Firebase Auth token
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ error: "Unauthorized - No token provided" });
//     }

//     const idToken = authHeader.split("Bearer ")[1];
//     let decodedToken;
//     try {
//       decodedToken = await admin.auth().verifyIdToken(idToken);
//     } catch (error) {
//       return res.status(403).json({ error: "Unauthorized - Invalid token" });
//     }

//     console.log("✅ User authenticated:", decodedToken.uid);

//     // 2️⃣ Validate file upload
//     if (!req.rawBody || !req.headers["content-type"]) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     // 3️⃣ Prepare file for Azure API
//     const formData = new FormData();
//     formData.append("file", req.rawBody, {
//       contentType: req.headers["content-type"] || "application/pdf",
//       filename: "upload.pdf",
//     });

//     // 4️⃣ Send to Azure OCR API
//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         "x-api-key": apiKey,
//       },
//       body: formData,
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       return res.status(response.status).send(errorText);
//     }

//     // 5️⃣ Forward result back to client
//     res.setHeader(
//       "Content-Type",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//     );

//     // ✅ Forward credits explicitly
//     const creditsUsed = response.headers.get("x-credits-used");
//     if (creditsUsed) {
//       res.setHeader("x-credits-used", creditsUsed);
//     }

//     // ✅ Tell browser it can read this header
//     res.setHeader("Access-Control-Expose-Headers", "X-Credits-Used");

//     // 🔁 Forward other headers except x-credits-used
//     response.headers.forEach((value, key) => {
//       if (key.toLowerCase() !== "x-credits-used") {
//         res.setHeader(key, value);
//       }
//     });

//     response.body.pipe(res);
//   } catch (err) {
//     console.error("❌ OCR Function error:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// --- included credits logic

async function handleOcrRequest(req, res, apiUrl, apiKey) {
  try {
    // 1️⃣ Verify Firebase Auth token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized - No token provided" });
    }

    const idToken = authHeader.split("Bearer ")[1];
    let decodedToken;
    try {
      decodedToken = await admin.auth().verifyIdToken(idToken);
    } catch (error) {
      return res.status(403).json({ error: "Unauthorized - Invalid token" });
    }

    // console.log("✅ User authenticated:", decodedToken.uid);

    // 2️⃣ Validate file upload
    if (!req.rawBody || !req.headers["content-type"]) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // 3️⃣ Prepare file for Azure API
    const formData = new FormData();
    formData.append("file", req.rawBody, {
      contentType: req.headers["content-type"] || "application/pdf",
      filename: "upload.pdf",
    });

    // 4️⃣ Send to Azure OCR API
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).send(errorText);
    }

    // 5️⃣ Forward result back to client
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );

    // ✅ Forward credits explicitly
    const creditsUsed = parseInt(response.headers.get("x-credits-used") || "0", 10);
    if (creditsUsed > 0) {
      res.setHeader("x-credits-used", creditsUsed.toString());

      // 🔥 Deduct credits in Firestore
      const userId = decodedToken.uid;
      const serviceId = "CL_SER_1"; // 👈 change to CL_SER_1 for core OCR

      const serviceRef = admin
        .firestore()
        .collection("Credits")
        .doc(userId)
        .collection("UserCredits")
        .doc(serviceId);

      await admin.firestore().runTransaction(async (t) => {
        const docSnap = await t.get(serviceRef);
        if (!docSnap.exists) {
          throw new Error("Service credits not found for user");
        }

        const data = docSnap.data();
        const newUsed = (data.used || 0) + creditsUsed;
        const newAvailable = Math.max((data.available || 0) - creditsUsed, 0);

        t.update(serviceRef, {
          used: newUsed,
          available: newAvailable,
        });
      });

      // console.log(`✅ Deducted ${creditsUsed} credits for ${userId}`);
    }

    // ✅ Tell browser it can read this header
    res.setHeader("Access-Control-Expose-Headers", "X-Credits-Used");

    // 🔁 Forward other headers except x-credits-used
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() !== "x-credits-used") {
        res.setHeader(key, value);
      }
    });

    response.body.pipe(res);
  } catch (err) {
    console.error("❌ OCR Function error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}



// async function handleOcrAdvanceRequest(req, res, apiUrl, apiKey) {
//   try {
//     // 1️⃣ Verify Firebase Auth token
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ error: "Unauthorized - No token provided" });
//     }

//     const idToken = authHeader.split("Bearer ")[1];
//     let decodedToken;
//     try {
//       decodedToken = await admin.auth().verifyIdToken(idToken);
//     } catch (error) {
//       return res.status(403).json({ error: "Unauthorized - Invalid token" });
//     }

//     console.log("✅ User authenticated:", decodedToken.uid);

//     // 2️⃣ Validate file upload
//     if (!req.rawBody || !req.headers["content-type"]) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     // 3️⃣ Prepare file for Azure API
//     const formData = new FormData();
//     formData.append("file", req.rawBody, {
//       contentType: req.headers["content-type"] || "application/pdf",
//       filename: "upload.pdf",
//     });

//     // 4️⃣ Send to Azure OCR API
//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         "x-api-key": apiKey,
//         ...formData.getHeaders(),
//       },
//       body: formData,
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       return res.status(response.status).send(errorText);
//     }

//     // 5️⃣ Forward result back to client
//     res.setHeader(
//       "Content-Type",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//     );

//     // ✅ Forward credits explicitly
//     const creditsUsed = response.headers.get("x-credits-used");
//     if (creditsUsed) {
//       res.setHeader("x-credits-used", creditsUsed);
//     }

//     // ✅ Tell browser it can read this header
//     res.setHeader("Access-Control-Expose-Headers", "X-Credits-Used");

//     // 🔁 Forward other headers except x-credits-used
//     response.headers.forEach((value, key) => {
//       if (key.toLowerCase() !== "x-credits-used") {
//         res.setHeader(key, value);
//       }
//     });

//     response.body.pipe(res);
//   } catch (err) {
//     console.error("❌ OCR Function error:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

async function handleOcrAdvanceRequest(req, res, apiUrl, apiKey) {
  try {
    // 1️⃣ Verify Firebase Auth token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized - No token provided" });
    }

    const idToken = authHeader.split("Bearer ")[1];
    let decodedToken;
    try {
      decodedToken = await admin.auth().verifyIdToken(idToken);
    } catch (error) {
      return res.status(403).json({ error: "Unauthorized - Invalid token" });
    }

    // console.log("✅ User authenticated:", decodedToken.uid);

    // 2️⃣ Validate file upload
    if (!req.rawBody || !req.headers["content-type"]) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // 3️⃣ Prepare file for Azure API
    const formData = new FormData();
    formData.append("file", req.rawBody, {
      contentType: req.headers["content-type"] || "application/pdf",
      filename: "upload.pdf",
    });

    // 4️⃣ Send to Azure OCR API
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        ...formData.getHeaders(),
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).send(errorText);
    }

    // ✅ Deduct credits in Firestore
    const creditsUsed = parseInt(response.headers.get("x-credits-used") || "0", 10);
    if (creditsUsed > 0) {
      const serviceId = "CL_SER_2";
      const creditRef = admin
        .firestore()
        .collection("Credits")
        .doc(decodedToken.uid)
        .collection("UserCredits")
        .doc(serviceId);
      // await admin.firestore().runTransaction(async (t) => {
      //   const doc = await t.get(creditRef);
      //   if (!doc.exists) {
      //     throw new Error("Credit document not found");
      //   }
      //   const current = doc.data().credits || 0;
      //   if (current < creditsUsed) {
      //     throw new Error("Not enough credits");
      //   }
      //   t.update(creditRef, { credits: current - creditsUsed });
      // });

      await admin.firestore().runTransaction(async (t) => {
        const docSnap = await t.get(creditRef);
        if (!docSnap.exists) {
          throw new Error("Credit document not found");
        }
        const current = docSnap.data().available || 0;  // use `available`, not `credits`
        if (current < creditsUsed) {
          throw new Error("Not enough credits");
        }
        t.update(creditRef, { available: current - creditsUsed, used: currentUsed + creditsUsed });
      });


      // console.log(`✅ Deducted ${creditsUsed} credits from user ${decodedToken.uid}`);
    }

    // 5️⃣ Forward result back to client
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );

    // ✅ Forward credits explicitly
    if (creditsUsed) {
      res.setHeader("x-credits-used", creditsUsed.toString());
    }

    // ✅ Tell browser it can read this header
    res.setHeader("Access-Control-Expose-Headers", "X-Credits-Used");

    // 🔁 Forward other headers except x-credits-used
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() !== "x-credits-used") {
        res.setHeader(key, value);
      }
    });

    response.body.pipe(res);
  } catch (err) {
    console.error("❌ OCR Function error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


// 🌟 Core OCR Function
exports.processOcrCore = functions.https.onRequest((req, res) => {
  cors(req, res, () => handleOcrRequest(req, res, CORE_API_URL, CORE_API_KEY));
});

// 🌟 Advanced OCR Function
exports.processAdvanceOcr = functions.https.onRequest((req, res) => {
  cors(req, res, () => handleOcrAdvanceRequest(req, res, ADV_API_URL, ADV_API_KEY));
});



// ----------------------------------------------with credits logic-----------------------------------------



// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// const fetch = require("node-fetch");
// const FormData = require("form-data");
// const cors = require("cors")({ origin: true });

// // ⭐ NEW
// const { checkCredits } = require("./checkCredits");

// admin.initializeApp();

// // 🔒 Azure OCR API endpoints + keys
// const CORE_API_URL = "https://ocr-api.whiteisland-424148cf.centralindia.azurecontainerapps.io/ocr-core";
// const CORE_API_KEY = "31d1fdb5-936c-407c-8922-7d980739006e";

// const ADV_API_URL = "https://mistral-ocr-api.whiteisland-424148cf.centralindia.azurecontainerapps.io/ocr-advanced";
// const ADV_API_KEY = "20d32a89-a017-425d-bc50-ab3578df5c66";


// async function handleOcrRequest(req, res, apiUrl, apiKey) {
//   try {
//     // 1️⃣ Verify Firebase Auth token
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ error: "Unauthorized - No token provided" });
//     }

//     const idToken = authHeader.split("Bearer ")[1];
//     let decodedToken;
//     try {
//       decodedToken = await admin.auth().verifyIdToken(idToken);
//     } catch (error) {
//       return res.status(403).json({ error: "Unauthorized - Invalid token" });
//     }

//     console.log("✅ User authenticated:", decodedToken.uid);

//     // ⭐ NEW: Check credits BEFORE making API call
//     const userId = decodedToken.uid;
//     const serviceId = "CL_SER_1"; // core OCR service
//     const requiredCredits = 1; // adjust if your API costs >1 credit per call

//     const { allowed, available } = await checkCredits(userId, serviceId, requiredCredits);

//     if (!allowed) {
//       return res.status(402).json({
//         error: "Insufficient credits",
//         available,
//         required: requiredCredits,
//       });
//     }

//     // 2️⃣ Validate file upload
//     if (!req.rawBody || !req.headers["content-type"]) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     // 3️⃣ Prepare file for Azure API
//     const formData = new FormData();
//     formData.append("file", req.rawBody, {
//       contentType: req.headers["content-type"] || "application/pdf",
//       filename: "upload.pdf",
//     });

//     // 4️⃣ Send to Azure OCR API
//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         "x-api-key": apiKey,
//       },
//       body: formData,
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       return res.status(response.status).send(errorText);
//     }

//     // 5️⃣ Forward result back to client
//     res.setHeader(
//       "Content-Type",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//     );

//     // ✅ Forward credits explicitly
//     const creditsUsed = parseInt(response.headers.get("x-credits-used") || "0", 10);
//     if (creditsUsed > 0) {
//       res.setHeader("x-credits-used", creditsUsed.toString());

//       // 🔥 Deduct credits in Firestore
//       const serviceRef = admin
//         .firestore()
//         .collection("Credits")
//         .doc(userId)
//         .collection("UserCredits")
//         .doc(serviceId);

//       await admin.firestore().runTransaction(async (t) => {
//         const docSnap = await t.get(serviceRef);
//         if (!docSnap.exists) {
//           throw new Error("Service credits not found for user");
//         }

//         const data = docSnap.data();
//         const newUsed = (data.used || 0) + creditsUsed;
//         const newAvailable = Math.max((data.available || 0) - creditsUsed, 0);

//         t.update(serviceRef, {
//           used: newUsed,
//           available: newAvailable,
//         });
//       });

//       console.log(`✅ Deducted ${creditsUsed} credits for ${userId}`);
//     }

//     // ✅ Tell browser it can read this header
//     res.setHeader("Access-Control-Expose-Headers", "X-Credits-Used");

//     // 🔁 Forward other headers except x-credits-used
//     response.headers.forEach((value, key) => {
//       if (key.toLowerCase() !== "x-credits-used") {
//         res.setHeader(key, value);
//       }
//     });

//     response.body.pipe(res);
//   } catch (err) {
//     console.error("❌ OCR Function error:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// async function handleOcrAdvanceRequest(req, res, apiUrl, apiKey) {
//   try {
//     // 1️⃣ Verify Firebase Auth token
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ error: "Unauthorized - No token provided" });
//     }

//     const idToken = authHeader.split("Bearer ")[1];
//     let decodedToken;
//     try {
//       decodedToken = await admin.auth().verifyIdToken(idToken);
//     } catch (error) {
//       return res.status(403).json({ error: "Unauthorized - Invalid token" });
//     }

//     console.log("✅ User authenticated:", decodedToken.uid);

//     // ⭐ NEW: Check credits BEFORE making API call
//     const userId = decodedToken.uid;
//     const serviceId = "CL_SER_2"; // 👈 use a different ID for advanced OCR
//     const requiredCredits = 2; // adjust if advanced OCR costs more

//     const { allowed, available } = await checkCredits(userId, serviceId, requiredCredits);

//     if (!allowed) {
//       return res.status(402).json({
//         error: "Insufficient credits",
//         available,
//         required: requiredCredits,
//       });
//     }

//     // 2️⃣ Validate file upload
//     if (!req.rawBody || !req.headers["content-type"]) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     // 3️⃣ Prepare file for Azure API
//     const formData = new FormData();
//     formData.append("file", req.rawBody, {
//       contentType: req.headers["content-type"] || "application/pdf",
//       filename: "upload.pdf",
//     });

//     // 4️⃣ Send to Azure OCR API
//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         "x-api-key": apiKey,
//         ...formData.getHeaders(),
//       },
//       body: formData,
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       return res.status(response.status).send(errorText);
//     }

//     // ✅ Deduct credits in Firestore
//     const creditsUsed = parseInt(response.headers.get("x-credits-used") || "0", 10);
//     if (creditsUsed > 0) {
//       const creditRef = admin.firestore().collection("Credits").doc(decodedToken.uid);
//       await admin.firestore().runTransaction(async (t) => {
//         const doc = await t.get(creditRef);
//         if (!doc.exists) {
//           throw new Error("Credit document not found");
//         }
//         const current = doc.data().credits || 0;
//         if (current < creditsUsed) {
//           throw new Error("Not enough credits");
//         }
//         t.update(creditRef, { credits: current - creditsUsed });
//       });
//       console.log(`✅ Deducted ${creditsUsed} credits from user ${decodedToken.uid}`);
//     }

//     // 5️⃣ Forward result back to client
//     res.setHeader(
//       "Content-Type",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//     );

//     // ✅ Forward credits explicitly
//     if (creditsUsed) {
//       res.setHeader("x-credits-used", creditsUsed.toString());
//     }

//     // ✅ Tell browser it can read this header
//     res.setHeader("Access-Control-Expose-Headers", "X-Credits-Used");

//     // 🔁 Forward other headers except x-credits-used
//     response.headers.forEach((value, key) => {
//       if (key.toLowerCase() !== "x-credits-used") {
//         res.setHeader(key, value);
//       }
//     });

//     response.body.pipe(res);
//   } catch (err) {
//     console.error("❌ OCR Function error:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// exports.processOcrCore = functions.https.onRequest((req, res) => {
//   cors(req, res, () => handleOcrRequest(req, res, CORE_API_URL, CORE_API_KEY));
// });



// exports.processAdvanceOcr = functions.https.onRequest((req, res) => {
//   cors(req, res, () => handleOcrAdvanceRequest(req, res, ADV_API_URL, ADV_API_KEY));
// });