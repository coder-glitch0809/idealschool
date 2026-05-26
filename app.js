const STORAGE_KEY = "idealSchoolPlatformData";
const THEME_KEY = "idealSchoolTheme";
const DORMITORY_FEE = 300000;
const ARCHIVE_POLICY_VERSION = "monthly-archive-v1";

const defaultUsers = [
    {
        id: "u-superadmin",
        fullName: "IDEAL SCHOOL Superadmin",
        login: "Ideal school",
        password: "idealbeshariq",
        role: "superadmin",
        assignedClass: ""
    }
];

const roleNames = {
    superadmin: "Superadmin",
    admin: "Admin",
    zauch: "Zauch",
    teacher: "O'qituvchi",
    accountant: "Bugalter",
    warehouse: "Zap xoz",
    staff: "Tex xodim"
};

const roleResponsibilities = {
    admin: "Barcha bo'limlar",
    accountant: "Moliya",
    zauch: "Zauch bo'limi",
    teacher: "O'quvchilar",
    warehouse: "Zap xoz"
};

const responsibilitySections = {
    "Barcha bo'limlar": ["dashboard", "zauchPanel", "zauch", "staff", "buses", "students", "teachers", "attendance", "admissions", "roles", "salaries", "tutors", "monthlyPayments", "expenses", "founders", "archive"],
    "Moliya": ["monthlyPayments", "expenses"],
    "Zauch bo'limi": ["zauchPanel", "zauch", "salaries", "tutors", "students", "teachers", "attendance"],
    "O'quvchilar": ["students", "teachers", "attendance"],
    "Zap xoz": ["staff", "buses"]
};

const permissions = {
    superadmin: ["students", "attendance", "admissions", "salaryReports", "roles", "teachers", "finance", "services", "payments", "salaries", "tutors", "founders"],
    admin: ["students", "attendance", "admissions", "salaryReports", "roles", "teachers", "finance", "services", "payments", "salaries", "tutors", "founders"],
    zauch: ["students", "attendance", "salaryReports", "teachers", "salaries", "tutors"],
    accountant: ["finance"],
    warehouse: ["services"],
    teacher: ["students", "attendance"],
    staff: ["services"]
};

let state = loadState();
let currentUser = null;
let activeView = "dashboard";
let firestoreDb = null;
let firebaseOnline = false;
let serverOnline = false;

const currentMonth = new Date().toISOString().slice(0, 7);
const currentDate = new Date().toISOString().slice(0, 10);
const loginScreen = document.querySelector("#loginScreen");
const platform = document.querySelector("#platform");
const loginForm = document.querySelector("#loginForm");
const loginMessage = document.querySelector("#loginMessage");
const logoutBtn = document.querySelector("#logoutBtn");
const themeToggle = document.querySelector("#themeToggle");
const sidebarPanel = document.querySelector("#sidebarPanel");
const sidebarPanelToggle = document.querySelector("#sidebarPanelToggle");
const menuToggle = document.querySelector("#menuToggle");
const sidebarBackdrop = document.querySelector("#sidebarBackdrop");
const exportSalaryReportsBtn = document.querySelector("#exportSalaryReportsBtn");
const importSalaryReportsBtn = document.querySelector("#importSalaryReportsBtn");
const salaryReportFileInput = document.querySelector("#salaryReportFileInput");
const exportTeachersBtn = document.querySelector("#exportTeachersBtn");
const importTeachersBtn = document.querySelector("#importTeachersBtn");
const teachersFileInput = document.querySelector("#teachersFileInput");
const exportStaffBtn = document.querySelector("#exportStaffBtn");
const importStaffBtn = document.querySelector("#importStaffBtn");
const staffFileInput = document.querySelector("#staffFileInput");
const exportServicesBtn = document.querySelector("#exportServicesBtn");
const importServicesBtn = document.querySelector("#importServicesBtn");
const servicesFileInput = document.querySelector("#servicesFileInput");
const editSalaryModal = document.querySelector("#editSalaryModal");
const salaryReportEditForm = document.querySelector("#salaryReportEditForm");
const closeSalaryModalBtn = document.querySelector("#closeSalaryModalBtn");
const cancelSalaryModalBtn = document.querySelector("#cancelSalaryModalBtn");
const editServiceModal = document.querySelector("#editServiceModal");
const serviceEditForm = document.querySelector("#serviceEditForm");
const closeServiceModalBtn = document.querySelector("#closeServiceModalBtn");
const cancelServiceModalBtn = document.querySelector("#cancelServiceModalBtn");
const editFinanceModal = document.querySelector("#editFinanceModal");
const financeEditForm = document.querySelector("#financeEditForm");
const closeFinanceModalBtn = document.querySelector("#closeFinanceModalBtn");
const cancelFinanceModalBtn = document.querySelector("#cancelFinanceModalBtn");

setValue("#paymentMonth", currentMonth);
setValue("#salaryMonth", currentMonth);
setValue("#tutorMonth", currentMonth);
setValue("#staffMonth", currentMonth);
setValue("#paymentDate", currentDate);
setValue("#expenseDate", currentDate);
setValue("#pendingExpenseDate", currentDate);
    setValue("#attendanceDate", currentDate);
setValue("#admissionDate", currentDate);
applyTheme(localStorage.getItem(THEME_KEY) || "light");
initFirebaseBackend();
loadStateFromServer();
setupNavigation();
setupSecurityControls();
setActiveView("dashboard");

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const login = value("#loginUsername").toLowerCase();
    const password = value("#loginPassword");
    const user = state.users.find((item) => String(item.login || "").trim().toLowerCase() === login && String(item.password || "") === password);

    if (!user) {
        loginMessage.textContent = "Login yoki parol noto'g'ri.";
        return;
    }

    currentUser = user;
    loginMessage.textContent = "";
    loginScreen.classList.add("is-hidden");
    platform.classList.remove("is-hidden");
    renderApp();
    setActiveView(activeView);
});

logoutBtn.addEventListener("click", () => {
    currentUser = null;
    platform.classList.add("is-hidden");
    loginScreen.classList.remove("is-hidden");
    loginForm.reset();
});

themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("dark-theme") ? "light" : "dark";
    applyTheme(nextTheme);
});

menuToggle.addEventListener("click", () => {
    const opened = platform.classList.toggle("sidebar-open");
    menuToggle.setAttribute("aria-expanded", String(opened));
    menuToggle.setAttribute("aria-label", opened ? "Menyuni yopish" : "Menyuni ochish");
});

sidebarBackdrop.addEventListener("click", closeSidebar);

sidebarPanelToggle.addEventListener("click", () => {
    const collapsed = sidebarPanel.classList.toggle("is-collapsed");
    sidebarPanelToggle.setAttribute("aria-expanded", String(!collapsed));
    document.querySelector("#sidebarPanelIcon").textContent = collapsed ? "⌃" : "⌄";
});

exportSalaryReportsBtn?.addEventListener("click", exportSalaryReportsToExcel);
importSalaryReportsBtn?.addEventListener("click", () => salaryReportFileInput?.click());
salaryReportFileInput?.addEventListener("change", handleSalaryReportFileInput);
exportTeachersBtn?.addEventListener("click", exportTeachersToExcel);
importTeachersBtn?.addEventListener("click", () => teachersFileInput?.click());
teachersFileInput?.addEventListener("change", handleTeachersFileInput);
exportStaffBtn?.addEventListener("click", exportStaffToExcel);
importStaffBtn?.addEventListener("click", () => staffFileInput?.click());
staffFileInput?.addEventListener("change", handleStaffFileInput);
exportServicesBtn?.addEventListener("click", exportServicesToExcel);
importServicesBtn?.addEventListener("click", () => servicesFileInput?.click());
servicesFileInput?.addEventListener("change", handleServicesFileInput);
salaryReportEditForm?.addEventListener("submit", saveSalaryReportEdit);
closeSalaryModalBtn?.addEventListener("click", closeSalaryReportModal);
cancelSalaryModalBtn?.addEventListener("click", closeSalaryReportModal);
editSalaryModal?.addEventListener("click", (event) => {
    if (event.target === editSalaryModal) closeSalaryReportModal();
});

serviceEditForm?.addEventListener("submit", saveServiceEdit);
closeServiceModalBtn?.addEventListener("click", closeServiceModal);
cancelServiceModalBtn?.addEventListener("click", closeServiceModal);
editServiceModal?.addEventListener("click", (event) => {
    if (event.target === editServiceModal) closeServiceModal();
});
financeEditForm?.addEventListener("submit", saveFinanceEdit);
closeFinanceModalBtn?.addEventListener("click", closeFinanceModal);
cancelFinanceModalBtn?.addEventListener("click", closeFinanceModal);
editFinanceModal?.addEventListener("click", (event) => {
    if (event.target === editFinanceModal) closeFinanceModal();
});

document.querySelector("#studentForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!can("students")) return;

    const className = normalizeClass(value("#studentClass"));
    if (currentUser.role === "teacher" && !assignedClasses(currentUser).includes(className)) {
        flash("#studentMessage", "Faqat o'zingizga biriktirilgan sinfga o'quvchi qo'sha olasiz.");
        return;
    }
    const dormitory = document.querySelector("#studentDormitory").checked;

    state.students.push({
        id: createId("student"),
        name: value("#studentName"),
        className,
        phone: value("#studentPhone"),
        monthlyFee: numberValue("#studentFee") || defaultMonthlyFee(className),
        dormitory,
        dormitoryFee: dormitory ? DORMITORY_FEE : 0
    });

    saveAndRender(event.target, "#studentMessage", "O'quvchi saqlandi.");
});

document.querySelector("#attendanceForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!can("attendance")) return;

    const date = value("#attendanceDate") || currentDate;
    const className = value("#attendanceClass");
    const rows = [...document.querySelectorAll("#attendanceTable tr[data-student-id]")];
    if (!className || !rows.length) {
        flash("#attendanceMessage", "Davomat uchun sinf va o'quvchilar mavjud emas.");
        return;
    }

    rows.forEach((row) => {
        const studentId = row.dataset.studentId;
        const student = state.students.find((item) => item.id === studentId);
        if (!student) return;
        const existing = state.attendance.find((item) => item.date === date && item.studentId === studentId);
        const record = {
            id: existing?.id || createId("attendance"),
            date,
            className,
            studentId,
            studentName: student.name,
            status: row.querySelector("select").value,
            teacherId: currentUser.id,
            teacherName: currentUser.fullName,
            updatedAt: new Date().toISOString()
        };
        if (existing) Object.assign(existing, record);
        else state.attendance.push(record);
    });

    archiveRecord("attendance", "Davomat saqlandi", { className, date, teacherName: currentUser.fullName });
    saveState();
    flash("#attendanceMessage", "Davomat saqlandi.");
    renderApp();
});

document.querySelector("#paymentForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!can("finance")) return;

    const student = state.students.find((item) => item.id === value("#paymentStudent"));
    if (!student) {
        flash("#paymentMessage", "Avval o'quvchi tanlang.");
        return;
    }

    state.payments.push({
        id: createId("payment"),
        month: value("#paymentMonth"),
        className: value("#paymentClass"),
        studentId: student.id,
        studentName: student.name,
        phone: student.phone,
        category: value("#paymentCategory"),
        method: value("#paymentMethod"),
        note: value("#paymentNote"),
        paymentDate: value("#paymentDate") || currentDate,
        dormitory: Boolean(student.dormitory),
        requiredAmount: numberValue("#paymentRequired"),
        paidAmount: numberValue("#paymentPaid"),
        contactStatus: value("#paymentContact"),
        cashierId: currentUser.id,
        cashierName: currentUser.fullName,
        createdAt: new Date().toISOString()
    });

    saveAndRender(event.target, "#paymentMessage", "To'lov saqlandi.");
    setValue("#paymentMonth", currentMonth);
    setValue("#paymentDate", currentDate);
});

document.querySelector("#salaryReportForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!can("salaryReports")) return;

    const salary = salaryReportTotals({
        salaryAmount: numberValue("#salaryReportSalary"),
        advance: numberValue("#salaryReportAdvance")
    });

    state.salaryReports.push({
        id: createId("salaryReport"),
        month: currentMonth,
        teacherId: "",
        teacherName: value("#salaryReportFullName"),
        position: value("#salaryReportPosition"),
        subject: value("#salaryReportPosition"),
        className: normalizeClass(value("#salaryReportClass")),
        salaryAmount: numberValue("#salaryReportSalary"),
        advance: numberValue("#salaryReportAdvance"),
        loan: numberValue("#salaryReportLoan"),
        advanceType: value("#salaryReportAdvanceType"),
        paymentTarget: "",
        bankCard: "",
        calculatedSalary: salary.total,
        remainingSalary: salary.remaining,
        createdBy: currentUser.fullName
    });

    saveAndRender(event.target, "#salaryReportMessage", "Oylik hisobot topshirildi.");
});

document.querySelector("#teacherForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!can("teachers")) return;

    const login = value("#teacherLogin");
    if (state.users.some((user) => user.login.toLowerCase() === login.toLowerCase())) {
        flash("#teacherMessage", "Bu login oldin kiritilgan.");
        return;
    }

    state.users.push({
        id: createId("user"),
        fullName: value("#teacherFullName"),
        login,
        password: value("#teacherPassword"),
        role: "teacher",
        subject: value("#teacherSubject"),
        assignedClass: normalizeAssignedClasses(value("#teacherClass"))
    });

    saveAndRender(event.target, "#teacherMessage", "O'qituvchi saqlandi.");
});

document.querySelector("#userForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!can("roles")) return;

    const login = value("#userLogin");
    const role = value("#userRole");
    const allowedAssignableRoles = ["admin", "accountant", "zauch", "teacher", "warehouse"];
    if (!allowedAssignableRoles.includes(role)) {
        flash("#userMessage", "Faqat admin, bugalter, zauch, o'qituvchi va zap xoz rollari beriladi.");
        return;
    }
    if (state.users.some((user) => String(user.login || "").toLowerCase() === login.toLowerCase())) {
        flash("#userMessage", "Bu login oldin kiritilgan.");
        return;
    }

    state.users.push({
        id: createId("user"),
        fullName: value("#userFullName"),
        login,
        password: value("#userPassword"),
        role,
        responsibility: roleResponsibilities[role] || value("#userResponsibility"),
        assignedClass: normalizeAssignedClasses(value("#userClass"))
    });

    saveAndRender(event.target, "#userMessage", "Rol saqlandi.");
});

document.querySelector("#salaryForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!can("salaries")) return;

    const teacher = state.users.find((user) => user.id === value("#salaryTeacher"));
    state.salaries.push({
        id: createId("salary"),
        month: value("#salaryMonth"),
        teacherId: teacher ? teacher.id : "",
        teacherName: teacher ? teacher.fullName : "",
        baseSalary: numberValue("#salaryBase"),
        advance: numberValue("#salaryAdvance"),
        bonus: numberValue("#salaryBonus"),
        createdBy: currentUser.fullName
    });

    saveAndRender(event.target);
    setValue("#salaryMonth", currentMonth);
});

document.querySelector("#tutorForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!can("tutors")) return;

    const teacher = state.users.find((user) => user.id === value("#tutorTeacher"));
    state.tutors.push({
        id: createId("tutor"),
        month: value("#tutorMonth"),
        teacherId: teacher ? teacher.id : "",
        teacherName: teacher ? teacher.fullName : "",
        studentsCount: numberValue("#tutorStudents"),
        hours: numberValue("#tutorHours"),
        rate: numberValue("#tutorRate"),
        bonus: numberValue("#tutorBonus"),
        createdBy: currentUser.fullName
    });

    saveAndRender(event.target);
    setValue("#tutorMonth", currentMonth);
});

document.querySelector("#financeForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!can("finance")) return;

    const isSalaryAdvance = document.querySelector("#expenseSalaryCheckbox")?.checked || false;
    const recipientId = isSalaryAdvance && document.querySelector("#expenseRecipient") ? value("#expenseRecipient") : "";
    const teacher = recipientId ? state.users.find((user) => user.id === recipientId && user.role === "teacher") : null;
    const founder = recipientId ? state.founders.find((item) => item.id === recipientId) : null;
    const expenseTypeResolved = isSalaryAdvance ? "Oldindan avans" : (value("#expenseType") || "Rasxod");

    const amount = numberValue("#financeAmount");
    state.finance.push({
        id: createId("finance"),
        type: "Rasxod",
        expenseType: expenseTypeResolved,
        recipientId: recipientId,
        salaryAdvance: isSalaryAdvance,
        recipientName: teacher?.fullName || founder?.name || "",
        recipientType: teacher ? "teacher" : founder ? "founder" : "",
        method: value("#expenseMethod"),
        title: value("#financeTitle"),
        quantity: value("#expenseQuantity"),
        amount,
        expenseDate: value("#expenseDate") || currentDate,
        createdBy: currentUser.fullName,
        createdAt: new Date().toISOString()
    });

    if (isSalaryAdvance && teacher) {
        state.salaryReports.push({
            id: createId("salaryReport"),
            month: currentMonth,
            teacherId: teacher.id,
            teacherName: teacher.fullName,
            position: teacher.subject || "O'qituvchi",
            subject: teacher.subject || "O'qituvchi",
            className: teacher.assignedClass || "",
            salaryAmount: 0,
            advance: amount,
            loan: 0,
            advanceType: value("#expenseMethod"),
            paymentTarget: "Oldindan avans",
            bankCard: "",
            calculatedSalary: 0,
            remainingSalary: 0,
            createdBy: currentUser.fullName
        });
    }

    if (isSalaryAdvance && founder) {
        archiveRecord("founders", "Ta'sischiga avans berildi", {
            name: founder.name,
            amount,
            method: value("#expenseMethod")
        });
    }

    saveAndRender(event.target, "#expenseMessage", "Rasxod saqlandi.");
    setValue("#expenseDate", currentDate);
    setValue("#expenseType", "");
    document.querySelector("#expenseSalaryCheckbox").checked = false;
    toggleExpenseSalaryFields();
});

document.querySelector("#pendingExpenseForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!can("finance")) return;

    state.pendingExpenses.push({
        id: createId("pendingExpense"),
        recipientName: value("#pendingExpenseRecipient"),
        title: value("#pendingExpenseTitle"),
        amount: numberValue("#pendingExpenseAmount"),
        method: value("#pendingExpenseMethod"),
        expenseDate: value("#pendingExpenseDate") || currentDate,
        createdById: currentUser.id,
        createdBy: currentUser.fullName,
        createdAt: new Date().toISOString()
    });

    saveAndRender(event.target, "#pendingExpenseMessage", "Rasxod superadmin eslatmasiga yuborildi.");
    setValue("#pendingExpenseDate", currentDate);
});

document.querySelector("#feeSettingsForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!can("finance")) return;

    state.settings.smallClassFee = numberValue("#smallClassFee");
    state.settings.bigClassFee = numberValue("#bigClassFee");

    saveAndRender(null, "#feeSettingsMessage", "Summalar saqlandi.");
});

document.querySelector("#founderForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!can("founders")) return;

    const percent = numberValue("#founderPercent");
    const usedPercent = state.founders.reduce((total, founder) => total + Number(founder.percent || 0), 0);
    if (usedPercent + percent > 100) {
        flash("#founderMessage", `Ta'sischilar ulushi 100% dan oshmasligi kerak. Qoldiq: ${100 - usedPercent}%.`);
        return;
    }

    state.founders.push({
        id: createId("founder"),
        name: value("#founderName"),
        percent
    });

    saveAndRender(event.target);
    setValue("#serviceJob", "haydovchi");
});

document.querySelector("#admissionForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!can("admissions")) return;

    state.admissions.push({
        id: createId("admission"),
        schoolYear: "2026/2027",
        studentName: value("#admissionStudentName"),
        className: normalizeClass(value("#admissionClassName")),
        phone: value("#admissionPhone"),
        status: value("#admissionStatus"),
        admissionDate: value("#admissionDate") || currentDate,
        note: value("#admissionNote"),
        createdBy: currentUser.fullName
    });
    archiveRecord("admissions", "Qabul ma'lumoti qo'shildi", state.admissions[state.admissions.length - 1]);
    saveAndRender(event.target, "#admissionMessage", "Qabul ma'lumoti saqlandi.");
    setValue("#admissionDate", currentDate);
});

document.querySelector("#serviceForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!can("services")) return;

    state.services.push({
        id: createId("service"),
        type: "Avtobus",
        driverName: value("#serviceDriverName"),
        job: value("#serviceJob") || "haydovchi",
        salary: numberValue("#serviceSalary"),
        advance: numberValue("#serviceAdvance"),
        advanceType: value("#serviceAdvanceType"),
        createdBy: currentUser.fullName
    });

    saveAndRender(event.target);
});

document.querySelector("#staffSalaryForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!can("services")) return;

    state.staffSalaries.push({
        id: createId("staffSalary"),
        name: value("#staffName"),
        job: value("#staffJob"),
        month: value("#staffMonth"),
        salary: numberValue("#staffSalary"),
        fine: numberValue("#staffFine"),
        advance: numberValue("#staffAdvance"),
        advanceType: value("#staffAdvanceType"),
        createdBy: currentUser.fullName
    });

    saveAndRender(event.target, "#staffSalaryMessage", "Tex xodim oyligi saqlandi.");
    setValue("#staffMonth", currentMonth);
});

document.querySelector("#paymentClass")?.addEventListener("change", () => {
    renderPaymentStudentOptions();
    fillRequiredPayment();
});
document.querySelector("#paymentStudent")?.addEventListener("change", fillRequiredPayment);
document.querySelector("#paymentCategory")?.addEventListener("change", fillRequiredPayment);
document.querySelector("#dormitoryPaymentButton")?.addEventListener("click", () => {
    setValue("#paymentCategory", "Yotoqxona");
    fillRequiredPayment();
    setValue("#paymentPaid", numberValue("#paymentPaid") + DORMITORY_FEE);
});
document.querySelector("#financeClassFilter")?.addEventListener("change", renderFinancePaymentsTable);
document.querySelector("#studentClassFilter")?.addEventListener("change", renderStudentByClassSection);
document.querySelector("#attendanceClass")?.addEventListener("change", renderAttendance);
document.querySelector("#attendanceDate")?.addEventListener("change", renderAttendance);
document.querySelector("#userRole")?.addEventListener("change", renderRoleResponsibilityOptions);
document.querySelector("#expenseSalaryCheckbox")?.addEventListener("change", toggleExpenseSalaryFields);
document.querySelector("#advanceExpenseButton")?.addEventListener("click", () => {
    const checkbox = document.querySelector("#expenseSalaryCheckbox");
    if (checkbox) checkbox.checked = true;
    setValue("#expenseType", "Oldindan avans");
    toggleExpenseSalaryFields();
});
[
    "#salaryReportSalary",
    "#salaryReportAdvance",
    "#salaryReportAdvanceType"
].forEach((selector) => document.querySelector(selector)?.addEventListener("input", renderSalaryReportSummary));

function renderApp() {
    const stats = calculateStats();
    const roleText = currentUser ? roleNames[currentUser.role] || currentUser.role : "Guest";

    document.querySelector("#welcomeTitle").textContent = `${roleText} dashboard`;
    document.querySelector("#roleChip").textContent = roleText;
    document.querySelector("#sidebarRole").textContent = roleText;
    document.querySelector("#sidebarUser").textContent = currentUser.assignedClass
        ? `${currentUser.fullName} - ${currentUser.assignedClass} sinf`
        : currentUser.fullName;

    document.querySelector("#studentCount").textContent = state.students.length;
    document.querySelector("#teacherCount").textContent = teachers().length;
    document.querySelector("#incomeCount").textContent = shortMoney(stats.income);
    document.querySelector("#debtCount").textContent = shortMoney(stats.debt);
    const attendanceTotals = todayAttendanceTotals();
    document.querySelector("#presentCount").textContent = attendanceTotals.present;
    document.querySelector("#absentCount").textContent = attendanceTotals.absent;
    document.querySelector("#excusedAbsentCount").textContent = attendanceTotals.excused;
    document.querySelector("#assignedClassBadge").textContent = currentUser.assignedClass || "Barcha sinflar";
    if (currentUser.role === "teacher") {
        setValue("#studentClass", assignedClasses(currentUser)[0] || "");
    }

    applyPermissions();
    renderTeacherOptions();
    renderPaymentClassOptions();
    renderExpenseRecipientOptions();
    renderRoleResponsibilityOptions();
    renderFinanceClassFilter();
    renderPaymentStudentOptions();
    fillRequiredPayment();
    renderPayments();
    renderStudents();
    renderStudentClassFilter();
    renderStudentByClassSection();
    renderAttendanceClassOptions();
    renderAttendance();
    renderAdmissions();
    renderSalaryReports();
    renderSalaryReportSummary();
    renderTeacherSalarySheets();
    renderTeacherFinance();
    renderUsers();
    renderZauchPanel();
    renderSalaries();
    renderTutors();
    renderFinance();
    renderPendingExpenses();
    renderExpenseReminders();
    renderAttendanceReminders();
    renderDashboardMonitoring();
    renderFinancePaymentsTable();
    renderFounders();
    renderServices();
    renderStaffSalaries();
    renderFeeSettings();
    renderArchive();
    setActiveView(activeView);
}

function renderExpenseTypeOptions() {
    const select = document.querySelector("#expenseType");
    if (!select) return;
    const favorites = (state.settings && state.settings.favoriteExpenseTypes) || [];
    // base options
    const base = ["Oylik", "Kommunal", "Ijara", "Transport", "Oziq-ovqat", "Ta'mirlash", "Boshqa"];
    select.innerHTML = "";
    base.forEach((opt) => {
        const el = document.createElement("option");
        el.value = opt;
        el.textContent = opt;
        select.append(el);
    });
    if (favorites && favorites.length) {
        const sep = document.createElement("option");
        sep.disabled = true;
        sep.textContent = "— Saqlangan turlar —";
        select.append(sep);
        favorites.forEach((opt) => {
            const el = document.createElement("option");
            el.value = opt;
            el.textContent = opt;
            select.append(el);
        });
    }
    select.value = select.querySelector("option[value='Oylik']") ? "Oylik" : select.options[0].value;
}

document.querySelector("#expenseType")?.addEventListener("change", () => {
    toggleExpenseSalaryFields();
});

function renderExpenseRecipientOptions() {
    const select = document.querySelector('#expenseRecipient');
    if (!select) return;
    select.innerHTML = '';
    const teacherGroup = document.createElement("optgroup");
    teacherGroup.label = "O'qituvchilar";
    const users = state.users.filter(u => u.role === 'teacher');
    users.forEach((u) => {
        const opt = document.createElement('option');
        opt.value = u.id;
        opt.textContent = u.fullName + (u.assignedClass ? ` — ${u.assignedClass}` : '');
        teacherGroup.append(opt);
    });
    select.append(teacherGroup);
    const founderGroup = document.createElement("optgroup");
    founderGroup.label = "Ta'sischilar";
    state.founders.forEach((founder) => founderGroup.append(new Option(founder.name, founder.id)));
    select.append(founderGroup);
    toggleExpenseSalaryFields();
}

function toggleExpenseSalaryFields() {
    const checked = document.querySelector("#expenseSalaryCheckbox")?.checked || false;
    const recipientWrap = document.querySelector("#expenseRecipientWrap");
    if (recipientWrap) recipientWrap.classList.toggle("visually-hidden", !checked);
    if (checked) setValue("#expenseType", "Oldindan avans");
}

function setupNavigation() {
    document.querySelectorAll(".main-nav a").forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const viewName = link.getAttribute("href").replace("#", "");
            setActiveView(viewName);
        });
    });
}

function setActiveView(viewName) {
    activeView = viewName || "dashboard";
    document.querySelectorAll(".main-nav a").forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${activeView}`);
    });

    document.querySelectorAll(".app-view").forEach((view) => {
        view.classList.toggle("is-active-view", view.dataset.view === activeView);
    });

    document.querySelectorAll(".view-group").forEach((group) => {
        const hasActiveChild = Boolean(group.querySelector(".app-view.is-active-view"));
        group.classList.toggle("group-hidden", !hasActiveChild);
    });

    const activeElement = document.querySelector(`[data-view="${activeView}"]`);
    if (activeElement && platform && !platform.classList.contains("is-hidden")) {
        activeElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    closeSidebar();
}

function applyPermissions() {
    toggleForm("#studentForm", can("students"));
    toggleForm("#attendanceForm", can("attendance"));
    toggleForm("#admissionForm", can("admissions"));
    toggleForm("#paymentForm", can("finance"));
    toggleForm("#salaryReportForm", can("salaryReports"));
    toggleForm("#teacherForm", can("teachers"));
    toggleForm("#userForm", can("roles"));
    toggleForm("#salaryForm", can("salaries"));
    toggleForm("#tutorForm", can("tutors"));
    toggleForm("#financeForm", can("finance"));
    toggleForm("#pendingExpenseForm", can("finance"));
    toggleForm("#founderForm", can("founders"));
    toggleForm("#serviceForm", can("services"));
    toggleForm("#staffSalaryForm", can("services"));

    const sectionIds = ["students", "attendance", "admissions", "payments", "zauch", "zauchPanel", "teachers", "roles", "salaries", "tutors", "monthlyPayments", "expenses", "founders", "staff", "buses", "archive"];
    sectionIds.forEach((id) => {
        const element = document.querySelector(`#${id}`);
        if (!element) return;
        const allowed = canViewSection(id);
        element.classList.toggle("locked", !allowed);
        element.classList.toggle("is-hidden", !allowed);
    });

    document.querySelectorAll(".main-nav a").forEach((link) => {
        const id = link.getAttribute("href").replace("#", "");
        const allowed = canViewSection(id);
        link.classList.toggle("is-hidden", !allowed);
    });

    if (!canViewSection(activeView)) {
        setActiveView(firstAllowedView());
    }
}

function renderTeacherOptions() {
    ["#salaryTeacher", "#tutorTeacher"].forEach((selector) => {
        const select = document.querySelector(selector);
        if (!select) return;
        select.innerHTML = "";
        teachers().forEach((teacher) => {
            const subject = teacher.subject ? ` - ${teacher.subject}` : "";
            select.append(new Option(`${teacher.fullName}${subject} (${teacher.assignedClass || "sinf yo'q"})`, teacher.id));
        });
    });
}

function renderPaymentClassOptions() {
    const select = document.querySelector("#paymentClass");
    const visibleClasses = visibleClassNames();
    const previous = select.value;
    select.innerHTML = "";
    visibleClasses.forEach((className) => select.append(new Option(className, className)));
    if (visibleClasses.includes(previous)) select.value = previous;
}

function renderRoleResponsibilityOptions() {
    const roleSelect = document.querySelector("#userRole");
    const responsibilitySelect = document.querySelector("#userResponsibility");
    if (!roleSelect || !responsibilitySelect) return;
    const role = roleSelect.value || "accountant";
    responsibilitySelect.innerHTML = "";
    responsibilitySelect.append(new Option(roleResponsibilities[role] || "Bo'lim tanlanmagan", roleResponsibilities[role] || ""));
}

function renderFinanceClassFilter() {
    const select = document.querySelector("#financeClassFilter");
    const previous = select.value;
    select.innerHTML = "";
    select.append(new Option("Barcha sinflar", "all"));
    visibleClassNames().forEach((className) => select.append(new Option(className, className)));
    if ([...select.options].some((option) => option.value === previous)) {
        select.value = previous;
    }
}

function renderPaymentStudentOptions() {
    const className = value("#paymentClass");
    const select = document.querySelector("#paymentStudent");
    const previous = select.value;
    select.innerHTML = "";
    getVisibleStudents()
        .filter((student) => student.className === className)
        .forEach((student) => select.append(new Option(student.name, student.id)));
    if ([...select.options].some((option) => option.value === previous)) select.value = previous;
}

function fillRequiredPayment() {
    const student = state.students.find((item) => item.id === value("#paymentStudent"));
    if (student) {
        const amount = value("#paymentCategory") === "Yotoqxona"
            ? (student.dormitoryFee || DORMITORY_FEE)
            : (student.monthlyFee || defaultMonthlyFee(student.className));
        setValue("#paymentRequired", amount || 0);
    }
}

function renderPayments() {
    const list = document.querySelector("#paymentList");
    list.innerHTML = "";
    getVisiblePayments().slice().reverse().forEach((item) => {
        const debt = Math.max(item.requiredAmount - item.paidAmount, 0);
        list.append(recordItem({
            title: `${item.studentName} - ${debt ? "Qarzdor" : "To'langan"}`,
            meta: `${item.className} | ${item.month} | ${item.category || "O'qish to'lovi"} | Qolgan: ${formatMoney(debt)} so'm`,
            note: `${item.method || "Naqd pul"} | ${item.phone || "Telefon yo'q"} | ${item.contactStatus}`,
            id: item.id,
            collection: "payments"
        }));
    });
}

function renderStudents() {
    const table = document.querySelector("#studentList");
    table.innerHTML = "";
    getVisibleStudents().forEach((student) => {
        const status = studentPaymentStatus(student);
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${escapeHtml(student.name)}</td>
            <td>${escapeHtml(student.className || "-")}</td>
            <td>${escapeHtml(student.phone || "-")}</td>
            <td>${formatMoney((student.monthlyFee || 0) + (student.dormitory ? (student.dormitoryFee || DORMITORY_FEE) : 0))} so'm</td>
            <td>${formatMoney(status.paid)} so'm</td>
            <td>${formatMoney(status.debt)} so'm</td>
            <td>${student.dormitory ? `${formatMoney(student.dormitoryFee || DORMITORY_FEE)} so'm` : "Yo'q"}</td>
            <td></td>
        `;
        appendTableActions(row, "students", student.id);
        table.append(row);
    });
    updateTableWrapVisibility(table);
}

function renderSalaryReports() {
    const table = document.querySelector("#salaryReportList");
    table.innerHTML = "";
    getVisibleSalaryReports().slice().reverse().forEach((item, index) => {
        const totals = salaryReportTotals(item);
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${escapeHtml(item.teacherName || "-")}</td>
            <td>${escapeHtml(item.position || item.subject || "-")}</td>
            <td>${escapeHtml(item.className || "-")}</td>
            <td>${formatMoney(totals.total)} so'm</td>
            <td>${formatMoney(item.advance || 0)} so'm</td>
            <td>${formatMoney(item.loan || 0)} so'm</td>
            <td>${escapeHtml(item.advanceType || "Bank orqali")}</td>
            <td>${formatMoney(totals.remaining)} so'm</td>
            <td></td>
        `;
        appendTableActions(row, "salaryReports", item.id);
        table.append(row);
    });
    updateTableWrapVisibility(table);
}

function openSalaryReportEditModal(id) {
    const report = state.salaryReports.find((item) => item.id === id);
    if (!report) return;

    setValue("#salaryReportEditId", report.id);
    setValue("#salaryReportEditFullName", report.teacherName || "");
    setValue("#salaryReportEditPosition", report.position || report.subject || "");
    setValue("#salaryReportEditClass", report.className || "");
    setValue("#salaryReportEditSalary", report.salaryAmount || report.calculatedSalary || 0);
    setValue("#salaryReportEditAdvance", report.advance || 0);
    setValue("#salaryReportEditAdvanceType", report.advanceType || "Bank orqali");
    setValue("#salaryReportEditPaymentTarget", report.paymentTarget || "");
    setValue("#salaryReportEditBankCard", report.bankCard || "");

    editSalaryModal.classList.remove("is-hidden");
}

function closeSalaryReportModal() {
    if (!editSalaryModal) return;
    editSalaryModal.classList.add("is-hidden");
}

function saveSalaryReportEdit(event) {
    event.preventDefault();
    const id = value("#salaryReportEditId");
    const report = state.salaryReports.find((item) => item.id === id);
    if (!report) return;

    report.teacherName = value("#salaryReportEditFullName");
    report.position = value("#salaryReportEditPosition");
    report.subject = report.position;
    report.className = normalizeClass(value("#salaryReportEditClass"));
    report.salaryAmount = numberValue("#salaryReportEditSalary");
    report.advance = numberValue("#salaryReportEditAdvance");
    report.advanceType = value("#salaryReportEditAdvanceType");
    report.paymentTarget = value("#salaryReportEditPaymentTarget");
    report.bankCard = value("#salaryReportEditBankCard");
    report.loan = numberValue("#salaryReportEditLoan");

    const totals = salaryReportTotals(report);
    report.calculatedSalary = totals.total;
    report.remainingSalary = totals.remaining;

    saveAndRender(event.target, "#salaryReportMessage", "Hisobot yangilandi.");
    closeSalaryReportModal();
}

function openServiceEditModal(id) {
    const service = state.services.find((item) => item.id === id);
    if (!service) return;

    setValue("#serviceEditId", service.id);
    setValue("#serviceEditDriverName", service.driverName || service.title || "");
    setValue("#serviceEditJob", service.job || "");
    setValue("#serviceEditSalary", service.salary || 0);
    setValue("#serviceEditAdvance", service.advance || 0);
    setValue("#serviceEditAdvanceType", service.advanceType || "Naqd pul");

    editServiceModal.classList.remove("is-hidden");
}

function closeServiceModal() {
    if (!editServiceModal) return;
    editServiceModal.classList.add("is-hidden");
}

function saveServiceEdit(event) {
    event.preventDefault();
    const id = value("#serviceEditId");
    const service = state.services.find((item) => item.id === id);
    if (!service) return;

    service.driverName = value("#serviceEditDriverName");
    service.title = service.driverName;
    service.job = value("#serviceEditJob");
    service.salary = numberValue("#serviceEditSalary");
    service.advance = numberValue("#serviceEditAdvance");
    service.advanceType = value("#serviceEditAdvanceType");

    saveState();
    renderApp();
    closeServiceModal();
}

function openFinanceEditModal(id) {
    const item = state.finance.find((entry) => entry.id === id);
    if (!item) return;

    setValue("#financeEditId", item.id);
    setValue("#financeEditExpenseType", item.expenseType || "");
    setValue("#financeEditMethod", item.method || "Naqd pul");
    setValue("#financeEditTitle", item.title || "");
    setValue("#financeEditQuantity", item.quantity || "");
    setValue("#financeEditAmount", item.amount || 0);
    setValue("#financeEditDate", item.expenseDate || formatDate(item.createdAt) || currentDate);

    editFinanceModal?.classList.remove("is-hidden");
}

function closeFinanceModal() {
    if (!editFinanceModal) return;
    editFinanceModal.classList.add("is-hidden");
}

function saveFinanceEdit(event) {
    event.preventDefault();
    const id = value("#financeEditId");
    const item = state.finance.find((entry) => entry.id === id);
    if (!item) return;

    item.expenseType = value("#financeEditExpenseType") || "Rasxod";
    item.method = value("#financeEditMethod");
    item.title = value("#financeEditTitle");
    item.quantity = value("#financeEditQuantity");
    item.amount = numberValue("#financeEditAmount");
    item.expenseDate = value("#financeEditDate") || currentDate;

    saveState();
    renderApp();
    closeFinanceModal();
}

function handleSalaryReportFileInput(event) {
    const file = event.target.files[0];
    if (!file) return;
    importSalaryReportsFromFile(file);
    event.target.value = "";
}

function exportSalaryReportsToExcel() {
    if (!window.XLSX) {
        flash("#salaryReportMessage", "Excel kutubxonasi yuklanmadi.");
        return;
    }

    const rows = state.salaryReports.map((item, index) => ({
        No: index + 1,
        "Ismi sharfi": item.teacherName || "",
        "Lavozimi": item.position || item.subject || "",
        "Sinf": item.className || "",
        "Jami oylik": item.salaryAmount || item.calculatedSalary || 0,
        "Avans": item.advance || 0,
        "Qarz": item.loan || 0,
        "Avans turi": item.advanceType || "Bank orqali",
        "Beriladi": salaryReportTotals(item).remaining
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(workbook, worksheet, "OylikHisobot");
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "salary_reports.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}

function importSalaryReportsFromFile(file) {
    if (!window.XLSX) {
        flash("#salaryReportMessage", "Excel kutubxonasi yuklanmadi.");
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const importedRows = XLSX.utils.sheet_to_json(sheet, { defval: "" });
            const reports = importedRows.map((row) => ({
                id: createId("salaryReport"),
                month: row.Oy || currentMonth,
                teacherId: "",
                teacherName: String(row["Ismi sharfi"] || row["F.I.Sh"] || "").trim(),
                position: String(row["Lavozimi"] || row["Lavozimi"] || "").trim(),
                subject: String(row["Lavozimi"] || "").trim(),
                className: normalizeClass(String(row["Sinf"] || "")),
                salaryAmount: Number(row["Jami oylik"] || row["Jami oylik maoshi"] || 0),
                advance: Number(row["Avans"] || 0),
                loan: Number(row["Qarz"] || row["Qarz"] || 0),
                advanceType: String(row["Avans turi"] || row["Avans turi"] || "Bank orqali").trim(),
                paymentTarget: String(row["To'lov manzili"] || "").trim(),
                bankCard: String(row["Bank kartasi"] || "").trim(),
                calculatedSalary: 0,
                remainingSalary: 0,
                createdBy: currentUser?.fullName || ""
            })).filter((item) => item.teacherName);

            reports.forEach((report) => {
                const totals = salaryReportTotals(report);
                report.calculatedSalary = totals.total;
                report.remainingSalary = totals.remaining;
                state.salaryReports.push(report);
            });

            saveAndRender(null, "#salaryReportMessage", `${reports.length} ta hisobot import qilindi.`);
        } catch (error) {
            flash("#salaryReportMessage", "Excel faylni o'qishda xatolik yuz berdi.");
        }
    };
    reader.readAsArrayBuffer(file);
}

function handleTeachersFileInput(event) {
    const file = event.target.files[0];
    if (file) importTeachersFromFile(file);
    event.target.value = "";
}

function handleStaffFileInput(event) {
    const file = event.target.files[0];
    if (file) importStaffFromFile(file);
    event.target.value = "";
}

function handleServicesFileInput(event) {
    const file = event.target.files[0];
    if (file) importServicesFromFile(file);
    event.target.value = "";
}

function exportTeachersToExcel() {
    if (!can("roles")) return;
    const rows = teachers().map((teacher, index) => ({
        No: index + 1,
        "F.I.Sh": teacher.fullName || "",
        Login: teacher.login || "",
        Parol: teacher.password || "",
        Fan: teacher.subject || "",
        "Biriktirilgan sinflar": teacher.assignedClass || ""
    }));
    exportExcelRows(rows, "Oqituvchilar", "oqituvchilar.xlsx", "#userMessage");
}

function importTeachersFromFile(file) {
    if (!can("roles")) return;
    readExcelRows(file, "#userMessage", (rows) => {
        let skipped = 0;
        const imported = [];
        rows.forEach((row) => {
            const fullName = excelCell(row, ["F.I.Sh", "FISH", "Ismi sharfi", "O'qituvchi", "Ustoz"]);
            if (!fullName) return;
            const suppliedLogin = excelCell(row, ["Login"]);
            const duplicate = suppliedLogin && state.users.some((user) =>
                String(user.login || "").toLowerCase() === suppliedLogin.toLowerCase()
            );
            if (duplicate) {
                skipped += 1;
                return;
            }
            const teacher = {
                id: createId("user"),
                fullName,
                login: suppliedLogin || nextAvailableLogin(fullName),
                password: excelCell(row, ["Parol"]) || "teacher123",
                role: "teacher",
                responsibility: roleResponsibilities.teacher,
                subject: excelCell(row, ["Fan", "Lavozimi"]),
                assignedClass: normalizeAssignedClasses(excelCell(row, ["Biriktirilgan sinflar", "Sinflar", "Sinf"]))
            };
            state.users.push(teacher);
            imported.push(teacher);
        });
        imported.forEach((teacher) => archiveRecord("users", "Exceldan o'qituvchi import qilindi", teacher));
        saveState();
        renderApp();
        const suffix = skipped ? ` ${skipped} ta takror login o'tkazilmadi.` : "";
        flash("#userMessage", `${imported.length} ta o'qituvchi import qilindi.${suffix}`);
    });
}

function exportStaffToExcel() {
    if (!can("services")) return;
    const rows = state.staffSalaries.map((item, index) => ({
        No: index + 1,
        "F.I.Sh": item.name || "",
        Lavozimi: item.job || "",
        Oy: item.month || "",
        "Jami oylik": Number(item.salary || 0),
        Jarima: Number(item.fine || 0),
        Avans: staffSalaryTotals(item).advanceTotal,
        "Avans turi": item.advanceType || "Bank orqali"
    }));
    exportExcelRows(rows, "TexXodimlar", "tex_xodimlar.xlsx", "#staffSalaryMessage");
}

function importStaffFromFile(file) {
    if (!can("services")) return;
    readExcelRows(file, "#staffSalaryMessage", (rows) => {
        const imported = rows.map((row) => ({
            id: createId("staffSalary"),
            name: excelCell(row, ["F.I.Sh", "FISH", "Ismi sharfi", "Tex xodim"]),
            job: excelCell(row, ["Lavozimi", "Ishi"]) || "Tex xodim",
            month: excelCell(row, ["Oy"]) || currentMonth,
            salary: excelNumber(row, ["Jami oylik", "Oylik"]),
            fine: excelNumber(row, ["Jarima"]),
            advance: excelNumber(row, ["Avans", "Berilgan avans"]),
            advanceType: normalizeAdvanceType(excelCell(row, ["Avans turi"]) || "Bank orqali"),
            createdBy: currentUser.fullName
        })).filter((item) => item.name);
        imported.forEach((item) => {
            state.staffSalaries.push(item);
            archiveRecord("staffSalaries", "Exceldan tex xodim import qilindi", item);
        });
        saveState();
        renderApp();
        flash("#staffSalaryMessage", `${imported.length} ta tex xodim import qilindi.`);
    });
}

function exportServicesToExcel() {
    if (!can("services")) return;
    const rows = state.services.filter((item) => item.type === "Avtobus").map((item, index) => ({
        No: index + 1,
        "F.I.Sh": item.driverName || item.title || "",
        Lavozimi: item.job || "haydovchi",
        Oylik: Number(item.salary || 0),
        Avans: Number(item.advance || 0),
        "Avans turi": item.advanceType || "Naqd pul"
    }));
    exportExcelRows(rows, "AvtobusXizmati", "avtobus_xizmati.xlsx", "#serviceMessage");
}

function importServicesFromFile(file) {
    if (!can("services")) return;
    readExcelRows(file, "#serviceMessage", (rows) => {
        const imported = rows.map((row) => ({
            id: createId("service"),
            type: "Avtobus",
            driverName: excelCell(row, ["F.I.Sh", "FISH", "Ismi sharfi", "Avtobuschi"]),
            job: excelCell(row, ["Lavozimi", "Ishi"]) || "haydovchi",
            salary: excelNumber(row, ["Oylik", "Beriladigan oylik"]),
            advance: excelNumber(row, ["Avans", "Berilgan avans"]),
            advanceType: normalizeServiceAdvanceType(excelCell(row, ["Avans turi"]) || "Naqd pul"),
            createdBy: currentUser.fullName
        })).filter((item) => item.driverName);
        imported.forEach((item) => {
            state.services.push(item);
            archiveRecord("services", "Exceldan avtobuschi import qilindi", item);
        });
        saveState();
        renderApp();
        flash("#serviceMessage", `${imported.length} ta avtobuschi import qilindi.`);
    });
}

function exportExcelRows(rows, sheetName, fileName, messageSelector) {
    if (!window.XLSX) {
        flash(messageSelector, "Excel kutubxonasi yuklanmadi.");
        return;
    }
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, fileName);
}

function readExcelRows(file, messageSelector, onLoad) {
    if (!window.XLSX) {
        flash(messageSelector, "Excel kutubxonasi yuklanmadi.");
        return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const workbook = XLSX.read(new Uint8Array(event.target.result), { type: "array" });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            onLoad(XLSX.utils.sheet_to_json(worksheet, { defval: "" }));
        } catch (error) {
            flash(messageSelector, "Excel faylni o'qishda xatolik yuz berdi.");
        }
    };
    reader.readAsArrayBuffer(file);
}

function excelCell(row, names) {
    for (const name of names) {
        const value = String(row[name] ?? "").trim();
        if (value) return value;
    }
    return "";
}

function excelNumber(row, names) {
    const value = excelCell(row, names).replace(/\s/g, "").replace(/[^\d.-]/g, "");
    return Number(value || 0);
}

function nextAvailableLogin(fullName) {
    const base = String(fullName || "teacher")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, ".")
        .replace(/^\.+|\.+$/g, "") || "teacher";
    let login = base;
    let suffix = 1;
    while (state.users.some((user) => String(user.login || "").toLowerCase() === login.toLowerCase())) {
        suffix += 1;
        login = `${base}${suffix}`;
    }
    return login;
}

function renderSalaryReportSummary() {
    const summary = document.querySelector("#salaryReportSummary");
    if (!summary) return;

    const totals = salaryReportTotals({
        salaryAmount: numberValue("#salaryReportSalary"),
        advance: numberValue("#salaryReportAdvance")
    });

    summary.innerHTML = `
        <strong>Jami oylik: ${formatMoney(totals.total)} so'm</strong>
        <span>Avans: ${formatMoney(totals.advance)} | Avans turi: ${escapeHtml(value("#salaryReportAdvanceType") || "Bank orqali")} | Beriladi: ${formatMoney(totals.remaining)} so'm</span>
    `;
}

function renderTeacherFinance() {
    const table = document.querySelector("#teacherFinanceTable");
    if (!table) return;
    table.innerHTML = "";
    teachers().forEach((teacher) => {
        if (currentUser.role === "teacher" && teacher.id !== currentUser.id) return;
        const teacherClasses = assignedClasses(teacher);
        const classStudents = state.students.filter((student) => teacherClasses.includes(student.className));
        const classPayments = state.payments.filter((payment) => teacherClasses.includes(payment.className));
        if (!classStudents.length && !classPayments.length) return;
        const required = sum(classPayments, "requiredAmount") || sum(classStudents, "monthlyFee");
        const paid = sum(classPayments, "paidAmount");
        const debt = Math.max(required - paid, 0);
        const debtors = classPayments.filter((payment) => payment.requiredAmount > payment.paidAmount).length;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${escapeHtml(teacher.fullName)}</td>
            <td>${escapeHtml(teacher.assignedClass || "-")}</td>
            <td>${classStudents.length}</td>
            <td>${formatMoney(paid)} so'm</td>
            <td>${formatMoney(debt)} so'm</td>
            <td>${debtors ? `${debtors} qarzdor` : "Toza"}</td>
        `;
        table.append(row);
    });
    updateTableWrapVisibility(table);
}

function renderTeacherSalarySheets() {
    const table = document.querySelector("#teacherSalaryTable");
    if (!table) return;

    table.innerHTML = "";

    getVisibleSalaryReports().slice().reverse().forEach((report) => {
        const teacher = report.teacherId ? state.users.find((user) => user.id === report.teacherId) : null;
        const totals = salaryReportTotals(report);
        const split = splitAdvanceByType(report.advance || 0, report.advanceType);
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${escapeHtml(report.teacherName || teacher?.fullName || "-")}</td>
            <td>${escapeHtml(report.position || report.subject || teacher?.subject || "O'qituvchi")}</td>
            <td>${formatMoney(totals.total)} so'm</td>
            <td>${formatMoney(report.fine || 0)} so'm</td>
            <td>${formatMoney(split.bank)} so'm</td>
            <td>${formatMoney(split.click)} so'm</td>
            <td>${formatMoney(split.cash)} so'm</td>
            <td>${formatMoney(totals.remaining)} so'm</td>
            <td>${escapeHtml(report.className || teacher?.assignedClass || "-")}</td>
        `;
        table.append(row);
    });
    updateTableWrapVisibility(table);
}

function renderStudentClassFilter() {
    const select = document.querySelector("#studentClassFilter");
    if (!select) return;

    const classes = ["Barchasi", ...new Set(getVisibleStudents().map((student) => student.className).filter(Boolean))];
    select.innerHTML = classes.map((className) => `<option value="${escapeHtml(className)}">${escapeHtml(className)}</option>`).join("");
}

function renderStudentByClassSection() {
    const table = document.querySelector("#studentByClassTable");
    if (!table) return;
    const selectedClass = value("#studentClassFilter") || "Barchasi";
    const students = getVisibleStudents().filter((student) => selectedClass === "Barchasi" || student.className === selectedClass);

    table.innerHTML = "";
    students.forEach((student, index) => {
        const status = studentPaymentStatus(student);
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${escapeHtml(student.name)}</td>
            <td>${escapeHtml(student.className || "-")}</td>
            <td>${escapeHtml(student.phone || "-")}</td>
            <td>${formatMoney((student.monthlyFee || 0) + (student.dormitory ? (student.dormitoryFee || DORMITORY_FEE) : 0))} so'm</td>
            <td>${formatMoney(status.paid)} so'm</td>
            <td>${formatMoney(status.debt)} so'm</td>
            <td>${student.dormitory ? `${formatMoney(student.dormitoryFee || DORMITORY_FEE)} so'm` : "Yo'q"}</td>
            <td>${status.label}</td>
        `;
        table.append(row);
    });
    updateTableWrapVisibility(table);
}

function renderAttendanceClassOptions() {
    const select = document.querySelector("#attendanceClass");
    if (!select) return;

    const previous = select.value;
    const classes = currentUser.role === "teacher"
        ? assignedClasses(currentUser)
        : visibleClassNames();
    select.innerHTML = "";
    classes.forEach((className) => select.append(new Option(className, className)));
    if (classes.includes(previous)) select.value = previous;
    select.disabled = currentUser.role === "teacher";
}

function renderAttendance() {
    const table = document.querySelector("#attendanceTable");
    const badge = document.querySelector("#attendanceClassBadge");
    if (!table || !badge) return;

    const className = value("#attendanceClass");
    const date = value("#attendanceDate") || currentDate;
    const students = getVisibleStudents().filter((student) => student.className === className);
    badge.textContent = className || "Sinf tanlanmagan";
    table.innerHTML = "";

    students.forEach((student, index) => {
        const saved = state.attendance.find((item) => item.date === date && item.studentId === student.id);
        const row = document.createElement("tr");
        row.dataset.studentId = student.id;
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${escapeHtml(student.name)}</td>
            <td>${escapeHtml(student.className || "-")}</td>
            <td>
                <select aria-label="${escapeHtml(student.name)} davomati">
                    <option value="Kelgan"${saved?.status === "Kelgan" ? " selected" : ""}>Kelgan</option>
                    <option value="Kelmagan"${saved?.status === "Kelmagan" ? " selected" : ""}>Kelmagan</option>
                    <option value="Sababli kelmagan"${saved?.status === "Sababli kelmagan" || saved?.status === "Sababli" ? " selected" : ""}>Sababli kelmagan</option>
                </select>
            </td>
        `;
        table.append(row);
    });
    updateTableWrapVisibility(table);
}

function renderAdmissions() {
    const table = document.querySelector("#admissionTable");
    if (!table) return;
    const admissions = state.admissions.filter((item) => item.schoolYear === "2026/2027");
    document.querySelector("#admissionIncomingCount").textContent = admissions.filter((item) => item.status === "Kelyapti").length;
    document.querySelector("#admissionAcceptedCount").textContent = admissions.filter((item) => item.status === "Qabul qilindi").length;
    document.querySelector("#admissionLeavingCount").textContent = admissions.filter((item) => item.status === "Chiqib ketdi").length;
    table.innerHTML = "";
    admissions.slice().reverse().forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${escapeHtml(item.studentName)}</td>
            <td>${escapeHtml(item.className || "-")}</td>
            <td>${escapeHtml(item.phone || "-")}</td>
            <td>${escapeHtml(item.status)}</td>
            <td>${escapeHtml(formatDate(item.admissionDate))}</td>
            <td>${escapeHtml(item.note || "-")}</td>
            <td></td>
        `;
        appendTableActions(row, "admissions", item.id);
        table.append(row);
    });
    updateTableWrapVisibility(table);
}

function renderUsers() {
    const table = document.querySelector("#usersTable");
    if (!table) return;

    table.innerHTML = "";
    state.users.filter((user) => ["admin", "accountant", "zauch", "teacher", "warehouse"].includes(user.role)).forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${escapeHtml(user.fullName)}</td>
            <td>${escapeHtml(user.login)}</td>
            <td>${escapeHtml(roleNames[user.role] || user.role)}</td>
            <td>${escapeHtml(user.responsibility || roleResponsibilities[user.role] || "-")}</td>
            <td>${escapeHtml(user.assignedClass || "-")}</td>
            <td></td>
        `;
        const actionCell = row.querySelector("td:last-child");
        if (actionCell) {
            actionCell.append(actionButton("Tahrirlash", "ghost", () => editRecord("users", user.id), !can("roles")));
            actionCell.append(actionButton("O'chirish", "danger", () => removeItem("users", user.id), !can("roles") || user.id === currentUser.id));
        }
        table.append(row);
    });
    updateTableWrapVisibility(table);
}

function renderZauchPanel() {
    const table = document.querySelector("#zauchTable");
    if (!table) return;

    table.innerHTML = "";
    state.users.filter((user) => user.role === "zauch").forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${escapeHtml(user.fullName || "-")}</td>
            <td>${escapeHtml(user.login || "-")}</td>
            <td>${escapeHtml(user.assignedClass || "Barcha sinflar")}</td>
            <td><span class="paid">Faol</span></td>
        `;
        table.append(row);
    });
    updateTableWrapVisibility(table);
}

function renderSalaries() {
    const list = document.querySelector("#salaryList");
    list.innerHTML = "";
    getVisibleSalaries().slice().reverse().forEach((item) => {
        const total = item.baseSalary + item.bonus;
        const remaining = Math.max(total - item.advance, 0);
        list.append(recordItem({
            title: `${item.teacherName} - ${item.month}`,
            meta: `Jami: ${formatMoney(total)} so'm | Avans: ${formatMoney(item.advance)} so'm`,
            note: `Qolgan oylik: ${formatMoney(remaining)} so'm`,
            id: item.id,
            collection: "salaries"
        }));
    });
}

function renderTutors() {
    const list = document.querySelector("#tutorList");
    list.innerHTML = "";
    getVisibleTutors().slice().reverse().forEach((item) => {
        const salary = tutorSalary(item);
        list.append(recordItem({
            title: `${item.teacherName} - ${item.month}`,
            meta: `${item.studentsCount} bola | ${item.hours} soat | KPI: ${formatMoney(item.bonus)} so'm`,
            note: `Repetitor oyligi: ${formatMoney(salary)} so'm`,
            id: item.id,
            collection: "tutors"
        }));
    });
}

function renderFinance() {
    const table = document.querySelector("#financeList");
    const summary = document.querySelector("#financeTodaySummary");
    const today = todayFinanceStats();

    summary.innerHTML = `
        <strong>Bugun yig'ilgan: ${formatMoney(today.net)} so'm</strong>
        <span>Kirim: ${formatMoney(today.income)} | Naqd: ${formatMoney(today.cash)} | Click: ${formatMoney(today.click)} | Hisob raqam: ${formatMoney(today.account)} | Chiqim: ${formatMoney(today.expense)} | Farq: ${formatMoney(today.net)}</span>
    `;

    table.innerHTML = "";
    state.finance.slice().reverse().forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${escapeHtml(item.title || "Izoh yo'q")}</td>
            <td>${escapeHtml(item.quantity || "-")}</td>
            <td>${formatMoney(item.amount)} so'm</td>
            <td>${escapeHtml(item.expenseType || "-")}</td>
            <td>${escapeHtml(item.recipientName || (state.users.find(u => u.id === item.recipientId)?.fullName) || "-")}</td>
            <td>${escapeHtml(item.method || "Naqd pul")}</td>
            <td>${escapeHtml(formatDate(item.expenseDate || item.createdAt))}</td>
            <td></td>
        `;
        row.insertAdjacentHTML("afterbegin", `<td>${index + 1}</td>`);
        appendTableActions(row, "finance", item.id);
        table.append(row);
    });
    updateTableWrapVisibility(table);
}

function renderFinancePaymentsTable() {
    const table = document.querySelector("#financePaymentsTable");
    const classFilter = value("#financeClassFilter") || "all";
    table.innerHTML = "";

    getVisiblePayments()
        .filter((payment) => classFilter === "all" || payment.className === classFilter)
        .forEach((payment, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${escapeHtml(payment.studentName)}</td>
                <td>${escapeHtml(payment.className)}</td>
                <td>${formatMoney(payment.paidAmount)} so'm</td>
                <td>${escapeHtml(payment.method || "Naqd pul")}</td>
                <td>${escapeHtml(payment.note || payment.category || "-")}</td>
                <td>${escapeHtml(formatDate(payment.paymentDate || payment.createdAt))}</td>
                <td></td>
            `;
            appendTableActions(row, "payments", payment.id);
            table.append(row);
        });
    updateTableWrapVisibility(table);
}

function renderPendingExpenses() {
    const table = document.querySelector("#pendingExpenseTable");
    if (!table) return;

    table.innerHTML = "";
    state.pendingExpenses
        .filter((item) => item.createdById === currentUser?.id)
        .slice()
        .reverse()
        .forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${escapeHtml(item.recipientName || "-")}</td>
                <td>${escapeHtml(item.title || "-")}</td>
                <td>${formatMoney(item.amount)} so'm</td>
                <td>${escapeHtml(item.method || "Naqd pul")}</td>
                <td>${escapeHtml(formatDate(item.expenseDate || item.createdAt))}</td>
                <td>Superadmin kutyapti</td>
            `;
            table.append(row);
        });
    updateTableWrapVisibility(table);
}

function renderExpenseReminders() {
    const section = document.querySelector("#expenseReminders");
    const list = document.querySelector("#expenseReminderList");
    const count = document.querySelector("#expenseReminderCount");
    if (!section || !list || !count) return;

    const allowed = currentUser?.role === "superadmin" || currentUser?.role === "admin";
    section.classList.toggle("is-hidden", !allowed);
    list.innerHTML = "";
    count.textContent = `${state.pendingExpenses.length} ta`;
    if (!allowed) return;

    state.pendingExpenses.slice().reverse().forEach((item) => {
        const card = document.createElement("div");
        card.className = "record-item";
        card.innerHTML = `
            <strong>${escapeHtml(item.recipientName || "-")} - ${formatMoney(item.amount)} so'm</strong>
            <span>${escapeHtml(item.title || "-")} | ${escapeHtml(item.method || "Naqd pul")} | ${escapeHtml(formatDate(item.expenseDate || item.createdAt))}</span>
            <small>Kiritdi: ${escapeHtml(item.createdBy || "-")}</small>
        `;
        const actions = document.createElement("div");
        actions.className = "record-actions";
        actions.append(
            actionButton("Rasxodlarga qo'shish", "ghost", () => approvePendingExpense(item.id)),
            actionButton("Olib tashlash", "danger", () => removePendingExpense(item.id))
        );
        card.append(actions);
        list.append(card);
    });
}

function approvePendingExpense(id) {
    const item = state.pendingExpenses.find((entry) => entry.id === id);
    if (!item) return;

    state.finance.push({
        id: createId("finance"),
        type: "Rasxod",
        expenseType: item.title || "Kassa rasxodi",
        recipientName: item.recipientName || "",
        method: item.method || "Naqd pul",
        title: item.title || "Kassa rasxodi",
        quantity: "",
        amount: Number(item.amount || 0),
        expenseDate: item.expenseDate || currentDate,
        createdBy: item.createdBy || currentUser.fullName,
        approvedBy: currentUser.fullName,
        createdAt: item.createdAt || new Date().toISOString()
    });
    archiveRecord("pendingExpenses", "Rasxodlarga qo'shildi", item);
    state.pendingExpenses = state.pendingExpenses.filter((entry) => entry.id !== id);
    saveState();
    renderApp();
}

function removePendingExpense(id) {
    const item = state.pendingExpenses.find((entry) => entry.id === id);
    if (item) archiveRecord("pendingExpenses", "Olib tashlandi", item);
    state.pendingExpenses = state.pendingExpenses.filter((entry) => entry.id !== id);
    saveState();
    renderApp();
}

function renderAttendanceReminders() {
    const section = document.querySelector("#attendanceReminders");
    const list = document.querySelector("#attendanceReminderList");
    const count = document.querySelector("#attendanceReminderCount");
    if (!section || !list || !count) return;

    const allowed = currentUser?.role === "superadmin" || currentUser?.role === "admin";
    section.classList.toggle("is-hidden", !allowed);
    list.innerHTML = "";
    if (!allowed) return;

    const missing = teachers().flatMap((teacher) => assignedClasses(teacher)
        .filter((className) => !state.attendance.some((item) => item.date === currentDate && item.className === className))
        .map((className) => ({ teacher, className })));
    count.textContent = `${missing.length} ta`;

    missing.forEach(({ teacher, className }) => {
        const item = document.createElement("div");
        item.className = "record-item";
        item.innerHTML = `
            <strong>${escapeHtml(className)} sinf - davomat olinmagan</strong>
            <span>Sinf rahbar: ${escapeHtml(teacher.fullName || "-")}</span>
            <small>Bugungi sana: ${escapeHtml(currentDate)}</small>
        `;
        list.append(item);
    });
}

function todayAttendanceTotals() {
    const records = state.attendance.filter((item) => item.date === currentDate);
    return {
        present: records.filter((item) => item.status === "Kelgan").length,
        absent: records.filter((item) => item.status === "Kelmagan" || item.status === "Sababli" || item.status === "Sababli kelmagan").length,
        excused: records.filter((item) => item.status === "Sababli" || item.status === "Sababli kelmagan").length
    };
}

function archiveRecord(collection, action, item) {
    state.archive.push({
        id: createId("archive"),
        collection,
        action,
        data: JSON.parse(JSON.stringify(item || {})),
        performedBy: currentUser?.fullName || "-",
        archivedAt: new Date().toISOString()
    });
}

function renderArchive() {
    const table = document.querySelector("#archiveTable");
    const count = document.querySelector("#archiveCount");
    if (!table || !count) return;

    table.innerHTML = "";
    count.textContent = `${state.archive.length} ta`;
    state.archive.slice().reverse().forEach((entry) => {
        const description = entry.data.name || entry.data.title || entry.data.studentName ||
            entry.data.teacherName || entry.data.recipientName || entry.data.fullName || "-";
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${escapeHtml(formatDate(entry.archivedAt))}</td>
            <td>${escapeHtml(entry.collection || "-")}</td>
            <td>${escapeHtml(entry.action || "-")}</td>
            <td>${escapeHtml(description)}</td>
            <td>${escapeHtml(entry.performedBy || "-")}</td>
        `;
        table.append(row);
    });
    updateTableWrapVisibility(table);
}

function renderFounders() {
    const summary = document.querySelector("#founderSummary");
    const list = document.querySelector("#founderList");
    const stats = calculateStats();
    const usedPercent = state.founders.reduce((total, founder) => total + Number(founder.percent || 0), 0);
    const remainingPercent = Math.max(100 - usedPercent, 0);
    summary.innerHTML = `
        <strong>Sof foyda: ${formatMoney(stats.profit)} so'm</strong>
        <span>Jami tushim: ${formatMoney(stats.income)} | Jami chiqim: ${formatMoney(stats.expenses + stats.salaryCost)} | Rasxod: ${formatMoney(stats.expenses)} | Oyliklar: ${formatMoney(stats.salaryCost)}</span>
        <div class="percent-meter" aria-label="Ta'sischilar 100 foizlik rejimi">
            <span style="width: ${Math.min(usedPercent, 100)}%"></span>
        </div>
        <span>Ajratilgan ulush: ${formatMoney(usedPercent)}% | Qoldiq: ${formatMoney(remainingPercent)}%</span>
    `;
    list.innerHTML = "";
    state.founders.forEach((founder) => {
        const amount = stats.profit * founder.percent / 100;
        const advances = state.finance
            .filter((item) => item.recipientType === "founder" && item.recipientId === founder.id && item.salaryAdvance)
            .reduce((total, item) => total + Number(item.amount || 0), 0);
        list.append(recordItem({
            title: founder.name,
            meta: `${founder.percent}% ulush`,
            note: `Ulushi: ${formatMoney(amount)} so'm | Avans olgan: ${formatMoney(advances)} so'm | Qoldiq: ${formatMoney(amount - advances)} so'm`,
            id: founder.id,
            collection: "founders"
        }));
    });
}

function renderDashboardMonitoring() {
    const today = new Date().toISOString().slice(0, 10);
    const todayPayments = state.payments.filter((payment) => formatDate(payment.paymentDate || payment.createdAt) === today);
    const todayExpenses = state.finance.filter((item) => item.type === "Rasxod" && formatDate(item.expenseDate || item.createdAt) === today);
    const incomeItems = [
        { label: "Naqd", value: sum(todayPayments.filter((item) => item.method === "Naqd pul"), "paidAmount"), color: "#22c55e" },
        { label: "Click", value: sum(todayPayments.filter((item) => item.method === "Click" || item.method === "Click/Payme"), "paidAmount"), color: "#38bdf8" },
        { label: "Hisob", value: sum(todayPayments.filter((item) => item.method === "Hisob raqam"), "paidAmount"), color: "#facc15" }
    ];
    const expenseGroups = groupAmounts(todayExpenses, "expenseType", "amount");
    const totalIncome = incomeItems.reduce((total, item) => total + item.value, 0);
    const totalExpense = expenseGroups.reduce((total, item) => total + item.value, 0);

    document.querySelector("#dailyIncomeBadge").textContent = `${formatMoney(totalIncome)} so'm`;
    document.querySelector("#dailyExpenseBadge").textContent = `${formatMoney(totalExpense)} so'm`;
    renderIncomeChart("#dailyIncomeChart", incomeItems, totalIncome);
    renderBarChart("#dailyExpenseChart", expenseGroups.length ? expenseGroups : [{ label: "Rasxod", value: 0 }], totalExpense);
}

function renderServices() {
    const table = document.querySelector("#serviceTable");
    if (!table) return;

    table.innerHTML = "";
    state.services
        .filter((item) => item.type === "Avtobus")
        .slice()
        .reverse()
        .forEach((item, index) => {
        const salary = Number(item.salary || 0);
        const advance = Number(item.advance || 0);
        const remaining = Math.max(salary - advance, 0);
        const split = splitServiceAdvanceByType(advance, item.advanceType);
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${escapeHtml(item.driverName || item.title || "Avtobuschi")}</td>
            <td>${escapeHtml(item.job || "haydovchi")}</td>
            <td>${formatMoney(salary)} so'm</td>
            <td>${formatMoney(split.cash)} so'm</td>
            <td>${formatMoney(split.click)} so'm</td>
            <td>${formatMoney(remaining)} so'm</td>
            <td></td>
        `;
        appendTableActions(row, "services", item.id);
        table.append(row);
    });
    updateTableWrapVisibility(table);
}

function renderStaffSalaries() {
    const table = document.querySelector("#staffSalaryTable");
    if (!table) return;

    table.innerHTML = "";
    state.staffSalaries.slice().reverse().forEach((item, index) => {
        const totals = staffSalaryTotals(item);
        const split = splitAdvanceByType(totals.advanceTotal, item.advanceType);
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${escapeHtml(item.name)}</td>
            <td>${escapeHtml(item.job || "Tex xodim")}</td>
            <td>${escapeHtml(item.month || "-")}</td>
            <td>${formatMoney(item.salary)} so'm</td>
            <td>${formatMoney(item.fine || 0)} so'm</td>
            <td>${formatMoney(split.bank)} so'm</td>
            <td>${formatMoney(split.click)} so'm</td>
            <td>${formatMoney(split.cash)} so'm</td>
            <td>${formatMoney(totals.remaining)} so'm</td>
            <td></td>
        `;
        appendTableActions(row, "staffSalaries", item.id);
        table.append(row);
    });
    updateTableWrapVisibility(table);
}

function updateTableWrapVisibility(tableBody) {
    const wrapper = tableBody ? tableBody.closest(".table-wrap") : null;
    if (!wrapper) return;
    wrapper.classList.toggle("is-empty", tableBody.children.length === 0);
}

function appendTableActions(row, collection, id) {
    const actionCell = row.querySelector("td:last-child");
    if (!actionCell || !canEditCollection(collection)) return;
    actionCell.append(
        actionButton("Tahrirlash", "ghost", () => editRecord(collection, id)),
        actionButton("O'chirish", "danger", () => removeItem(collection, id))
    );
}

function recordItem({ title, meta, note, id, collection }) {
    const item = document.createElement("div");
    item.className = "record-item";
    item.innerHTML = `
        <strong>${escapeHtml(title)}</strong>
        <span>${escapeHtml(meta)}</span>
        <small>${escapeHtml(note)}</small>
    `;

    if (canEditCollection(collection)) {
        const actions = document.createElement("div");
        actions.className = "record-actions";
        actions.append(
            actionButton("Tahrirlash", "ghost", () => editRecord(collection, id)),
            actionButton("O'chirish", "danger", () => removeItem(collection, id))
        );
        item.append(actions);
    }

    return item;
}

function openInlineEditModal({ title, description = "Ma'lumotlarni tizim ichida tahrirlang.", fields, onSave }) {
    document.querySelector("#inlineEditModal")?.remove();

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.id = "inlineEditModal";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");

    const fieldMarkup = fields.map((field) => {
        if (field.type === "select") {
            const options = field.options.map((option) =>
                `<option value="${escapeHtml(option)}"${String(option) === String(field.value || "") ? " selected" : ""}>${escapeHtml(option)}</option>`
            ).join("");
            return `
                <label>
                    ${escapeHtml(field.label)}
                    <select name="${escapeHtml(field.name)}">${options}</select>
                </label>
            `;
        }
        if (field.type === "checkbox") {
            return `
                <label class="check-row">
                    <input name="${escapeHtml(field.name)}" type="checkbox"${field.value ? " checked" : ""}>
                    <span>${escapeHtml(field.label)}</span>
                </label>
            `;
        }
        return `
            <label>
                ${escapeHtml(field.label)}
                <input name="${escapeHtml(field.name)}" type="${escapeHtml(field.type || "text")}" value="${escapeHtml(field.value ?? "")}" ${field.min !== undefined ? `min="${escapeHtml(field.min)}"` : ""}>
            </label>
        `;
    }).join("");

    overlay.innerHTML = `
        <div class="modal-panel">
            <div class="modal-header">
                <div>
                    <h2>${escapeHtml(title)}</h2>
                    <p class="modal-description">${escapeHtml(description)}</p>
                </div>
                <button type="button" class="modal-close" aria-label="Yopish">×</button>
            </div>
            <form class="modal-form modal-grid">
                ${fieldMarkup}
                <p class="form-message" data-modal-message aria-live="polite"></p>
                <div class="modal-actions">
                    <button type="submit">Saqlash</button>
                    <button type="button" class="secondary" data-cancel>Bekor qilish</button>
                </div>
            </form>
        </div>
    `;

    const close = () => overlay.remove();
    overlay.querySelector(".modal-close").addEventListener("click", close);
    overlay.querySelector("[data-cancel]").addEventListener("click", close);
    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) close();
    });
    overlay.querySelector("form").addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        fields.filter((field) => field.type === "checkbox").forEach((field) => {
            data[field.name] = formData.has(field.name);
        });
        const result = onSave(data, overlay.querySelector("[data-modal-message]"));
        if (result === false) return;
        close();
    });

    document.body.append(overlay);
}

function editRecord(collection, id) {
    const item = state[collection].find((entry) => entry.id === id);
    if (!item) return;

    if (collection === "payments") {
        openInlineEditModal({
            title: "To'lovni tahrirlash",
            fields: [
                { name: "paidAmount", label: "To'langan summa", type: "number", min: 0, value: item.paidAmount || 0 },
                { name: "method", label: "To'lov usuli", type: "select", value: item.method || "Naqd pul", options: ["Naqd pul", "Click", "Hisob raqam"] },
                { name: "note", label: "Chegirma va izoh", type: "text", value: item.note || "" },
                { name: "paymentDate", label: "Sana", type: "date", value: item.paymentDate || formatDate(item.createdAt) || currentDate },
                { name: "contactStatus", label: "Aloqa holati", type: "select", value: item.contactStatus || "Aloqa qilinmagan", options: ["Aloqa qilinmagan", "Telefon qilindi", "Va'da berdi", "Hal qilindi"] }
            ],
            onSave: (data) => {
                item.paidAmount = Number(data.paidAmount || 0);
                item.method = data.method;
                item.note = data.note;
                item.paymentDate = data.paymentDate || currentDate;
                item.contactStatus = data.contactStatus;
                saveState();
                renderApp();
            }
        });
        return;
    }
    if (collection === "students") {
        openInlineEditModal({
            title: "O'quvchini tahrirlash",
            fields: [
                { name: "name", label: "O'quvchi F.I.Sh", type: "text", value: item.name || "" },
                { name: "className", label: "Sinf", type: "text", value: item.className || "" },
                { name: "phone", label: "Telefon", type: "tel", value: item.phone || "" },
                { name: "monthlyFee", label: "Oylik to'lov", type: "number", min: 0, value: item.monthlyFee || 0 },
                { name: "dormitory", label: "Yotoqxonada qoladi (+300000 so'm)", type: "checkbox", value: Boolean(item.dormitory) }
            ],
            onSave: (data) => {
                item.name = data.name;
                item.className = normalizeClass(data.className);
                item.phone = data.phone;
                item.monthlyFee = Number(data.monthlyFee || 0);
                item.dormitory = Boolean(data.dormitory);
                item.dormitoryFee = item.dormitory ? DORMITORY_FEE : 0;
                saveState();
                renderApp();
            }
        });
        return;
    }
    if (collection === "users") {
        openInlineEditModal({
            title: "Rolni tahrirlash",
            description: "Bitta ustozga bir nechta sinf berish uchun sinflarni vergul bilan yozing: 5-A, 7-A.",
            fields: [
                { name: "fullName", label: "F.I.Sh", type: "text", value: item.fullName || "" },
                { name: "login", label: "Login", type: "text", value: item.login || "" },
                { name: "password", label: "Parol", type: "text", value: item.password || "" },
                { name: "role", label: "Rol", type: "select", value: item.role || "teacher", options: ["admin", "accountant", "zauch", "teacher", "warehouse"] },
                { name: "assignedClass", label: "Biriktirilgan sinflar (masalan: 5-A, 7-A)", type: "text", value: item.assignedClass || "" }
            ],
            onSave: (data, message) => {
                const duplicate = state.users.some((user) =>
                    user.id !== item.id && String(user.login || "").toLowerCase() === String(data.login || "").toLowerCase()
                );
                if (duplicate) {
                    message.textContent = "Bu login boshqa xodimda mavjud.";
                    return false;
                }
                item.fullName = data.fullName;
                item.login = data.login;
                item.password = data.password;
                item.role = data.role;
                item.responsibility = roleResponsibilities[data.role] || "";
                item.assignedClass = normalizeAssignedClasses(data.assignedClass);
                archiveRecord("users", "Rol tahrirlandi", item);
                saveState();
                renderApp();
            }
        });
        return;
    }
    if (collection === "admissions") {
        openInlineEditModal({
            title: "Qabul ma'lumotini tahrirlash",
            fields: [
                { name: "studentName", label: "O'quvchi F.I.Sh", type: "text", value: item.studentName || "" },
                { name: "className", label: "Sinf", type: "text", value: item.className || "" },
                { name: "phone", label: "Telefon", type: "tel", value: item.phone || "" },
                { name: "status", label: "Holati", type: "select", value: item.status || "Kelyapti", options: ["Kelyapti", "Qabul qilindi", "Chiqib ketdi"] },
                { name: "admissionDate", label: "Sana", type: "date", value: item.admissionDate || currentDate },
                { name: "note", label: "Izoh", type: "text", value: item.note || "" }
            ],
            onSave: (data) => {
                item.studentName = data.studentName;
                item.className = normalizeClass(data.className);
                item.phone = data.phone;
                item.status = data.status;
                item.admissionDate = data.admissionDate || currentDate;
                item.note = data.note;
                archiveRecord("admissions", "Qabul ma'lumoti tahrirlandi", item);
                saveState();
                renderApp();
            }
        });
        return;
    }
    if (collection === "salaryReports") {
        openSalaryReportEditModal(id);
        return;
    }
    if (collection === "services") {
        openServiceEditModal(id);
        return;
    }
    if (collection === "salaries") {
        openInlineEditModal({
            title: "Oylikni tahrirlash",
            fields: [
                { name: "baseSalary", label: "Jami oylik", type: "number", min: 0, value: item.baseSalary || 0 },
                { name: "advance", label: "Avans", type: "number", min: 0, value: item.advance || 0 },
                { name: "bonus", label: "Bonus / KPI", type: "number", min: 0, value: item.bonus || 0 }
            ],
            onSave: (data) => {
                item.baseSalary = Number(data.baseSalary || 0);
                item.advance = Number(data.advance || 0);
                item.bonus = Number(data.bonus || 0);
                saveState();
                renderApp();
            }
        });
        return;
    }
    if (collection === "tutors") {
        openInlineEditModal({
            title: "Repetitor oyligini tahrirlash",
            fields: [
                { name: "studentsCount", label: "Bola soni", type: "number", min: 0, value: item.studentsCount || 0 },
                { name: "hours", label: "O'tgan soati", type: "number", min: 0, value: item.hours || 0 },
                { name: "rate", label: "Stavka", type: "number", min: 0, value: item.rate || 0 },
                { name: "bonus", label: "KPI bonus", type: "number", min: 0, value: item.bonus || 0 }
            ],
            onSave: (data) => {
                item.studentsCount = Number(data.studentsCount || 0);
                item.hours = Number(data.hours || 0);
                item.rate = Number(data.rate || 0);
                item.bonus = Number(data.bonus || 0);
                saveState();
                renderApp();
            }
        });
        return;
    }
    if (collection === "finance") {
        openFinanceEditModal(id);
        return;
    }
    if (collection === "founders") {
        openInlineEditModal({
            title: "Ta'sischini tahrirlash",
            fields: [
                { name: "name", label: "Ta'sischi F.I.Sh", type: "text", value: item.name || "" },
                { name: "percent", label: "Ulush foizi", type: "number", min: 0, value: item.percent || 0 }
            ],
            onSave: (data, message) => {
                const nextPercent = Number(data.percent || 0);
                const otherPercent = state.founders
                    .filter((founder) => founder.id !== item.id)
                    .reduce((total, founder) => total + Number(founder.percent || 0), 0);
                if (otherPercent + nextPercent > 100) {
                    message.textContent = `Ta'sischilar ulushi 100% dan oshmasligi kerak. Qoldiq: ${100 - otherPercent}%.`;
                    return false;
                }
                item.name = data.name;
                item.percent = nextPercent;
                saveState();
                renderApp();
            }
        });
        return;
    }
    if (collection === "staffSalaries") {
        const totals = staffSalaryTotals(item);
        openInlineEditModal({
            title: "Tex xodim oyligini tahrirlash",
            fields: [
                { name: "name", label: "Tex xodim F.I.Sh", type: "text", value: item.name || "" },
                { name: "job", label: "Lavozimi", type: "text", value: item.job || "" },
                { name: "salary", label: "Oylik", type: "number", min: 0, value: item.salary || 0 },
                { name: "fine", label: "Jarima", type: "number", min: 0, value: item.fine || 0 },
                { name: "advance", label: "Berilgan avans", type: "number", min: 0, value: totals.advanceTotal || 0 },
                { name: "advanceType", label: "Avans turi", type: "select", value: item.advanceType || "Bank orqali", options: ["Bank orqali", "Click", "Naqd pul"] }
            ],
            onSave: (data) => {
                item.name = data.name;
                item.job = data.job;
                item.salary = Number(data.salary || 0);
                item.fine = Number(data.fine || 0);
                item.advance = Number(data.advance || 0);
                item.advanceType = normalizeAdvanceType(data.advanceType);
                item.advanceBank = 0;
                item.advanceClick = 0;
                item.advanceCash = 0;
                saveState();
                renderApp();
            }
        });
    }
}

function removeItem(collection, id) {
    openInlineEditModal({
        title: "Ma'lumotni o'chirish",
        description: "Ushbu yozuv o'chirilsinmi?",
        fields: [],
        onSave: () => {
            const removedItem = state[collection].find((item) => item.id === id);
            if (removedItem) archiveRecord(collection, "O'chirildi", removedItem);
            state[collection] = state[collection].filter((item) => item.id !== id);
            saveState();
            renderApp();
        }
    });
}

function calculateStats() {
    const incomeFromPayments = sum(state.payments, "paidAmount");
    const manualIncome = sum(state.finance.filter((item) => item.type !== "Rasxod"), "amount");
    const expenses = sum(state.finance.filter((item) => item.type === "Rasxod"), "amount");
    const regularSalary = state.salaries.reduce((total, item) => total + item.baseSalary + item.bonus, 0);
    const staffSalaryCost = state.staffSalaries.reduce((total, item) => total + Number(item.salary || 0), 0);
    const tutorCost = state.tutors.reduce((total, item) => total + tutorSalary(item), 0);
    const debt = state.payments.reduce((total, item) => total + Math.max(item.requiredAmount - item.paidAmount, 0), 0);
    const income = incomeFromPayments + manualIncome;
    const salaryCost = regularSalary + tutorCost + staffSalaryCost;

    return {
        income,
        expenses,
        salaryCost,
        debt,
        profit: income - expenses - salaryCost
    };
}

function getVisibleStudents() {
    if (!currentUser) return [];
    if (currentUser.role === "teacher") {
        return state.students.filter((item) => assignedClasses(currentUser).includes(item.className));
    }
    return state.students;
}

function getVisiblePayments() {
    if (!currentUser) return [];
    if (currentUser.role === "teacher") {
        return state.payments.filter((item) => assignedClasses(currentUser).includes(item.className) || item.teacherId === currentUser.id);
    }
    return state.payments;
}

function getVisibleSchedules() {
    if (!currentUser) return [];
    if (currentUser.role === "teacher") {
        return state.schedules.filter((item) => item.teacherId === currentUser.id || assignedClasses(currentUser).includes(item.className));
    }
    return state.schedules;
}

function getVisibleSalaryReports() {
    if (!currentUser) return [];
    if (currentUser.role === "teacher") {
        return state.salaryReports.filter((item) => item.teacherId === currentUser.id);
    }
    return state.salaryReports;
}

function getVisibleSalaries() {
    if (!currentUser) return [];
    if (currentUser.role === "teacher") {
        return state.salaries.filter((item) => item.teacherId === currentUser.id);
    }
    return state.salaries;
}

function getVisibleTutors() {
    if (!currentUser) return [];
    if (currentUser.role === "teacher") {
        return state.tutors.filter((item) => item.teacherId === currentUser.id);
    }
    return state.tutors;
}

function visibleClassNames() {
    const classes = [...new Set([
        ...state.students.map((student) => student.className),
        ...teachers().flatMap((teacher) => assignedClasses(teacher))
    ].filter(Boolean))];
    if (currentUser.role === "teacher") {
        return assignedClasses(currentUser);
    }
    return classes;
}

function teachers() {
    return state.users.filter((user) => user.role === "teacher");
}

function assignedClasses(user = {}) {
    return String(user.assignedClass || "")
        .split(",")
        .map((className) => normalizeClass(className))
        .filter(Boolean);
}

function can(permission) {
    return currentUser && (permissions[currentUser.role] || []).includes(permission);
}

function canViewSection(id) {
    if (!currentUser) return id === "dashboard";
    if (id === "dashboard") return currentUser.role === "superadmin" || currentUser.role === "admin";
    if (currentUser.role === "superadmin" || currentUser.role === "admin") return true;

    const responsibility = currentUser.responsibility || roleResponsibilities[currentUser.role] || "";
    const allowedSections = responsibilitySections[responsibility] || [];
    return allowedSections.includes(id);
}

function firstAllowedView() {
    if (!currentUser) return "dashboard";
    if (currentUser.role === "superadmin" || currentUser.role === "admin") return "dashboard";

    const responsibility = currentUser.responsibility || roleResponsibilities[currentUser.role] || "";
    return (responsibilitySections[responsibility] || [])[0] || "students";
}

function sectionPermission(id) {
    const map = {
        zauch: "salaryReports",
        zauchPanel: "salaryReports",
        payments: "payments",
        monthlyPayments: "finance",
        expenses: "finance",
        attendance: "attendance",
        admissions: "admissions",
        archive: "roles",
        staff: "services",
        buses: "services",
        teachers: currentUser?.role === "teacher" ? "students" : "teachers"
    };
    return map[id] || id;
}

function canEditCollection(collection) {
    const map = {
        payments: "finance",
        students: "students",
        users: "roles",
        admissions: "admissions",
        schedules: "schedule",
        salaryReports: "salaryReports",
        salaries: "salaries",
        tutors: "tutors",
        finance: "finance",
        founders: "founders",
        services: "services",
        staffSalaries: "services",
        salarySheetReadOnly: "never"
    };
    return can(map[collection]);
}

function toggleForm(selector, enabled) {
    document.querySelectorAll(`${selector} input, ${selector} select, ${selector} button`).forEach((field) => {
        field.disabled = !enabled;
    });
}

function actionButton(text, className, onClick, disabled = false) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.textContent = text;
    button.disabled = disabled;
    button.addEventListener("click", onClick);
    return button;
}

function applyTheme(theme) {
    const isDark = theme === "dark";
    document.body.classList.toggle("dark-theme", isDark);
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
    themeToggle.textContent = isDark ? "☀" : "☾";
    themeToggle.setAttribute("aria-label", isDark ? "Kunduzgi rejimga o'tish" : "Tungi rejimga o'tish");
}

function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const base = saved ? JSON.parse(saved) : {};
    return normalizeState(base);
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    saveStateToServer();
    saveStateToFirebase();
}

async function loadStateFromServer() {
    try {
        const response = await fetch("/api/platform");
        if (!response.ok) return;
        const data = await response.json();
        if (data && Object.keys(data).length) {
            const needsCleanup = needsArchiveCleanup(data);
            state = normalizeState(data);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            if (needsCleanup) await saveStateToServer();
            if (currentUser) renderApp();
        }
        serverOnline = true;
    } catch (error) {
        serverOnline = false;
    }
}

async function saveStateToServer() {
    try {
        const response = await fetch("/api/platform", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(state)
        });
        serverOnline = response.ok;
    } catch (error) {
        serverOnline = false;
    }
}

function initFirebaseBackend() {
    if (!window.firebase || !window.IDEAL_SCHOOL_FIREBASE_CONFIG) {
        return;
    }

    try {
        if (!firebase.apps.length) {
            firebase.initializeApp(window.IDEAL_SCHOOL_FIREBASE_CONFIG);
        }
        if (firebase.analytics && window.IDEAL_SCHOOL_FIREBASE_CONFIG.measurementId) {
            firebase.analytics();
        }
        firestoreDb = firebase.firestore();
        firebaseOnline = true;
        loadStateFromFirebase();
    } catch (error) {
        console.warn("Firebase ulanmagan:", error);
        firebaseOnline = false;
    }
}

async function loadStateFromFirebase() {
    if (!firestoreDb) return;

    try {
        const snapshot = await firestoreDb.collection("platform").doc("idealSchool").get();
        if (snapshot.exists) {
            const data = snapshot.data();
            const needsCleanup = needsArchiveCleanup(data);
            state = normalizeState(data);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            if (needsCleanup) {
                await firestoreDb.collection("platform").doc("idealSchool").set(state);
            }
        } else {
            await firestoreDb.collection("platform").doc("idealSchool").set(state);
        }
        if (currentUser) renderApp();
    } catch (error) {
        console.warn("Firebase'dan o'qishda xatolik:", error);
    }
}

async function saveStateToFirebase() {
    if (!firestoreDb || !firebaseOnline) return;

    try {
        await firestoreDb.collection("platform").doc("idealSchool").set(state);
    } catch (error) {
        console.warn("Firebase'ga saqlashda xatolik:", error);
    }
}

function normalizeState(base = {}) {
    const baseSettings = base.settings && typeof base.settings === "object" ? base.settings : {};
    const archive = baseSettings.archivePolicyVersion === ARCHIVE_POLICY_VERSION
        ? currentMonthArchive(base.archive)
        : [];
    const users = Array.isArray(base.users) ? base.users.map((user) => ({
        subject: "",
        responsibility: roleResponsibilities[user.role] || "",
        ...user,
        responsibility: user.responsibility || roleResponsibilities[user.role] || ""
    })) : [];
    const savedLogins = new Set(users.map((user) => user.login));

    defaultUsers.forEach((user) => {
        if (!savedLogins.has(user.login)) users.unshift(user);
    });

    return {
        users,
        students: Array.isArray(base.students) ? base.students.map((student) => ({ monthlyFee: 0, dormitory: false, dormitoryFee: 0, ...student })) : [],
        schedules: Array.isArray(base.schedules) ? base.schedules : [],
        salaryReports: Array.isArray(base.salaryReports) ? base.salaryReports.map((report) => ({
            subject: "",
            position: report.position || report.subject || "",
            className: report.className || "",
            salaryAmount: 0,
            advance: 0,
            loan: Number(report.loan || 0),
            advanceType: "Bank orqali",
            paymentTarget: "Bank karta",
            bankCard: "",
            calculatedSalary: 0,
            remainingSalary: 0,
            ...report,
            advanceType: normalizeAdvanceType(report.advanceType || "Bank orqali")
        })) : [],
        payments: Array.isArray(base.payments) ? base.payments.map((payment) => ({
            category: "O'qish to'lovi",
            method: "Naqd pul",
            note: "",
            paymentDate: String(payment.createdAt || "").slice(0, 10),
            dormitory: false,
            ...payment
        })) : [],
        attendance: Array.isArray(base.attendance) ? base.attendance : [],
        admissions: Array.isArray(base.admissions) ? base.admissions : [],
        salaries: Array.isArray(base.salaries) ? base.salaries : [],
        tutors: Array.isArray(base.tutors) ? base.tutors : [],
        founders: Array.isArray(base.founders) ? base.founders : [],
        pendingExpenses: Array.isArray(base.pendingExpenses) ? base.pendingExpenses : [],
        archive,
        finance: Array.isArray(base.finance) ? base.finance.map((item) => ({
            quantity: "",
            expenseDate: String(item.createdAt || "").slice(0, 10),
            ...item
        })) : [],
        services: Array.isArray(base.services) ? base.services.map((service) => ({
            ...service,
            driverName: service.driverName || service.title || "",
            job: service.job || "haydovchi",
            salary: Number(service.salary || 0),
            advance: Number(service.advance || 0),
            advanceType: normalizeServiceAdvanceType(service.advanceType || "Naqd pul")
        })) : [],
        staffSalaries: Array.isArray(base.staffSalaries) ? base.staffSalaries.map((staff) => ({
            ...staff,
            fine: Number(staff.fine || 0),
            advanceBank: Number(staff.advanceBank || 0),
            advanceClick: Number(staff.advanceClick || 0),
            advanceCash: Number(staff.advanceCash || staff.advance || 0),
            advance: legacyAdvanceAmount(staff),
            advanceType: normalizeAdvanceType(staff.advanceType || legacyAdvanceType(staff))
        })) : [],
        settings: {
            smallClassFee: 0,
            bigClassFee: 0,
            dormitoryFee: 0,
            ...baseSettings,
            archivePolicyVersion: ARCHIVE_POLICY_VERSION
        }
    };
}

function needsArchiveCleanup(base = {}) {
    const settings = base.settings && typeof base.settings === "object" ? base.settings : {};
    if (settings.archivePolicyVersion !== ARCHIVE_POLICY_VERSION) return true;
    return currentMonthArchive(base.archive).length !== (Array.isArray(base.archive) ? base.archive.length : 0);
}

function currentMonthArchive(archive) {
    const month = new Date().toISOString().slice(0, 7);
    return Array.isArray(archive)
        ? archive.filter((entry) => String(entry.archivedAt || "").slice(0, 7) === month)
        : [];
}

function saveAndRender(form, messageSelector, message) {
    saveState();
    if (form) form.reset();
    if (messageSelector && message) flash(messageSelector, message);
    renderApp();
}

function tutorSalary(item) {
    return (item.studentsCount * item.hours * item.rate) + item.bonus;
}

function sum(items, key) {
    return items.reduce((total, item) => total + Number(item[key] || 0), 0);
}

function groupAmounts(items, labelKey, amountKey) {
    const groups = new Map();
    items.forEach((item) => {
        const label = item[labelKey] || "Boshqa";
        groups.set(label, (groups.get(label) || 0) + Number(item[amountKey] || 0));
    });
    return [...groups.entries()].map(([label, value]) => ({ label, value }));
}

function renderBarChart(selector, items, total) {
    const chart = document.querySelector(selector);
    if (!chart) return;

    const maxValue = Math.max(...items.map((item) => Number(item.value || 0)), 1);
    chart.innerHTML = "";
    items.forEach((item) => {
        const row = document.createElement("div");
        row.className = "chart-row";
        const width = total > 0 ? Math.max((Number(item.value || 0) / maxValue) * 100, 6) : 6;
        row.innerHTML = `
            <span>${escapeHtml(item.label)}</span>
            <div class="chart-track"><i style="width: ${width}%"></i></div>
            <strong>${formatMoney(item.value)} so'm</strong>
        `;
        chart.append(row);
    });
}

function renderIncomeChart(selector, items, total) {
    const chart = document.querySelector(selector);
    if (!chart) return;

    const maxValue = Math.max(...items.map((item) => Number(item.value || 0)), 1);
    let currentPercent = 0;
    const segments = items.map((item) => {
        const percent = total > 0 ? (Number(item.value || 0) / total) * 100 : 0;
        const start = currentPercent;
        currentPercent += percent;
        return `${item.color} ${start}% ${currentPercent}%`;
    }).join(", ");

    chart.innerHTML = `
        <div class="income-chart-layout">
            <div class="donut-chart" style="background: conic-gradient(${total > 0 ? segments : "#243653 0 100%"});">
                <span>${formatMoney(total)}<small>so'm</small></span>
            </div>
            <div class="income-bars"></div>
        </div>
    `;

    const bars = chart.querySelector(".income-bars");
    items.forEach((item) => {
        const row = document.createElement("div");
        row.className = "chart-row";
        const width = total > 0 ? Math.max((Number(item.value || 0) / maxValue) * 100, 6) : 6;
        row.innerHTML = `
            <span><i class="legend-dot" style="background:${item.color}"></i>${escapeHtml(item.label)}</span>
            <div class="chart-track"><i style="width: ${width}%; background:${item.color}"></i></div>
            <strong>${formatMoney(item.value)} so'm</strong>
        `;
        bars.append(row);
    });
}

function value(selector) {
    const element = document.querySelector(selector);
    return element ? String(element.value || "").trim() : "";
}

function numberValue(selector) {
    return Number(value(selector) || 0);
}

function setValue(selector, nextValue) {
    const element = document.querySelector(selector);
    if (element) element.value = nextValue;
}

function createId(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeClass(nextValue) {
    return nextValue.trim().toUpperCase();
}

function normalizeAssignedClasses(nextValue) {
    return String(nextValue || "")
        .split(/[,;\n]+/)
        .map((className) => normalizeClass(className))
        .filter(Boolean)
        .filter((className, index, classes) => classes.indexOf(className) === index)
        .join(", ");
}

function defaultMonthlyFee(className) {
    return isBigClass(className) ? Number(state.settings.bigClassFee || 0) : Number(state.settings.smallClassFee || 0);
}

function isBigClass(className) {
    const grade = Number(String(className || "").match(/\d+/)?.[0] || 0);
    return grade >= 8;
}

function studentPaymentStatus(student) {
    const payments = state.payments.filter((payment) =>
        payment.studentId === student.id &&
        payment.month === currentMonth
    );
    const required = (student.monthlyFee || defaultMonthlyFee(student.className)) +
        (student.dormitory ? (student.dormitoryFee || DORMITORY_FEE) : 0);
    const paid = sum(payments, "paidAmount");
    const debt = Math.max(required - paid, 0);

    return {
        paid,
        debt,
        label: debt ? "To'lanmagan" : "To'langan"
    };
}

function todayFinanceStats() {
    const today = new Date().toISOString().slice(0, 10);
    const todayPayments = state.payments.filter((payment) => String(payment.createdAt || "").slice(0, 10) === today);
    const todayFinance = state.finance.filter((item) => String(item.createdAt || "").slice(0, 10) === today);
    const cash = sum(todayPayments.filter((item) => item.method === "Naqd pul"), "paidAmount");
    const click = sum(todayPayments.filter((item) => item.method === "Click" || item.method === "Click/Payme"), "paidAmount");
    const account = sum(todayPayments.filter((item) => item.method === "Hisob raqam"), "paidAmount");
    const expense = sum(todayFinance.filter((item) => item.type === "Rasxod"), "amount");
    const income = sum(todayPayments, "paidAmount") + sum(todayFinance.filter((item) => item.type !== "Rasxod"), "amount");

    return {
        income,
        cash,
        click,
        account,
        expense,
        net: income - expense
    };
}

function renderFeeSettings() {
    setValue("#smallClassFee", state.settings.smallClassFee || "");
    setValue("#bigClassFee", state.settings.bigClassFee || "");
}

function salaryReportTotals(item = {}) {
    const salaryAmount = Number(item.salaryAmount || item.calculatedSalary || 0);
    const advance = Number(item.advance || 0);
    const loan = Number(item.loan || 0);
    const fine = Number(item.fine || 0);

    const advanceTotal = advance + loan;

    return {
        lessonSalary: 0,
        certificatePayment: 0,
        extraPayment: 0,
        advance: advanceTotal,
        loan,
        total: salaryAmount,
        remaining: Math.max(salaryAmount - fine - advanceTotal, 0)
    };
}

function staffSalaryTotals(item = {}) {
    const salary = Number(item.salary || 0);
    const fine = Number(item.fine || 0);
    const advanceTotal = Number(item.advance || 0) ||
        Number(item.advanceBank || 0) +
        Number(item.advanceClick || 0) +
        Number(item.advanceCash || 0);

    return {
        advanceTotal,
        remaining: Math.max(salary - fine - advanceTotal, 0)
    };
}

function splitAdvanceByType(amount, type) {
    const normalizedType = normalizeAdvanceType(type);
    const value = Number(amount || 0);

    return {
        bank: normalizedType === "Bank orqali" ? value : 0,
        click: normalizedType === "Click" ? value : 0,
        cash: normalizedType === "Naqd pul" ? value : 0
    };
}

function splitServiceAdvanceByType(amount, type) {
    const normalizedType = normalizeServiceAdvanceType(type);
    const value = Number(amount || 0);

    return {
        cash: normalizedType === "Naqd pul" ? value : 0,
        click: normalizedType === "Click" ? value : 0
    };
}

function normalizeAdvanceType(type = "") {
    const lowerType = String(type).trim().toLowerCase();
    if (lowerType.includes("click")) return "Click";
    if (lowerType.includes("naqd")) return "Naqd pul";
    return "Bank orqali";
}

function normalizeServiceAdvanceType(type = "") {
    const lowerType = String(type).trim().toLowerCase();
    if (lowerType.includes("click") || lowerType.includes("klik")) return "Click";
    return "Naqd pul";
}

function legacyAdvanceType(item = {}) {
    if (Number(item.advanceBank || 0) > 0) return "Bank orqali";
    if (Number(item.advanceClick || 0) > 0) return "Click";
    if (Number(item.advanceCash || item.advance || 0) > 0) return "Naqd pul";
    return "Bank orqali";
}

function legacyAdvanceAmount(item = {}) {
    const directAdvance = Number(item.advance || 0);
    if (directAdvance) return directAdvance;
    return Number(item.advanceBank || 0) + Number(item.advanceClick || 0) + Number(item.advanceCash || 0);
}

function formatDate(nextValue) {
    return String(nextValue || "").slice(0, 10) || "-";
}

function closeSidebar() {
    if (!platform || !menuToggle) return;
    platform.classList.remove("sidebar-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Menyuni ochish");
}

function setupSecurityControls() {
    document.addEventListener("contextmenu", (event) => {
        if (!platform.classList.contains("is-hidden")) {
            event.preventDefault();
            showSecurityNotice("O'ng tugma o'chirilgan.");
        }
    });

    document.addEventListener("keydown", (event) => {
        if (platform.classList.contains("is-hidden")) return;

        const key = event.key.toLowerCase();
        const blocksDeveloperTools = event.key === "F12" ||
            (event.ctrlKey && event.shiftKey && ["i", "j", "c"].includes(key)) ||
            (event.ctrlKey && ["u", "s", "p"].includes(key));
        if (blocksDeveloperTools) {
            event.preventDefault();
            showSecurityNotice("Bu amal platformada cheklangan.");
            return;
        }

        if (event.key === "PrintScreen") {
            showSecurityNotice("Skrinshot olish platformada taqiqlangan.");
        }
    });
}

function showSecurityNotice(message) {
    let notice = document.querySelector("#securityNotice");
    if (!notice) {
        notice = document.createElement("div");
        notice.id = "securityNotice";
        notice.className = "security-notice";
        document.body.append(notice);
    }
    notice.textContent = message;
    notice.classList.add("is-visible");
    clearTimeout(showSecurityNotice.timeout);
    showSecurityNotice.timeout = setTimeout(() => notice.classList.remove("is-visible"), 1800);
}

function latestSalaryReportForTeacher(teacherId) {
    return state.salaryReports
        .filter((report) => report.teacherId === teacherId)
        .slice()
        .sort((left, right) => {
            const monthCompare = String(right.month || "").localeCompare(String(left.month || ""));
            if (monthCompare) return monthCompare;
            return state.salaryReports.indexOf(right) - state.salaryReports.indexOf(left);
        })[0];
}

function flash(selector, text) {
    const element = document.querySelector(selector);
    element.textContent = text;
    setTimeout(() => {
        element.textContent = "";
    }, 2400);
}

function formatMoney(nextValue) {
    return new Intl.NumberFormat("uz-UZ").format(Number(nextValue || 0));
}

function shortMoney(nextValue) {
    const value = Number(nextValue || 0);
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)} mln`;
    return formatMoney(value);
}

function escapeHtml(nextValue) {
    return String(nextValue)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
