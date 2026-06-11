const admin = require("firebase-admin");

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
    "finance",
    "services",
    "staffSalaries"
];

function getDb() {
    if (!admin.apps.length) {
        const projectId = process.env.FIREBASE_PROJECT_ID;
        const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
        const privateKey = cleanPrivateKey(process.env.FIREBASE_PRIVATE_KEY);

        if (!projectId || !clientEmail || !privateKey) {
            throw new Error("Firebase Admin environment variables are missing.");
        }

        admin.initializeApp({
            credential: admin.credential.cert({
                projectId,
                clientEmail,
                privateKey
            })
        });
    }

    return admin.firestore();
}

function cleanPrivateKey(privateKey = "") {
    return privateKey
        .trim()
        .replace(/^"|"[,]?$/g, "")
        .replace(/,\s*$/g, "")
        .replace(/\\n/g, "\n");
}

module.exports = async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(204).end();
    }

    try {
        const db = getDb();
        const ref = db.collection("platform").doc(platformDoc);

        if (req.method === "GET") {
            const snapshot = await ref.get();
            return res.status(200).json(snapshot.exists ? snapshot.data() : {});
        }

        if (req.method === "PUT") {
            let savedData = {};
            await db.runTransaction(async (transaction) => {
                const snapshot = await transaction.get(ref);
                const currentData = snapshot.exists ? snapshot.data() : {};
                savedData = mergePlatformStates(currentData, req.body || {});
                transaction.set(ref, savedData, { merge: false });
            });
            return res.status(200).json({ ok: true, data: savedData });
        }

        return res.status(405).json({ error: "Method not allowed" });
    } catch (error) {
        return res.status(500).json({
            error: "Firebase Admin API error",
            message: error.message
        });
    }
};

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
