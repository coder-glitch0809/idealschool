require("dotenv").config();

const path = require("path");
const cors = require("cors");
const express = require("express");
const admin = require("firebase-admin");

const app = express();
const port = process.env.PORT || 3000;
const platformDoc = process.env.FIREBASE_PLATFORM_DOC || "idealSchool";
const archivePolicyVersion = "monthly-archive-v3-keep-active";
const dataCollections = [
    "users",
    "students",
    "schedules",
    "salaryReports",
    "payments",
    "attendance",
    "dormitoryAttendance",
    "admissions",
    "salaries",
    "tutors",
    "founders",
    "pendingExpenses",
    "libraryRecords",
    "archive",
    "deletedRecords",
    "finance",
    "services",
    "staffSalaries"
];

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use((req, res, next) => {
    const blockedPaths = [
        /^\/src(?:\/|$)/,
        /^\/scripts(?:\/|$)/,
        /^\/dist(?:\/|$)/,
        /^\/node_modules(?:\/|$)/,
        /^\/api\/.*\.js$/,
        /^\/Idealschool\.css$/,
        /^\/(?:package(?:-lock)?|tsconfig|database\.schema|firebase-config\.example)\.(?:json|md|js)$/,
        /^\/(?:server|vercel)\.js(?:on)?$/
    ];

    if (blockedPaths.some((pattern) => pattern.test(req.path))) {
        return res.status(404).send("Not found");
    }

    next();
});

app.get("/runtime", (req, res) => {
    res.type("application/javascript");
    res.sendFile(path.join(__dirname, "dist", "app.js"));
});

app.get("/skin", (req, res) => {
    res.type("text/css");
    res.sendFile(path.join(__dirname, "dist", "skin.css"));
});

app.use(express.static(__dirname, {
    dotfiles: "ignore",
    index: false
}));

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

    const ref = db.collection("platform").doc(platformDoc);
    let savedData = {};
    await db.runTransaction(async (transaction) => {
        const snapshot = await transaction.get(ref);
        const currentData = snapshot.exists ? snapshot.data() : {};
        savedData = mergePlatformStates(currentData, req.body || {});
        transaction.set(ref, savedData, { merge: false });
    });
    res.json({ ok: true, data: savedData });
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

function mergePlatformStates(remoteState = {}, incomingState = {}) {
    const merged = {
        ...remoteState,
        ...incomingState,
        settings: {
            ...(remoteState.settings || {}),
            ...(incomingState.settings || {}),
            archivePolicyVersion
        }
    };

    dataCollections.forEach((collection) => {
        merged[collection] = mergeRecords(remoteState[collection], incomingState[collection]);
    });

    removeDeletedRecords(merged);
    return merged;
}

function mergeRecords(remoteRecords = [], incomingRecords = []) {
    const recordsByKey = new Map();
    [...asArray(remoteRecords), ...asArray(incomingRecords)].forEach((record) => {
        if (!record || typeof record !== "object") return;
        recordsByKey.set(recordKey(record), record);
    });
    return [...recordsByKey.values()];
}

function recordKey(record = {}) {
    return record.id || `${record.collection || ""}:${record.archivedAt || ""}:${JSON.stringify(record)}`;
}

function asArray(nextValue) {
    return Array.isArray(nextValue) ? nextValue : [];
}

function deletedRecordKeys(nextState = {}) {
    const keysByCollection = new Map();
    const add = (collection, key) => {
        if (!collection || !key) return;
        if (!keysByCollection.has(collection)) keysByCollection.set(collection, new Set());
        keysByCollection.get(collection).add(key);
    };

    asArray(nextState.deletedRecords).forEach((entry) => {
        add(entry.collection, entry.recordKey || entry.recordId);
    });
    asArray(nextState.archive).forEach((entry) => {
        if (!isDeletionArchiveAction(entry && entry.action)) return;
        add(entry.collection, recordKey((entry && entry.data) || {}));
    });

    return keysByCollection;
}

function removeDeletedRecords(nextState = {}) {
    const keysByCollection = deletedRecordKeys(nextState);
    keysByCollection.forEach((keys, collection) => {
        if (!Array.isArray(nextState[collection]) || collection === "archive" || collection === "deletedRecords") return;
        nextState[collection] = nextState[collection].filter((item) => !keys.has(recordKey(item)));
    });
}

function isDeletionArchiveAction(action = "") {
    const normalizedAction = String(action || "").toLowerCase();
    return normalizedAction.includes("o'chirildi") ||
        normalizedAction.includes("olib tashlandi") ||
        normalizedAction.includes("rasxodlarga qo'shildi");
}
