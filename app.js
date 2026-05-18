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
const loginScreen = document.querySelector("#loginScreen");
const platform = document.querySelector("#platform");
const loginForm = document.querySelector("#loginForm");
const loginMessage = document.querySelector("#loginMessage");
const logoutBtn = document.querySelector("#logoutBtn");
const themeToggle = document.querySelector("#themeToggle");
const sidebarPanel = document.querySelector("#sidebarPanel");
const sidebarPanelToggle = document.querySelector("#sidebarPanelToggle");

setValue("#paymentMonth", currentMonth);
setValue("#salaryMonth", currentMonth);
setValue("#tutorMonth", currentMonth);
setValue("#salaryReportMonth", currentMonth);
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
});

document.querySelector("#salaryReportForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!can("salaryReports")) return;

    const teacher = state.users.find((user) => user.id === value("#salaryReportTeacher"));
    state.salaryReports.push({
        id: createId("salaryReport"),
        month: value("#salaryReportMonth"),
        teacherId: teacher ? teacher.id : "",
        teacherName: teacher ? teacher.fullName : "",
        workedDays: numberValue("#salaryReportDays"),
        lessonHours: numberValue("#salaryReportHours"),
        note: value("#salaryReportNote"),
        createdBy: currentUser.fullName
    });

    saveAndRender(event.target, "#salaryReportMessage", "Oylik hisobot topshirildi.");
    setValue("#salaryReportMonth", currentMonth);
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
        amount: numberValue("#financeAmount"),
        createdBy: currentUser.fullName,
        createdAt: new Date().toISOString()
    });

    saveAndRender(event.target, "#expenseMessage", "Rasxod saqlandi.");
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
});

document.querySelector("#serviceForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!can("services")) return;

    state.services.push({
        id: createId("service"),
        type: value("#serviceType"),
        title: value("#serviceTitle"),
        createdBy: currentUser.fullName
    });

    saveAndRender(event.target);
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
    renderTeacherFinance();
    renderUsers();
    renderSalaries();
    renderTutors();
    renderFinance();
    renderFinancePaymentsTable();
    renderFounders();
    renderServices();
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

    ["students", "payments", "zauch", "teachers", "roles", "salaries", "tutors", "finance", "founders", "services"].forEach((id) => {
        const element = document.querySelector(`#${id}`);
        if (element) element.classList.toggle("locked", !can(sectionPermission(id)));
    });
}

function renderTeacherOptions() {
    ["#salaryReportTeacher", "#salaryTeacher", "#tutorTeacher"].forEach((selector) => {
        const select = document.querySelector(selector);
        if (!select) return;
        select.innerHTML = "";
        teachers().forEach((teacher) => {
            select.append(new Option(`${teacher.fullName} (${teacher.assignedClass || "sinf yo'q"})`, teacher.id));
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
    const list = document.querySelector("#studentList");
    list.innerHTML = "";
    getVisibleStudents().forEach((student) => {
        const status = studentPaymentStatus(student);
        list.append(recordItem({
            title: `${student.name} - ${status.label}`,
            meta: `${student.className} sinf | Oylik: ${formatMoney(student.monthlyFee || 0)} so'm | To'langan: ${formatMoney(status.paid)} so'm | Qolgan: ${formatMoney(status.debt)} so'm`,
            note: `${student.phone ? `Telefon: ${student.phone}` : "Telefon kiritilmagan"} | Yotoqxona: ${student.dormitory ? formatMoney(student.dormitoryFee || state.settings.dormitoryFee || 0) + " so'm" : "Yo'q"}`,
            id: student.id,
            collection: "students"
        }));
    });
}

function renderSalaryReports() {
    const list = document.querySelector("#salaryReportList");
    list.innerHTML = "";
    getVisibleSalaryReports().slice().reverse().forEach((item) => {
        list.append(recordItem({
            title: `${item.teacherName} - ${item.month}`,
            meta: `${item.workedDays || 0} kun | ${item.lessonHours || 0} dars soati`,
            note: `${item.note || "Izoh kiritilmagan"} | Kiritdi: ${item.createdBy || "-"}`,
            id: item.id,
            collection: "salaryReports"
        }));
    });
}

function renderTeacherFinance() {
    const table = document.querySelector("#teacherFinanceTable");
    table.innerHTML = "";
    teachers().forEach((teacher) => {
        if (currentUser.role === "teacher" && teacher.id !== currentUser.id) return;
        const classStudents = state.students.filter((student) => student.className === teacher.assignedClass);
        const classPayments = state.payments.filter((payment) => payment.className === teacher.assignedClass);
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
    const list = document.querySelector("#financeList");
    const summary = document.querySelector("#financeTodaySummary");
    const today = todayFinanceStats();

    summary.innerHTML = `
        <strong>Bugun: kirim ${formatMoney(today.income)} so'm</strong>
        <span>Chiqim: ${formatMoney(today.expense)} so'm | Farq: ${formatMoney(today.income - today.expense)} so'm</span>
    `;

    list.innerHTML = "";
    state.finance.slice().reverse().forEach((item) => {
        list.append(recordItem({
            title: `${item.type}: ${item.expenseType || item.title}`,
            meta: `${formatMoney(item.amount)} so'm | ${item.method || "Naqd pul"}`,
            note: `${item.title || "Izoh yo'q"} | Kiritdi: ${item.createdBy}`,
            id: item.id,
            collection: "finance"
        }));
    });
}

function renderFinancePaymentsTable() {
    const table = document.querySelector("#financePaymentsTable");
    const classFilter = value("#financeClassFilter") || "all";
    table.innerHTML = "";

    getVisiblePayments()
        .filter((payment) => classFilter === "all" || payment.className === classFilter)
        .forEach((payment) => {
            const debt = Math.max(payment.requiredAmount - payment.paidAmount, 0);
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${escapeHtml(payment.studentName)}</td>
                <td>${escapeHtml(payment.className)}</td>
                <td>${escapeHtml(payment.category || "O'qish to'lovi")}</td>
                <td>${escapeHtml(payment.method || "Naqd pul")}</td>
                <td>${formatMoney(payment.paidAmount)} so'm</td>
                <td>${formatMoney(debt)} so'm</td>
                <td>${payment.dormitory ? "Bor" : "Yo'q"}</td>
            `;
            table.append(row);
        });
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
    const list = document.querySelector("#serviceList");
    list.innerHTML = "";
    state.services.slice().reverse().forEach((item) => {
        list.append(recordItem({
            title: item.type,
            meta: item.title,
            note: `Kiritdi: ${item.createdBy}`,
            id: item.id,
            collection: "services"
        }));
    });
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
        const days = prompt("Ishlagan kunni tahrirlang", item.workedDays || 0);
        if (days !== null) item.workedDays = Number(days || 0);
        const hours = prompt("Dars soatini tahrirlang", item.lessonHours || 0);
        if (hours !== null) item.lessonHours = Number(hours || 0);
        const note = prompt("Hisobot izohini tahrirlang", item.note || "");
        if (note !== null) item.note = note.trim();
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
        const amount = prompt("Summani kiriting", item.amount);
        if (amount !== null) item.amount = Number(amount || 0);
    }
    if (collection === "founders") {
        const percent = prompt("Ulush foizini tahrirlang", item.percent);
        if (percent !== null) item.percent = Number(percent || 0);
    }
    if (collection === "services") {
        const title = prompt("Ma'lumotni tahrirlang", item.title);
        if (title) item.title = title.trim();
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
    const tutorCost = state.tutors.reduce((total, item) => total + tutorSalary(item), 0);
    const debt = state.payments.reduce((total, item) => total + Math.max(item.requiredAmount - item.paidAmount, 0), 0);
    const income = incomeFromPayments + manualIncome;
    const salaryCost = regularSalary + tutorCost;

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
    const map = { zauch: "salaryReports", payments: "payments", teachers: "teachers" };
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
        services: "services"
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
    const users = Array.isArray(base.users) ? base.users : [];
    const savedLogins = new Set(users.map((user) => user.login));

    defaultUsers.forEach((user) => {
        if (!savedLogins.has(user.login)) users.unshift(user);
    });

    return {
        users,
        students: Array.isArray(base.students) ? base.students.map((student) => ({ monthlyFee: 0, dormitory: false, dormitoryFee: 0, ...student })) : [],
        schedules: Array.isArray(base.schedules) ? base.schedules : [],
        salaryReports: Array.isArray(base.salaryReports) ? base.salaryReports : [],
        payments: Array.isArray(base.payments) ? base.payments.map((payment) => ({ category: "O'qish to'lovi", method: "Naqd pul", dormitory: false, ...payment })) : [],
        salaries: Array.isArray(base.salaries) ? base.salaries : [],
        tutors: Array.isArray(base.tutors) ? base.tutors : [],
        founders: Array.isArray(base.founders) ? base.founders : [],
        finance: Array.isArray(base.finance) ? base.finance : [],
        services: Array.isArray(base.services) ? base.services : [],
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

    return {
        income: sum(todayPayments, "paidAmount") + sum(todayFinance.filter((item) => item.type !== "Rasxod"), "amount"),
        expense: sum(todayFinance.filter((item) => item.type === "Rasxod"), "amount")
    };
}

function renderFeeSettings() {
    setValue("#smallClassFee", state.settings.smallClassFee || "");
    setValue("#bigClassFee", state.settings.bigClassFee || "");
    setValue("#defaultDormitoryFee", state.settings.dormitoryFee || "");
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
