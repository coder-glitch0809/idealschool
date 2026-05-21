const STORAGE_KEY = "idealSchoolPlatformData";
const THEME_KEY = "idealSchoolTheme";

const defaultUsers = [
    {
        id: "u-superadmin",
        fullName: "IDEAL SCHOOL Superadmin",
        login: "Ideal school",
        password: "idealbeshariq",
        role: "superadmin",
        assignedClass: ""
    },
    {
        id: "u-admin",
        fullName: "IDEAL SCHOOL Admin",
        login: "admin",
        password: "admin123",
        role: "admin",
        assignedClass: ""
    },
    {
        id: "u-zauch",
        fullName: "Zauch",
        login: "zauch",
        password: "zauch123",
        role: "zauch",
        assignedClass: ""
    },
    {
        id: "u-teacher",
        fullName: "O'qituvchi",
        login: "teacher",
        password: "teacher123",
        role: "teacher",
        assignedClass: "5-A"
    }
];

const roleNames = {
    superadmin: "Superadmin",
    admin: "Admin",
    zauch: "Zauch",
    teacher: "O'qituvchi",
    accountant: "Bugalter",
    staff: "Tex xodim"
};

const permissions = {
    superadmin: ["students", "salaryReports", "roles", "teachers", "finance", "services", "payments", "salaries", "tutors", "founders"],
    admin: ["students", "salaryReports", "teachers", "finance", "services", "payments", "salaries", "tutors", "founders"],
    zauch: ["students", "salaryReports", "teachers", "finance", "services", "payments", "salaries", "tutors"],
    accountant: ["students", "finance", "payments", "founders"],
    teacher: ["students"],
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

setValue("#paymentMonth", currentMonth);
setValue("#salaryMonth", currentMonth);
setValue("#tutorMonth", currentMonth);
setValue("#staffMonth", currentMonth);
setValue("#paymentDate", currentDate);
setValue("#expenseDate", currentDate);
applyTheme(localStorage.getItem(THEME_KEY) || "light");
initFirebaseBackend();
loadStateFromServer();
setupNavigation();
setActiveView("dashboard");

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const login = value("#loginUsername");
    const password = value("#loginPassword");
    const user = state.users.find((item) => item.login === login && item.password === password);

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

document.querySelector("#studentForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!can("students")) return;

    const className = currentUser.role === "teacher" ? currentUser.assignedClass : normalizeClass(value("#studentClass"));
    const dormitory = document.querySelector("#studentDormitory").checked;

    state.students.push({
        id: createId("student"),
        name: value("#studentName"),
        className,
        phone: value("#studentPhone"),
        monthlyFee: numberValue("#studentFee") || defaultMonthlyFee(className),
        dormitory,
        dormitoryFee: dormitory ? (numberValue("#studentDormFee") || Number(state.settings.dormitoryFee || 0)) : 0
    });

    saveAndRender(event.target, "#studentMessage", "O'quvchi saqlandi.");
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
        advanceType: value("#salaryReportAdvanceType"),
        paymentTarget: "",
        bankCard: "",
        calculatedSalary: salary.total,
        remainingSalary: salary.remaining,
        createdBy: currentUser.fullName
    });

    saveAndRender(event.target, "#salaryReportMessage", "Oylik hisobot topshirildi.");
});

document.querySelector("#teacherForm").addEventListener("submit", (event) => {
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
        assignedClass: normalizeClass(value("#teacherClass"))
    });

    saveAndRender(event.target, "#teacherMessage", "O'qituvchi saqlandi.");
});

document.querySelector("#userForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!can("roles")) return;

    const login = value("#userLogin");
    if (state.users.some((user) => user.login.toLowerCase() === login.toLowerCase())) {
        flash("#userMessage", "Bu login oldin kiritilgan.");
        return;
    }

    state.users.push({
        id: createId("user"),
        fullName: value("#userFullName"),
        login,
        password: value("#userPassword"),
        role: value("#userRole"),
        assignedClass: normalizeClass(value("#userClass"))
    });

    saveAndRender(event.target);
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

    state.finance.push({
        id: createId("finance"),
        type: "Rasxod",
        expenseType: value("#expenseType"),
        method: value("#expenseMethod"),
        title: value("#financeTitle"),
        quantity: value("#expenseQuantity"),
        amount: numberValue("#financeAmount"),
        expenseDate: value("#expenseDate") || currentDate,
        createdBy: currentUser.fullName,
        createdAt: new Date().toISOString()
    });

    saveAndRender(event.target, "#expenseMessage", "Rasxod saqlandi.");
    setValue("#expenseDate", currentDate);
});

document.querySelector("#feeSettingsForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!can("finance")) return;

    state.settings.smallClassFee = numberValue("#smallClassFee");
    state.settings.bigClassFee = numberValue("#bigClassFee");
    state.settings.dormitoryFee = numberValue("#defaultDormitoryFee");

    saveAndRender(null, "#feeSettingsMessage", "Summalar saqlandi.");
});

document.querySelector("#founderForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!can("founders")) return;

    state.founders.push({
        id: createId("founder"),
        name: value("#founderName"),
        percent: numberValue("#founderPercent")
    });

    saveAndRender(event.target);
    setValue("#serviceJob", "haydovchi");
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

document.querySelector("#paymentClass").addEventListener("change", () => {
    renderPaymentStudentOptions();
    fillRequiredPayment();
});
document.querySelector("#paymentStudent").addEventListener("change", fillRequiredPayment);
document.querySelector("#paymentCategory").addEventListener("change", fillRequiredPayment);
document.querySelector("#dormitoryPaymentButton").addEventListener("click", () => {
    setValue("#paymentCategory", "Yotoqxona");
    fillRequiredPayment();
});
document.querySelector("#financeClassFilter").addEventListener("change", renderFinancePaymentsTable);
[
    "#salaryReportSalary",
    "#salaryReportAdvance",
    "#salaryReportAdvanceType"
].forEach((selector) => document.querySelector(selector).addEventListener("input", renderSalaryReportSummary));

function renderApp() {
    const stats = calculateStats();
    const roleText = roleNames[currentUser.role] || currentUser.role;

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
    document.querySelector("#assignedClassBadge").textContent = currentUser.assignedClass || "Barcha sinflar";
    if (currentUser.role === "teacher") {
        setValue("#studentClass", currentUser.assignedClass);
    }

    applyPermissions();
    renderTeacherOptions();
    renderPaymentClassOptions();
    renderFinanceClassFilter();
    renderPaymentStudentOptions();
    fillRequiredPayment();
    renderPayments();
    renderStudents();
    renderSalaryReports();
    renderSalaryReportSummary();
    renderTeacherSalarySheets();
    renderTeacherFinance();
    renderUsers();
    renderSalaries();
    renderTutors();
    renderFinance();
    renderFinancePaymentsTable();
    renderFounders();
    renderServices();
    renderStaffSalaries();
    renderFeeSettings();
    setActiveView(activeView);
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
    toggleForm("#paymentForm", can("finance"));
    toggleForm("#salaryReportForm", can("salaryReports"));
    toggleForm("#teacherForm", can("teachers"));
    toggleForm("#userForm", can("roles"));
    toggleForm("#salaryForm", can("salaries"));
    toggleForm("#tutorForm", can("tutors"));
    toggleForm("#financeForm", can("finance"));
    toggleForm("#founderForm", can("founders"));
    toggleForm("#serviceForm", can("services"));
    toggleForm("#staffSalaryForm", can("services"));

    ["students", "payments", "zauch", "teachers", "roles", "salaries", "tutors", "monthlyPayments", "expenses", "founders", "staff", "buses"].forEach((id) => {
        const element = document.querySelector(`#${id}`);
        if (element) element.classList.toggle("locked", !can(sectionPermission(id)));
    });
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
            ? (student.dormitoryFee || state.settings.dormitoryFee)
            : student.monthlyFee;
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
            <td>${formatMoney(student.monthlyFee || 0)} so'm</td>
            <td>${formatMoney(status.paid)} so'm</td>
            <td>${formatMoney(status.debt)} so'm</td>
            <td>${student.dormitory ? `${formatMoney(student.dormitoryFee || state.settings.dormitoryFee || 0)} so'm` : "Yo'q"}</td>
            <td></td>
        `;
        appendTableActions(row, "students", student.id);
        table.append(row);
    });
    updateTableWrapVisibility(table);
}

function renderSalaryReports() {
    const list = document.querySelector("#salaryReportList");
    list.innerHTML = "";
    getVisibleSalaryReports().slice().reverse().forEach((item) => {
        const totals = salaryReportTotals(item);
        list.append(recordItem({
            title: `${item.teacherName} - ${item.className || "Sinf kiritilmagan"}`,
            meta: `${item.position || item.subject || "Lavozim kiritilmagan"} | Jami oylik: ${formatMoney(totals.total)} so'm | Avans: ${formatMoney(item.advance || 0)} so'm`,
            note: `Avans turi: ${item.advanceType || "Bank orqali"} | Beriladi: ${formatMoney(totals.remaining)} so'm`,
            id: item.id,
            collection: "salaryReports"
        }));
    });
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
    table.innerHTML = "";
    teachers().forEach((teacher) => {
        if (currentUser.role === "teacher" && teacher.id !== currentUser.id) return;
        const classStudents = state.students.filter((student) => student.className === teacher.assignedClass);
        const classPayments = state.payments.filter((payment) => payment.className === teacher.assignedClass);
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

function renderUsers() {
    const table = document.querySelector("#usersTable");
    table.innerHTML = "";
    state.users.forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${escapeHtml(user.fullName)}</td>
            <td>${escapeHtml(user.login)}</td>
            <td>${escapeHtml(roleNames[user.role] || user.role)}</td>
            <td>${escapeHtml(user.assignedClass || "-")}</td>
            <td></td>
        `;
        const actionCell = row.querySelector("td:last-child");
        actionCell.append(actionButton("O'chirish", "danger", () => removeItem("users", user.id), !can("roles") || user.id === currentUser.id));
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
            `;
            table.append(row);
        });
    updateTableWrapVisibility(table);
}

function renderFounders() {
    const summary = document.querySelector("#founderSummary");
    const list = document.querySelector("#founderList");
    const stats = calculateStats();
    summary.innerHTML = `
        <strong>Sof foyda: ${formatMoney(stats.profit)} so'm</strong>
        <span>Daromad: ${formatMoney(stats.income)} | Rasxod: ${formatMoney(stats.expenses)} | Oyliklar: ${formatMoney(stats.salaryCost)}</span>
    `;
    list.innerHTML = "";
    state.founders.forEach((founder) => {
        const amount = Math.max(stats.profit, 0) * founder.percent / 100;
        list.append(recordItem({
            title: founder.name,
            meta: `${founder.percent}% ulush`,
            note: `Beriladigan pul: ${formatMoney(amount)} so'm`,
            id: founder.id,
            collection: "founders"
        }));
    });
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

function editRecord(collection, id) {
    const item = state[collection].find((entry) => entry.id === id);
    if (!item) return;

    if (collection === "payments") {
        const paid = prompt("To'langan summani tahrirlang", item.paidAmount);
        if (paid !== null) item.paidAmount = Number(paid || 0);
        const method = prompt("To'lov usulini tahrirlang: Naqd pul, Hisob raqam", item.method || "Naqd pul");
        if (method) item.method = method.trim();
        const note = prompt("Chegirma yoki izohni tahrirlang", item.note || "");
        if (note !== null) item.note = note.trim();
        const paymentDate = prompt("Sanani tahrirlang (YYYY-MM-DD)", item.paymentDate || formatDate(item.createdAt) || currentDate);
        if (paymentDate !== null) item.paymentDate = paymentDate.trim();
        const contact = prompt("Aloqa holatini tahrirlang", item.contactStatus);
        if (contact) item.contactStatus = contact.trim();
    }
    if (collection === "students") {
        const fee = prompt("Oylik to'lovni tahrirlang", item.monthlyFee || 0);
        if (fee !== null) item.monthlyFee = Number(fee || 0);
        const phone = prompt("Telefonni tahrirlang", item.phone || "");
        if (phone !== null) item.phone = phone.trim();
        item.dormitory = confirm("O'quvchi yotoqxonada qoladimi?");
        const dormFee = prompt("Yotoqxona to'lovini kiriting", item.dormitoryFee || 0);
        if (dormFee !== null) item.dormitoryFee = Number(dormFee || 0);
    }
    if (collection === "salaryReports") {
        const name = prompt("Ismi sharifni tahrirlang", item.teacherName || "");
        if (name !== null) item.teacherName = name.trim();
        const position = prompt("Lavozimni tahrirlang", item.position || item.subject || "");
        if (position !== null) {
            item.position = position.trim();
            item.subject = item.position;
        }
        const className = prompt("Sinfni tahrirlang", item.className || "");
        if (className !== null) item.className = normalizeClass(className);
        const salary = prompt("Oylik summasini tahrirlang", item.salaryAmount || item.calculatedSalary || 0);
        if (salary !== null) item.salaryAmount = Number(salary || 0);
        const advance = prompt("Avansni tahrirlang", item.advance || 0);
        if (advance !== null) item.advance = Number(advance || 0);
        const advanceType = prompt("Avans turini tahrirlang: Naqd pul, Bank karta, Click", item.advanceType || "Naqd pul");
        if (advanceType !== null) item.advanceType = advanceType.trim();
        const paymentTarget = prompt("Oylik tushadigan joy: Bank karta, Bank orqali, Naqd pul", item.paymentTarget || "Bank karta");
        if (paymentTarget !== null) item.paymentTarget = paymentTarget.trim();
        const bankCard = prompt("Bank karta raqamini tahrirlang", item.bankCard || "");
        if (bankCard !== null) item.bankCard = bankCard.trim();
        const totals = salaryReportTotals(item);
        item.calculatedSalary = totals.total;
        item.remainingSalary = totals.remaining;
    }
    if (collection === "salaries") {
        const advance = prompt("Avans summasini tahrirlang", item.advance);
        if (advance !== null) item.advance = Number(advance || 0);
    }
    if (collection === "tutors") {
        const bonus = prompt("KPI bonusni tahrirlang", item.bonus);
        if (bonus !== null) item.bonus = Number(bonus || 0);
    }
    if (collection === "finance") {
        const title = prompt("Maxsulot/rasxod nomini tahrirlang", item.title || "");
        if (title !== null) item.title = title.trim();
        const quantity = prompt("Sonini tahrirlang", item.quantity || "");
        if (quantity !== null) item.quantity = quantity.trim();
        const amount = prompt("Summani kiriting", item.amount);
        if (amount !== null) item.amount = Number(amount || 0);
        const method = prompt("To'lov turini tahrirlang: Naqd pul, Click, Hisob raqam", item.method || "Naqd pul");
        if (method !== null) item.method = method.trim();
        const expenseDate = prompt("Sanani tahrirlang (YYYY-MM-DD)", item.expenseDate || formatDate(item.createdAt) || currentDate);
        if (expenseDate !== null) item.expenseDate = expenseDate.trim();
    }
    if (collection === "founders") {
        const percent = prompt("Ulush foizini tahrirlang", item.percent);
        if (percent !== null) item.percent = Number(percent || 0);
    }
    if (collection === "services") {
        const name = prompt("Avtobuschi F.I.Sh ni tahrirlang", item.driverName || item.title || "");
        if (name !== null) item.driverName = name.trim();
        const job = prompt("Lavozimini tahrirlang", item.job || "haydovchi");
        if (job !== null) item.job = job.trim();
        const salary = prompt("Beriladigan oylikni tahrirlang", item.salary || 0);
        if (salary !== null) item.salary = Number(salary || 0);
        const advance = prompt("Berilgan avansni tahrirlang", item.advance || 0);
        if (advance !== null) item.advance = Number(advance || 0);
        const advanceType = prompt("Avans turini tahrirlang: Naqd pul, Click", item.advanceType || "Naqd pul");
        if (advanceType !== null) item.advanceType = normalizeServiceAdvanceType(advanceType);
    }
    if (collection === "staffSalaries") {
        const salary = prompt("Oylik summasini tahrirlang", item.salary || 0);
        if (salary !== null) item.salary = Number(salary || 0);
        const fine = prompt("Jarimani tahrirlang", item.fine || 0);
        if (fine !== null) item.fine = Number(fine || 0);
        const totals = staffSalaryTotals(item);
        const advance = prompt("Berilgan avansni tahrirlang", totals.advanceTotal || 0);
        if (advance !== null) item.advance = Number(advance || 0);
        const advanceType = prompt("Avans turini tahrirlang: Bank orqali, Click, Naqd pul", item.advanceType || "Bank orqali");
        if (advanceType !== null) item.advanceType = normalizeAdvanceType(advanceType);
        item.advanceBank = 0;
        item.advanceClick = 0;
        item.advanceCash = 0;
    }

    saveState();
    renderApp();
}

function removeItem(collection, id) {
    if (!confirm("Bu ma'lumot o'chirilsinmi?")) return;
    state[collection] = state[collection].filter((item) => item.id !== id);
    saveState();
    renderApp();
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
        return state.students.filter((item) => item.className === currentUser.assignedClass);
    }
    return state.students;
}

function getVisiblePayments() {
    if (!currentUser) return [];
    if (currentUser.role === "teacher") {
        return state.payments.filter((item) => item.className === currentUser.assignedClass || item.teacherId === currentUser.id);
    }
    return state.payments;
}

function getVisibleSchedules() {
    if (!currentUser) return [];
    if (currentUser.role === "teacher") {
        return state.schedules.filter((item) => item.teacherId === currentUser.id || item.className === currentUser.assignedClass);
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
        ...teachers().map((teacher) => teacher.assignedClass)
    ].filter(Boolean))];
    if (currentUser.role === "teacher") {
        return currentUser.assignedClass ? [currentUser.assignedClass] : [];
    }
    return classes;
}

function teachers() {
    return state.users.filter((user) => user.role === "teacher");
}

function can(permission) {
    return currentUser && (permissions[currentUser.role] || []).includes(permission);
}

function sectionPermission(id) {
    const map = {
        zauch: "salaryReports",
        payments: "payments",
        monthlyPayments: "finance",
        expenses: "finance",
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
            state = normalizeState(data);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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
            state = normalizeState(snapshot.data());
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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
    const users = Array.isArray(base.users) ? base.users.map((user) => ({ subject: "", ...user })) : [];
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
        salaries: Array.isArray(base.salaries) ? base.salaries : [],
        tutors: Array.isArray(base.tutors) ? base.tutors : [],
        founders: Array.isArray(base.founders) ? base.founders : [],
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
            ...(base.settings && typeof base.settings === "object" ? base.settings : {})
        }
    };
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

function value(selector) {
    return document.querySelector(selector).value.trim();
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
        payment.month === currentMonth &&
        (payment.category || "O'qish to'lovi") === "O'qish to'lovi"
    );
    const required = student.monthlyFee || defaultMonthlyFee(student.className);
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
    setValue("#defaultDormitoryFee", state.settings.dormitoryFee || "");
}

function salaryReportTotals(item = {}) {
    const salaryAmount = Number(item.salaryAmount || item.calculatedSalary || 0);
    const advance = Number(item.advance || 0);
    const fine = Number(item.fine || 0);

    return {
        lessonSalary: 0,
        certificatePayment: 0,
        extraPayment: 0,
        advance,
        total: salaryAmount,
        remaining: Math.max(salaryAmount - fine - advance, 0)
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
