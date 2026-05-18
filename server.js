require("dotenv").config();

const path = require("path");
const cors = require("cors");
const express = require("express");
const admin = require("firebase-admin");

const app = express();
const port = process.env.PORT || 3000;
const platformDoc = process.env.FIREBASE_PLATFORM_DOC || "idealSchool";

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(express.static(__dirname));

let db = null;

function initFirebaseAdmin() {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = cleanPrivateKey(process.env.FIREBASE_PRIVATE_KEY);

    if (!projectId || !clientEmail || !privateKey || privateKey.includes("YOUR_PRIVATE_KEY") || clientEmail.includes("xxxxx")) {
        console.warn("Firebase Admin .env to'liq emas. Static sayt ishlaydi, API Firebasega ulanmaydi.");
        return;
    }

    try {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId,
                clientEmail,
                privateKey
            })
        });

        db = admin.firestore();
        console.log("Firebase Admin ulandi.");
    } catch (error) {
        console.warn("Firebase Admin ulanmagan. .env private keyni tekshiring:", error.message);
    }
}

initFirebaseAdmin();

app.get("/api/health", (req, res) => {
    res.json({ ok: true, firebaseAdmin: Boolean(db) });
});

app.get("/api/platform", async (req, res) => {
    if (!db) return res.status(503).json({ error: "Firebase Admin ulanmagan" });

    const snapshot = await db.collection("platform").doc(platformDoc).get();
    res.json(snapshot.exists ? snapshot.data() : {});
});

app.put("/api/platform", async (req, res) => {
    if (!db) return res.status(503).json({ error: "Firebase Admin ulanmagan" });

    await db.collection("platform").doc(platformDoc).set(req.body, { merge: false });
    res.json({ ok: true });
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
    console.log(`IDEAL SCHOOL server: http://localhost:${port}`);
});

function cleanPrivateKey(privateKey = "") {
    return privateKey
        .trim()
        .replace(/^"|"[,]?$/g, "")
        .replace(/,\s*$/g, "")
        .replace(/\\n/g, "\n");
}
