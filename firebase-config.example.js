// Firebase Console -> Project settings -> Your apps ichidagi config shu yerga qo'yiladi.
// Haqiqiy parollarni bu faylga emas, Firebase Authentication ichiga kiriting.

window.IDEAL_SCHOOL_FIREBASE_CONFIG = {
    apiKey: "YOUR_FIREBASE_WEB_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_FIREBASE_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

/*
Firestore collection nomlari:
- users: login, role, assignedClass, fullName
- students: name, className, phone, monthlyFee, dormitory, dormitoryFee
- salaryReports: month, teacherId, teacherName, workedDays, lessonHours, note, createdBy
- payments: month, className, studentId, studentName, category, method, requiredAmount, paidAmount, contactStatus, dormitory
- salaries: month, teacherId, teacherName, baseSalary, advance, bonus
- tutors: month, teacherId, teacherName, studentsCount, hours, rate, bonus
- founders: name, percent
- finance: type, title, amount, createdBy
- services: type, title, createdBy

Security Rules g'oyasi:
- admin: hammasini o'qiydi va yozadi
- superadmin: hammasini o'qiydi va yozadi
- accountant: payments, finance, students, founders bo'limlarini boshqaradi
- zauch: students, salaryReports, payments, salaries, tutors ni o'qiydi/yozadi
- teacher: faqat assignedClass bo'yicha students/payments ko'radi, payments yozadi
- staff: faqat services bo'limi
*/
