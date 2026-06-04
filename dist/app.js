(()=>{var r0=`<section class="login-screen" id="loginScreen">\r
        <div class="login-card">\r
            <img class="login-logo" src="photo_2025-08-11_13-29-10.jpg" alt="IDEAL school logotipi">\r
            <p class="eyebrow">Xavfsiz kirish</p>\r
            <h1>IDEAL SCHOOL platformasi</h1>\r
            <form id="loginForm">\r
                <label>\r
                    Login\r
                    <input id="loginUsername" type="text" autocomplete="username" placeholder="Login" required>\r
                </label>\r
                <label>\r
                    Parol\r
                    <input id="loginPassword" type="password" autocomplete="current-password" placeholder="Parol" required>\r
                </label>\r
                <button type="submit">Platformaga kirish</button>\r
                <p class="form-message" id="loginMessage" aria-live="polite"></p>\r
            </form>\r
        </div>\r
    </section>\r
\r
    <div class="platform is-hidden" id="platform">\r
        <div class="print-blocker" aria-hidden="true">\r
            <strong>IDEAL SCHOOL</strong>\r
            <span>Chop etish va eksportga ruxsat berilmagan.</span>\r
        </div>\r
        <button class="menu-toggle" type="button" id="menuToggle" aria-label="Menyuni ochish" aria-expanded="false">\r
            <span></span>\r
            <span></span>\r
            <span></span>\r
        </button>\r
        <div class="sidebar-backdrop" id="sidebarBackdrop"></div>\r
        <aside class="sidebar">\r
            <a class="brand" href="#dashboard" aria-label="Ideal School dashboard">\r
                <img src="photo_2025-08-11_13-29-10.jpg" alt="IDEAL school logotipi">\r
                <span>\r
                    <strong>IDEAL</strong>\r
                    <small>school platforma</small>\r
                </span>\r
            </a>\r
\r
            <nav class="main-nav" aria-label="Platforma bo'limlari">\r
                <a class="active" href="#dashboard">Dashboard</a>\r
                <a href="#zauchPanel">Zauch</a>\r
                <a href="#zauch">O'qituvchilar oyligi</a>\r
                <a href="#staff">Tex xodimlar</a>\r
                <a href="#buses">Avtobus xizmati</a>\r
                <a href="#students">O'quvchilar</a>\r
                <a href="#attendance">Davomat</a>\r
                <a href="#dormitory">Yotoqxona</a>\r
                <a href="#admissions">Qabul</a>\r
                <a href="#monthlyPayments">Moliya</a>\r
                <a href="#expenses">Rasxodlar</a>\r
                <a href="#roles">Rollar</a>\r
                <a href="#founders">Ta'sischilar</a>\r
                <a href="#archive">Arxiv</a>\r
            </nav>\r
\r
            <div class="sidebar-panel is-collapsed" id="sidebarPanel">\r
                <button class="sidebar-panel-toggle" type="button" id="sidebarPanelToggle" aria-expanded="false" aria-label="Foydalanuvchi ma'lumotini ochish">\r
                    <span id="sidebarPanelIcon">\u0432\u040A\u0453</span>\r
                </button>\r
                <div class="sidebar-panel-content">\r
                    <span>Joriy foydalanuvchi</span>\r
                    <strong id="sidebarRole">Role</strong>\r
                    <p id="sidebarUser">Login orqali kirilmagan.</p>\r
                </div>\r
            </div>\r
        </aside>\r
\r
        <main class="app-shell">\r
            <section class="hero app-view is-active-view" id="dashboard" data-view="dashboard">\r
                <div class="hero-copy">\r
                    <img class="hero-logo" src="photo_2025-08-11_13-29-10.jpg" alt="IDEAL school logotipi">\r
                    <p class="eyebrow">IDEAL SCHOOL boshqaruv paneli</p>\r
                    <h1 id="welcomeTitle">Dashboard</h1>\r
                    <p>To'lovlar, qarzdorlar, o'qituvchi oyligi, avans, repetitor KPI, rasxod va ta'sischilar ulushi bitta moliyaviy tizimda boshqariladi.</p>\r
                </div>\r
                <div class="hero-actions" aria-label="Tezkor amallar">\r
                    <span class="role-chip" id="roleChip">Role</span>\r
                    <button class="icon-button secondary" type="button" id="themeToggle" aria-label="Tungi rejimga o'tish">\u0432\x98\u0455</button>\r
                    <button class="secondary" type="button" id="logoutBtn">Chiqish</button>\r
                </div>\r
            </section>\r
\r
            <section class="metrics app-view is-active-view" data-view="dashboard" aria-label="Asosiy ko'rsatkichlar">\r
                <article>\r
                    <span>O'quvchilar</span>\r
                    <strong id="studentCount">0</strong>\r
                    <small>Kiritilgan real ma'lumotlar</small>\r
                </article>\r
                <article>\r
                    <span>O'qituvchilar</span>\r
                    <strong id="teacherCount">0</strong>\r
                    <small>Rol orqali biriktiriladi</small>\r
                </article>\r
                <article>\r
                    <span>Oylik tushum</span>\r
                    <strong id="incomeCount">0</strong>\r
                    <small>To'lovlar bo'yicha</small>\r
                </article>\r
                <article>\r
                    <span>Qarzdorlik</span>\r
                    <strong id="debtCount">0</strong>\r
                    <small>Aloqaga chiqish kerak</small>\r
                </article>\r
                <article>\r
                    <span>Bugun kelgan</span>\r
                    <strong id="presentCount">0</strong>\r
                    <small>Davomat bo'yicha</small>\r
                </article>\r
                <article>\r
                    <span>Bugun kelmagan</span>\r
                    <strong id="absentCount">0</strong>\r
                    <small id="absentSummary">Sababli: 0 | Davomat bo'yicha</small>\r
                </article>\r
                <article>\r
                    <span>Yotoqxona</span>\r
                    <strong id="dormitoryTotalCount">0</strong>\r
                    <small id="dormitoryDashboardSummary">O'g'il: 0/0 | Qiz: 0/0</small>\r
                </article>\r
            </section>\r
\r
            <section class="dashboard-monitor app-view is-active-view" data-view="dashboard" aria-label="Kunlik moliyaviy monitoring">\r
                <article class="panel">\r
                    <div class="panel-head">\r
                        <div>\r
                            <p class="eyebrow">Kunlik monitoring</p>\r
                            <h2>Tushim diagrammasi</h2>\r
                        </div>\r
                        <span class="status-pill green" id="dailyIncomeBadge">0 so'm</span>\r
                    </div>\r
                    <div class="chart-panel" id="dailyIncomeChart"></div>\r
                </article>\r
                <article class="panel">\r
                    <div class="panel-head">\r
                        <div>\r
                            <p class="eyebrow">Kunlik monitoring</p>\r
                            <h2>Rasxod diagrammasi</h2>\r
                        </div>\r
                        <span class="status-pill" id="dailyExpenseBadge">0 so'm</span>\r
                    </div>\r
                    <div class="chart-panel" id="dailyExpenseChart"></div>\r
                </article>\r
            </section>\r
\r
            <section class="panel app-view is-active-view" id="expenseReminders" data-view="dashboard">\r
                <div class="panel-head">\r
                    <div>\r
                        <p class="eyebrow">Superadmin eslatmalari</p>\r
                        <h2>Kassadan berilgan rasxodlar</h2>\r
                    </div>\r
                    <span class="status-pill" id="expenseReminderCount">0 ta</span>\r
                </div>\r
                <div class="record-list" id="expenseReminderList"></div>\r
            </section>\r
\r
            <section class="panel app-view is-active-view" id="attendanceReminders" data-view="dashboard">\r
                <div class="panel-head">\r
                    <div>\r
                        <p class="eyebrow">Davomat nazorati</p>\r
                        <h2>Davomat olinmagan sinflar</h2>\r
                    </div>\r
                    <span class="status-pill" id="attendanceReminderCount">0 ta</span>\r
                </div>\r
                <div class="record-list" id="attendanceReminderList"></div>\r
            </section>\r
\r
            <section class="panel app-view is-active-view" id="dormitoryAbsentPanel" data-view="dashboard">\r
                <div class="panel-head">\r
                    <div>\r
                        <p class="eyebrow">Yotoqxona nazorati</p>
                        <h2>Yotoqxona davomati va kelmaganlar</h2>
                    </div>\r
                    <span class="status-pill" id="dormitoryAbsentCount">0 ta</span>\r
                </div>\r
                <div class="record-list" id="dormitoryAbsentList"></div>\r
            </section>\r
\r
            <section class="dashboard-grid finance-view app-view" id="payments" data-view="payments">\r
                <article class="panel animated-panel">\r
                    <div class="panel-head">\r
                        <div>\r
                            <p class="eyebrow">Sinf rahbar nazorati</p>\r
                            <h2>O'quvchilar to'lov holati</h2>\r
                        </div>\r
                        <span class="status-pill" id="assignedClassBadge">Sinf tanlanmagan</span>\r
                    </div>\r
                    <div class="record-list" id="paymentList"></div>\r
                </article>\r
            </section>\r
\r
            <section class="section-row view-group group-hidden">\r
                <article class="panel app-view" id="students" data-view="students">\r
                    <div class="panel-head">\r
                        <div>\r
                            <p class="eyebrow">Real ma'lumot kiritish</p>\r
                            <h2>O'quvchi qo'shish</h2>\r
                        </div>\r
                        <span class="status-pill blue">Admin / Zauch</span>\r
                    </div>\r
                    <form id="studentForm">\r
                        <label>\r
                            O'quvchi F.I.Sh\r
                            <input id="studentName" type="text" placeholder="Masalan: Ali Valiyev" required>\r
                        </label>\r
                        <label>\r
                            Sinf\r
                            <input id="studentClass" type="text" placeholder="Masalan: 5-A yoki 8 tabiiy" required>\r
                        </label>\r
                        <label>\r
                            Jinsi\r
                            <select id="studentGender" required>\r
                                <option value="O'g'il bola">O'g'il bola</option>\r
                                <option value="Qiz bola">Qiz bola</option>\r
                            </select>\r
                        </label>\r
                        <label>\r
                            Ota-ona telefoni\r
                            <input id="studentPhone" type="tel" placeholder="+998 90 123 45 67">\r
                        </label>\r
                        <label>\r
                            Oylik to'lov\r
                            <input id="studentFee" type="number" min="0" placeholder="Bo'sh qolsa sinf bo'yicha olinadi">\r
                        </label>\r
                        <label class="check-row">\r
                            <input id="studentDormitory" type="checkbox">\r
                            <span>Yotoqxonada qoladi (+300000 so'm)</span>\r
                        </label>\r
                        <button type="submit">O'quvchini saqlash</button>\r
                        <p class="form-message" id="studentMessage" aria-live="polite"></p>\r
                    </form>\r
                    <div class="table-wrap compact-table">\r
                        <table>\r
                            <thead>\r
                                <tr>\r
                                    <th>F.I.Sh</th>\r
                                    <th>Sinf</th>\r
                                    <th>Jinsi</th>\r
                                    <th>Telefon</th>\r
                                    <th>Oylik</th>\r
                                    <th>To'langan</th>\r
                                    <th>Qolgan</th>\r
                                    <th>Yotoqxona</th>\r
                                    <th>Amal</th>\r
                                </tr>\r
                            </thead>\r
                            <tbody id="studentList"></tbody>\r
                        </table>\r
                    </div>\r
                </article>\r
\r
                <article class="panel zauch-view app-view" id="zauch" data-view="zauch">\r
                    <div class="panel-head">\r
                        <div>\r
                            <p class="eyebrow">O'qituvchilar oyligi</p>\r
                            <h2>O'qituvchi oylik hisobotlari</h2>\r
                        </div>\r
                        <span class="status-pill green">Tahrirlash mumkin</span>\r
                    </div>\r
                    <form id="salaryReportForm">\r
                        <label>\r
                            Ismi sharfi\r
                            <input id="salaryReportFullName" type="text" placeholder="Masalan: Ali Valiyev" required>\r
                        </label>\r
                        <label>\r
                            Lavozimi\r
                            <input id="salaryReportPosition" type="text" placeholder="Masalan: Matematika o'qituvchisi" required>\r
                        </label>\r
                        <label>\r
                            Jami oylik maoshi\r
                            <input id="salaryReportSalary" type="number" min="0" placeholder="0" required>\r
                        </label>\r
                        <label>\r
                            Berilgan avans\r
                            <input id="salaryReportAdvance" type="number" min="0" placeholder="0">\r
                        </label>\r
                        <label>\r
                            Talab bo'lganda berilgan pul (qarz)\r
                            <input id="salaryReportLoan" type="number" min="0" placeholder="0">\r
                        </label>\r
                        <label>\r
                            Avans turi\r
                            <select id="salaryReportAdvanceType">\r
                                <option value="Bank orqali">Bank orqali</option>\r
                                <option value="Click">Click</option>\r
                                <option value="Naqd pul">Naqd pul</option>\r
                            </select>\r
                        </label>\r
                        <label>\r
                            Sinf\r
                            <input id="salaryReportClass" type="text" placeholder="Masalan: 5-A">\r
                        </label>\r
                        <div class="founder-summary form-summary" id="salaryReportSummary"></div>\r
                        <button type="submit">Hisobotni topshirish</button>\r
                        <p class="form-message" id="salaryReportMessage" aria-live="polite"></p>\r
                    </form>\r
                    <div class="form-actions">\r
                        <button type="button" id="exportSalaryReportsBtn">Excelga eksport</button>\r
                        <button type="button" class="secondary" id="importSalaryReportsBtn">Exceldan import</button>\r
                        <input id="salaryReportFileInput" type="file" accept=".xlsx,.xls,.csv" class="visually-hidden">\r
                    </div>\r
                    <div class="table-wrap compact-table">\r
                        <table class="report-table">\r
                            <thead>\r
                                <tr>\r
                                    <th>No</th>\r
                                    <th>Ismi sharfi</th>\r
                                    <th>Lavozimi</th>\r
                                    <th>Sinf</th>\r
                                    <th>Jami oylik</th>\r
                                    <th>Avans</th>\r
                                    <th>Qarz</th>\r
                                    <th>Avans turi</th>\r
                                    <th>Beriladi</th>\r
                                    <th>Izox</th>\r
                                </tr>\r
                            </thead>\r
                            <tbody id="salaryReportList"></tbody>\r
                        </table>\r
                    </div>\r
                </article>\r
            </section>\r
\r
            <section class="panel app-view" id="teachers" data-view="teachers">\r
                <div class="panel-head">\r
                    <div>\r
                        <p class="eyebrow">O'quvchilar</p>\r
                        <h2>Sinf bo'yicha o'quvchilar va to'lov holati</h2>\r
                    </div>\r
                    <span class="status-pill blue">To'lov nazorati</span>\r
                </div>\r
                <form class="wide-form" id="studentClassFilterForm">\r
                    <label>\r
                        Sinf tanlang\r
                        <select id="studentClassFilter"></select>\r
                    </label>\r
                </form>\r
                <div class="table-wrap compact-table">\r
                    <table class="report-table">\r
                        <thead>\r
                            <tr>\r
                                <th>No</th>\r
                                <th>F.I.Sh</th>\r
                                <th>Sinf</th>\r
                                <th>Jinsi</th>\r
                                <th>Telefon</th>\r
                                <th>Oylik</th>\r
                                <th>To'langan</th>\r
                                <th>Qolgan</th>\r
                                <th>Yotoqxona</th>\r
                                <th>Status</th>\r
                            </tr>\r
                        </thead>\r
                        <tbody id="studentByClassTable"></tbody>\r
                    </table>\r
                </div>\r
            </section>\r
\r
            <section class="panel app-view" id="attendance" data-view="attendance">\r
                <div class="panel-head">\r
                    <div>\r
                        <p class="eyebrow">Sinf rahbar nazorati</p>\r
                        <h2>Davomat</h2>\r
                    </div>\r
                    <span class="status-pill blue" id="attendanceClassBadge">Sinf tanlanmagan</span>\r
                </div>\r
                <form class="wide-form" id="attendanceFilterForm">\r
                    <label>\r
                        Sana\r
                        <input id="attendanceDate" type="date" required>\r
                    </label>\r
                    <label>\r
                        Sinf\r
                        <select id="attendanceClass" required></select>\r
                    </label>\r
                </form>\r
                <form id="attendanceForm">\r
                    <div class="table-wrap compact-table">\r
                        <table class="report-table">\r
                            <thead>\r
                                <tr>\r
                                    <th>No</th>\r
                                    <th>O'quvchi F.I.Sh</th>\r
                                    <th>Sinf</th>\r
                                    <th>Holati</th>\r
                                </tr>\r
                            </thead>\r
                            <tbody id="attendanceTable"></tbody>\r
                        </table>\r
                    </div>\r
                    <button type="submit">Davomatni saqlash</button>\r
                    <p class="form-message" id="attendanceMessage" aria-live="polite"></p>\r
                </form>\r
            </section>\r
\r
            <section class="section-row app-view dormitory-view" id="dormitory" data-view="dormitory">\r
                <article class="panel">\r
                    <div class="panel-head">\r
                        <div>\r
                            <p class="eyebrow">Yotoqxona nazorati</p>\r
                            <h2>O'g'il bolalar kechki davomat</h2>
                        </div>\r
                        <span class="status-pill blue" id="dormitoryBoysBadge">0 ta</span>\r
                    </div>\r
                    <form class="wide-form dormitory-attendance-form" data-gender="O'g'il bola" data-table="#dormitoryBoysTable" data-message="#dormitoryBoysMessage">\r
                        <label>\r
                            Sana\r
                            <input id="dormitoryBoysDate" type="date" required>\r
                        </label>\r
                        <div class="table-wrap compact-table">\r
                            <table class="report-table">\r
                                <thead>\r
                                    <tr>\r
                                        <th>No</th>\r
                                        <th>Yotoqxonada</th>\r
                                        <th>O'quvchi F.I.Sh</th>\r
                                        <th>Sinf</th>\r
                                        <th>Holati</th>\r
                                    </tr>\r
                                </thead>\r
                                <tbody id="dormitoryBoysTable"></tbody>\r
                            </table>\r
                        </div>\r
                        <button type="submit">Davomatni saqlash</button>\r
                        <p class="form-message" id="dormitoryBoysMessage" aria-live="polite"></p>\r
                    </form>\r
                </article>\r
\r
                <article class="panel">\r
                    <div class="panel-head">\r
                        <div>\r
                            <p class="eyebrow">Yotoqxona nazorati</p>\r
                            <h2>Qiz bolalar kechki davomat</h2>
                        </div>\r
                        <span class="status-pill blue" id="dormitoryGirlsBadge">0 ta</span>\r
                    </div>\r
                    <form class="wide-form dormitory-attendance-form" data-gender="Qiz bola" data-table="#dormitoryGirlsTable" data-message="#dormitoryGirlsMessage">\r
                        <label>\r
                            Sana\r
                            <input id="dormitoryGirlsDate" type="date" required>\r
                        </label>\r
                        <div class="table-wrap compact-table">\r
                            <table class="report-table">\r
                                <thead>\r
                                    <tr>\r
                                        <th>No</th>\r
                                        <th>Yotoqxonada</th>\r
                                        <th>O'quvchi F.I.Sh</th>\r
                                        <th>Sinf</th>\r
                                        <th>Holati</th>\r
                                    </tr>\r
                                </thead>\r
                                <tbody id="dormitoryGirlsTable"></tbody>\r
                            </table>\r
                        </div>\r
                        <button type="submit">Davomatni saqlash</button>\r
                        <p class="form-message" id="dormitoryGirlsMessage" aria-live="polite"></p>\r
                    </form>\r
                </article>\r
            </section>\r
\r
            <section class="panel app-view" id="admissions" data-view="admissions">\r
                <div class="panel-head">\r
                    <div>\r
                        <p class="eyebrow">2026/2027 o'quv yili</p>\r
                        <h2>Qabul</h2>\r
                    </div>\r
                    <span class="status-pill blue">Kirim va chiqim</span>\r
                </div>\r
                <div class="metrics admissions-metrics" aria-label="Qabul ko'rsatkichlari">\r
                    <article>\r
                        <span>Qabul bo'layotgan</span>\r
                        <strong id="admissionIncomingCount">0</strong>\r
                        <small>Yangi arizalar</small>\r
                    </article>\r
                    <article>\r
                        <span>Qabul qilingan</span>\r
                        <strong id="admissionAcceptedCount">0</strong>\r
                        <small>2026/2027</small>\r
                    </article>\r
                    <article>\r
                        <span>Chiqib ketgan</span>\r
                        <strong id="admissionLeavingCount">0</strong>\r
                        <small>Maktabdan chiqqan</small>\r
                    </article>\r
                </div>\r
                <form id="admissionForm" class="wide-form">\r
                    <label>\r
                        O'quvchi F.I.Sh\r
                        <input id="admissionStudentName" type="text" required>\r
                    </label>\r
                    <label>\r
                        Sinf\r
                        <input id="admissionClassName" type="text" placeholder="Masalan: 7-A" required>\r
                    </label>\r
                    <label>\r
                        Telefon\r
                        <input id="admissionPhone" type="tel">\r
                    </label>\r
                    <label>\r
                        Holati\r
                        <select id="admissionStatus">\r
                            <option value="Kelyapti">Kelyapti</option>\r
                            <option value="Qabul qilindi">Qabul qilindi</option>\r
                            <option value="Chiqib ketdi">Chiqib ketdi</option>\r
                        </select>\r
                    </label>\r
                    <label>\r
                        Sana\r
                        <input id="admissionDate" type="date">\r
                    </label>\r
                    <label>\r
                        Izoh\r
                        <input id="admissionNote" type="text">\r
                    </label>\r
                    <button type="submit">Saqlash</button>\r
                    <p class="form-message" id="admissionMessage" aria-live="polite"></p>\r
                </form>\r
                <div class="table-wrap compact-table">\r
                    <table class="report-table">\r
                        <thead>\r
                            <tr>\r
                                <th>No</th>\r
                                <th>F.I.Sh</th>\r
                                <th>Biriktirish</th>\r
                                <th>Telefon</th>\r
                                <th>Holati</th>\r
                                <th>Sana</th>\r
                                <th>Izoh</th>\r
                                <th>Amal</th>\r
                            </tr>\r
                        </thead>\r
                        <tbody id="admissionTable"></tbody>\r
                    </table>\r
                </div>\r
            </section>\r
\r
            <section class="dashboard-grid salary-view app-view" id="salaries" data-view="salaries">\r
                <article class="panel">\r
                    <div class="panel-head">\r
                        <div>\r
                            <p class="eyebrow">Zauch kiritadi</p>\r
                            <h2>O'qituvchi oyligi va avans</h2>\r
                        </div>\r
                    </div>\r
                    <form id="salaryForm">\r
                        <label>\r
                            Oy\r
                            <input id="salaryMonth" type="month" required>\r
                        </label>\r
                        <label>\r
                            O'qituvchi\r
                            <select id="salaryTeacher" required></select>\r
                        </label>\r
                        <label>\r
                            Jami oylik\r
                            <input id="salaryBase" type="number" min="0" placeholder="0" required>\r
                        </label>\r
                        <label>\r
                            Oldindan olgan pul\r
                            <input id="salaryAdvance" type="number" min="0" placeholder="0">\r
                        </label>\r
                        <label>\r
                            Bonus / KPI\r
                            <input id="salaryBonus" type="number" min="0" placeholder="0">\r
                        </label>\r
                        <button type="submit">Oylikni saqlash</button>\r
                    </form>\r
                </article>\r
                <article class="panel animated-panel">\r
                    <div class="panel-head">\r
                        <div>\r
                            <p class="eyebrow">Qoldiq nazorati</p>\r
                            <h2>Oyliklar ro'yxati</h2>\r
                        </div>\r
                    </div>\r
                    <div class="record-list" id="salaryList"></div>\r
                </article>\r
            </section>\r
\r
            <section class="dashboard-grid tutor-view app-view" id="tutors" data-view="tutors">\r
                <article class="panel">\r
                    <div class="panel-head">\r
                        <div>\r
                            <p class="eyebrow">Repetitor tizimi</p>\r
                            <h2>Soat, bola soni va KPI</h2>\r
                        </div>\r
                    </div>\r
                    <form id="tutorForm">\r
                        <label>\r
                            Oy\r
                            <input id="tutorMonth" type="month" required>\r
                        </label>\r
                        <label>\r
                            Ustoz\r
                            <select id="tutorTeacher" required></select>\r
                        </label>\r
                        <label>\r
                            Bola soni\r
                            <input id="tutorStudents" type="number" min="0" placeholder="0" required>\r
                        </label>\r
                        <label>\r
                            O'tgan soati\r
                            <input id="tutorHours" type="number" min="0" placeholder="0" required>\r
                        </label>\r
                        <label>\r
                            Har bola/soat stavka\r
                            <input id="tutorRate" type="number" min="0" placeholder="0" required>\r
                        </label>\r
                        <label>\r
                            KPI bonus\r
                            <input id="tutorBonus" type="number" min="0" placeholder="0">\r
                        </label>\r
                        <button type="submit">Repetitor oyligini saqlash</button>\r
                    </form>\r
                </article>\r
                <article class="panel animated-panel">\r
                    <div class="panel-head">\r
                        <div>\r
                            <p class="eyebrow">KPI hisob</p>\r
                            <h2>Repetitor oyliklari</h2>\r
                        </div>\r
                    </div>\r
                    <div class="record-list" id="tutorList"></div>\r
                </article>\r
            </section>\r
\r
            <section class="panel app-view" id="roles" data-view="roles">\r
                <div class="panel-head">\r
                    <div>\r
                        <p class="eyebrow">Login, parol va rol</p>\r
                        <h2>Xodimlarni rolga biriktirish</h2>\r
                    </div>\r
                    <span class="status-pill blue">Admin</span>\r
                </div>\r
                <form class="wide-form" id="userForm">\r
                    <label>\r
                        F.I.Sh\r
                        <input id="userFullName" type="text" required>\r
                    </label>\r
                    <label>\r
                        Login\r
                        <input id="userLogin" type="text" required>\r
                    </label>\r
                    <label>\r
                        Parol\r
                        <input id="userPassword" type="text" required>\r
                    </label>\r
                    <label>\r
                        Rol\r
                        <select id="userRole" required>\r
                            <option value="admin">Admin</option>\r
                            <option value="accountant">Bugalter</option>\r
                            <option value="zauch">Zauch</option>\r
                            <option value="teacher">O'qituvchi</option>\r
                            <option value="dormitory">Yotoqxona tarbiyachisi</option>\r
                            <option value="warehouse">Zap xoz</option>\r
                        </select>\r
                    </label>\r
                    <label>\r
                        Javobgar bo'lim\r
                        <select id="userResponsibility" required></select>\r
                    </label>\r
                    <label>\r
                        Biriktirilgan sinflar\r
                        <input id="userClass" type="text" placeholder="O'qituvchi uchun 2 tagacha: 5-A, 7-A">\r
                    </label>\r
                    <label id="userDormitoryGenderWrap" class="is-hidden">\r
                        Yotoqxona guruhi\r
                        <select id="userDormitoryGender">\r
                            <option value="O'g'il bola">O'g'il bolalar</option>\r
                            <option value="Qiz bola">Qiz bolalar</option>\r
                        </select>\r
                    </label>\r
                    <button type="submit">Xodimni saqlash</button>\r
                    <p class="form-message" id="userMessage" aria-live="polite"></p>\r
                </form>\r
                <div class="form-actions">\r
                    <button type="button" id="exportTeachersBtn">O'qituvchilarni Excelga eksport</button>\r
                    <button type="button" class="secondary" id="importTeachersBtn">O'qituvchilarni Exceldan import</button>\r
                    <input id="teachersFileInput" type="file" accept=".xlsx,.xls,.csv" class="visually-hidden">\r
                </div>\r
                <div class="table-wrap compact-table">\r
                    <table>\r
                        <thead>\r
                            <tr>\r
                                <th>F.I.Sh</th>\r
                                <th>Login</th>\r
                                <th>Rol</th>\r
                                <th>Javobgar bo'lim</th>\r
                                <th>Biriktirish</th>\r
                                <th>Amal</th>\r
                            </tr>\r
                        </thead>\r
                        <tbody id="usersTable"></tbody>\r
                    </table>\r
                </div>\r
            </section>\r
\r
            <section class="panel app-view" id="zauchPanel" data-view="zauchPanel">\r
                <div class="panel-head">\r
                    <div>\r
                        <p class="eyebrow">Zauch bo'limi</p>\r
                        <h2>Zauchlar nazorati</h2>\r
                    </div>\r
                    <span class="status-pill blue">Rol orqali boshqariladi</span>\r
                </div>\r
                <div class="table-wrap compact-table">\r
                    <table>\r
                        <thead>\r
                            <tr>\r
                                <th>F.I.Sh</th>\r
                                <th>Login</th>\r
                                <th>Biriktirilgan sinf</th>\r
                                <th>Holati</th>\r
                            </tr>\r
                        </thead>\r
                        <tbody id="zauchTable"></tbody>\r
                    </table>\r
                </div>\r
            </section>\r
\r
            <section class="section-row finance-view view-group group-hidden">\r
                <article class="panel animated-panel app-view" id="monthlyPayments" data-view="monthlyPayments">\r
                    <div class="panel-head">\r
                        <div>\r
                            <p class="eyebrow">Moliya</p>\r
                            <h2>Moliya: o'quvchilar to'lovlari</h2>\r
                        </div>\r
                    </div>\r
                    <div class="founder-summary" id="financeTodaySummary"></div>\r
                    <form id="feeSettingsForm" class="wide-form">\r
                        <label>\r
                            Kichik sinflar to'lovi\r
                            <input id="smallClassFee" type="number" min="0" placeholder="Masalan: 1000000">\r
                        </label>\r
                        <label>\r
                            Katta sinflar to'lovi\r
                            <input id="bigClassFee" type="number" min="0" placeholder="Masalan: 1200000">\r
                        </label>\r
                        <button type="submit">Summalarni saqlash</button>\r
                        <p class="form-message" id="feeSettingsMessage" aria-live="polite"></p>\r
                    </form>\r
                    <form id="paymentForm" class="wide-form">\r
                        <label>\r
                            Oy\r
                            <input id="paymentMonth" type="month" required>\r
                        </label>\r
                        <label>\r
                            Sinf\r
                            <select id="paymentClass" required></select>\r
                        </label>\r
                        <label>\r
                            O'quvchini qidirish\r
                            <input id="paymentStudentSearch" type="search" placeholder="Ism yoki familiya">\r
                        </label>\r
                        <label>\r
                            O'quvchi\r
                            <select id="paymentStudent" required></select>\r
                        </label>\r
                        <label class="visually-hidden">\r
                            To'lashi kerak\r
                            <input id="paymentRequired" type="number" min="0" placeholder="0" required>\r
                        </label>\r
                        <label class="visually-hidden">\r
                            To'lov turi\r
                            <select id="paymentCategory">\r
                                <option value="O'qish to'lovi">O'qish to'lovi</option>\r
                                <option value="Yotoqxona">Yotoqxona</option>\r
                                <option value="Repetitor">Repetitor</option>\r
                                <option value="Transport">Transport</option>\r
                                <option value="Boshqa">Boshqa</option>\r
                            </select>\r
                        </label>\r
                        <label>\r
                            To'lov usuli\r
                            <select id="paymentMethod">\r
                                <option value="Naqd pul">Naqd pul</option>\r
                                <option value="Click">Click</option>\r
                                <option value="Hisob raqam">Hisob raqam</option>\r
                            </select>\r
                        </label>\r
                        <label>\r
                            Chegirma va izoh\r
                            <input id="paymentNote" type="text" placeholder="Masalan: 10% chegirma">\r
                        </label>\r
                        <label>\r
                            Sana\r
                            <input id="paymentDate" type="date">\r
                        </label>\r
                        <label>\r
                            To'lagan summa\r
                            <input id="paymentPaid" type="number" min="0" placeholder="0" required>\r
                        </label>\r
                        <label>\r
                            Aloqa holati\r
                            <select id="paymentContact">\r
                                <option value="Aloqa qilinmagan">Aloqa qilinmagan</option>\r
                                <option value="Telefon qilindi">Telefon qilindi</option>\r
                                <option value="Va'da berdi">Va'da berdi</option>\r
                                <option value="Hal qilindi">Hal qilindi</option>\r
                            </select>\r
                        </label>\r
                        <button type="button" class="secondary" id="dormitoryPaymentButton">Yotoqxona to'lovi</button>\r
                        <button type="submit">To'lovni saqlash</button>\r
                        <p class="form-message" id="paymentMessage" aria-live="polite"></p>\r
                    </form>\r
                    <div class="subsection-head">\r
                        <div>\r
                            <p class="eyebrow">Kassa rasxodlari</p>\r
                            <h3>Rasxodlar</h3>\r
                        </div>\r
                    </div>\r
                    <form id="pendingExpenseForm" class="wide-form">\r
                        <label>\r
                            Kimga berildi\r
                            <input id="pendingExpenseRecipient" type="text" placeholder="Masalan: Ali Valiyev" required>\r
                        </label>\r
                        <label>\r
                            Nima uchun\r
                            <input id="pendingExpenseTitle" type="text" placeholder="Masalan: bo'r, daftar, remont" required>\r
                        </label>\r
                        <label>\r
                            Summa\r
                            <input id="pendingExpenseAmount" type="number" min="0" placeholder="0" required>\r
                        </label>\r
                        <label>\r
                            To'lov usuli\r
                            <select id="pendingExpenseMethod">\r
                                <option value="Naqd pul">Naqd pul</option>\r
                                <option value="Click">Click</option>\r
                                <option value="Hisob raqam">Hisob raqam</option>\r
                            </select>\r
                        </label>\r
                        <label>\r
                            Sana\r
                            <input id="pendingExpenseDate" type="date">\r
                        </label>\r
                        <button type="submit">Rasxodni yozish</button>\r
                        <p class="form-message" id="pendingExpenseMessage" aria-live="polite"></p>\r
                    </form>\r
                    <div class="table-wrap compact-table">\r
                        <table class="report-table">\r
                            <thead>\r
                                <tr>\r
                                    <th>No</th>\r
                                    <th>Kimga</th>\r
                                    <th>Izoh</th>\r
                                    <th>Summa</th>\r
                                    <th>Usul</th>\r
                                    <th>Sana</th>\r
                                    <th>Holati</th>\r
                                </tr>\r
                            </thead>\r
                            <tbody id="pendingExpenseTable"></tbody>\r
                        </table>\r
                    </div>\r
                    <label>\r
                        Sinf filter\r
                        <select id="financeClassFilter"></select>\r
                    </label>\r
                    <label>\r
                        O'quvchini qidirish\r
                        <input id="financePaymentSearch" type="search" placeholder="Ism yoki familiya">\r
                    </label>\r
                    <div class="table-wrap compact-table">\r
                        <table class="report-table">\r
                            <thead>\r
                                <tr>\r
                                    <th>No</th>\r
                                    <th>F.I.Sh</th>\r
                                    <th>Sinf</th>\r
                                    <th>Summa</th>\r
                                    <th>Shakli</th>\r
                                    <th>Chegirma va izoh</th>\r
                                    <th>Sana</th>\r
                                    <th>Amal</th>\r
                                </tr>\r
                            </thead>\r
                            <tbody id="financePaymentsTable"></tbody>\r
                        </table>\r
                    </div>\r
                </article>\r
\r
                <article class="panel animated-panel app-view" id="expenses" data-view="expenses">\r
                    <div class="panel-head">\r
                        <div>\r
                            <p class="eyebrow">Moliya</p>\r
                            <h2>Rasxodlar</h2>\r
                        </div>\r
                    </div>\r
                    <form id="financeForm" class="wide-form">\r
                        <label>\r
                            Rasxod turi\r
                            <input id="expenseType" type="text" placeholder="Masalan: bo'r, daftar, remont" required>\r
                        </label>\r
                        <label class="check-row">\r
                            <input id="expenseSalaryCheckbox" type="checkbox">\r
                            <span>Oldindan avans</span>\r
                        </label>\r
                        <label class="visually-hidden" id="expenseRecipientWrap">\r
                            Ustoz yoki ta'sischini tanlang\r
                            <select id="expenseRecipient"></select>\r
                        </label>\r
                        <label>\r
                            To'lov usuli\r
                            <select id="expenseMethod">\r
                                <option value="Naqd pul">Naqd pul</option>\r
                                <option value="Click">Click</option>\r
                                <option value="Hisob raqam">Hisob raqam</option>\r
                            </select>\r
                        </label>\r
                        <label>\r
                            Izoh\r
                            <input id="financeTitle" type="text" placeholder="Masalan: Kommunal to'lov" required>\r
                        </label>\r
                        <label>\r
                            Soni\r
                            <input id="expenseQuantity" type="text" placeholder="Masalan: 2 dona">\r
                        </label>\r
                        <label>\r
                            Summa\r
                            <input id="financeAmount" type="number" min="0" placeholder="0" required>\r
                        </label>\r
                        <label>\r
                            Sana\r
                            <input id="expenseDate" type="date">\r
                        </label>\r
                        <button type="button" class="secondary" id="advanceExpenseButton">Oldindan avans</button>\r
                        <button type="submit">Rasxodni saqlash</button>\r
                        <p class="form-message" id="expenseMessage" aria-live="polite"></p>\r
                    </form>\r
                    <div class="table-wrap compact-table">\r
                        <table class="report-table">\r
                            <thead>\r
                                <tr>\r
                                    <th>\u0432\u201E\u2013</th>\r
                                    <th>Maxsulot nomi</th>\r
                                    <th>Soni</th>\r
                                    <th>Narxi</th>\r
                                    <th>Rasxod turi</th>\r
                                    <th>Kimga</th>\r
                                    <th>To'lov turi</th>\r
                                    <th>Sanasi</th>\r
                                    <th>Amal</th>\r
                                </tr>\r
                            </thead>\r
                            <tbody id="financeList"></tbody>\r
                        </table>\r
                    </div>\r
                </article>\r
\r
                <article class="panel animated-panel app-view" id="founders" data-view="founders">\r
                    <div class="panel-head">\r
                        <div>\r
                            <p class="eyebrow">Ta'sischilar</p>\r
                            <h2>Sof foyda va ulush</h2>\r
                        </div>\r
                    </div>\r
                    <form id="founderForm">\r
                        <label>\r
                            Ta'sischi F.I.Sh\r
                            <input id="founderName" type="text" required>\r
                        </label>\r
                        <label>\r
                            Ulush foizi\r
                            <input id="founderPercent" type="number" min="0" max="100" placeholder="50" required>\r
                        </label>\r
                        <button type="submit">Ta'sischini saqlash</button>\r
                        <p class="form-message" id="founderMessage" aria-live="polite"></p>\r
                    </form>\r
                    <div class="founder-summary" id="founderSummary"></div>\r
                    <div class="record-list" id="founderList"></div>\r
                </article>\r
            </section>\r
\r
            <section class="panel app-view" id="archive" data-view="archive">\r
                <div class="panel-head">\r
                    <div>\r
                        <p class="eyebrow">Tarix</p>\r
                        <h2>Arxiv</h2>\r
                    </div>\r
                    <span class="status-pill" id="archiveCount">0 ta</span>\r
                </div>\r
                <div class="table-wrap compact-table">\r
                    <table class="report-table">\r
                        <thead>\r
                            <tr>\r
                                <th>Sana</th>\r
                                <th>Bo'lim</th>\r
                                <th>Amal</th>\r
                                <th>Ma'lumot</th>\r
                                <th>Bajardi</th>\r
                            </tr>\r
                        </thead>\r
                        <tbody id="archiveTable"></tbody>\r
                    </table>\r
                </div>\r
            </section>\r
\r
            <section class="section-row view-group group-hidden">\r
                <article class="panel app-view" id="staff" data-view="staff">\r
                    <div class="panel-head">\r
                        <div>\r
                            <p class="eyebrow">Maktab xizmati</p>\r
                            <h2>Tex xodimlar</h2>\r
                        </div>\r
                    </div>\r
                    <form id="staffSalaryForm" class="wide-form">\r
                        <label>\r
                            Tex xodim F.I.Sh\r
                            <input id="staffName" type="text" placeholder="Masalan: Anvar Aliyev" required>\r
                        </label>\r
                        <label>\r
                            Lavozimi / ishi\r
                            <input id="staffJob" type="text" placeholder="Masalan: qorovul" required>\r
                        </label>\r
                        <label>\r
                            Oy\r
                            <input id="staffMonth" type="month" required>\r
                        </label>\r
                        <label>\r
                            Oylik\r
                            <input id="staffSalary" type="number" min="0" placeholder="0" required>\r
                        </label>\r
                        <label>\r
                            Jarima\r
                            <input id="staffFine" type="number" min="0" placeholder="0">\r
                        </label>\r
                        <label>\r
                            Berilgan avans\r
                            <input id="staffAdvance" type="number" min="0" placeholder="0">\r
                        </label>\r
                        <label>\r
                            Avans turi\r
                            <select id="staffAdvanceType">\r
                                <option value="Bank orqali">Bank orqali</option>\r
                                <option value="Click">Click</option>\r
                                <option value="Naqd pul">Naqd pul</option>\r
                            </select>\r
                        </label>\r
                        <button type="submit">Tex xodim qo'shish</button>\r
                        <p class="form-message" id="staffSalaryMessage" aria-live="polite"></p>\r
                    </form>\r
                    <div class="form-actions">\r
                        <button type="button" id="exportStaffBtn">Excelga eksport</button>\r
                        <button type="button" class="secondary" id="importStaffBtn">Exceldan import</button>\r
                        <input id="staffFileInput" type="file" accept=".xlsx,.xls,.csv" class="visually-hidden">\r
                    </div>\r
                    <div class="table-wrap compact-table">\r
                        <table class="report-table">\r
                            <thead>\r
                                <tr>\r
                                    <th rowspan="2">No</th>\r
                                    <th rowspan="2">F.I.Sh</th>\r
                                    <th rowspan="2">Lavozimi</th>\r
                                    <th rowspan="2">Oy</th>\r
                                    <th rowspan="2">Jami oylik maoshi</th>\r
                                    <th rowspan="2">Jarima</th>\r
                                    <th colspan="3">Avans</th>\r
                                    <th rowspan="2">Beriladi</th>\r
                                    <th rowspan="2">Amal</th>\r
                                </tr>\r
                                <tr>\r
                                    <th>Bank orqali</th>\r
                                    <th>Click</th>\r
                                    <th>Naqd</th>\r
                                </tr>\r
                            </thead>\r
                            <tbody id="staffSalaryTable"></tbody>\r
                        </table>\r
                    </div>\r
                </article>\r
\r
                <article class="panel app-view" id="buses" data-view="buses">\r
                    <div class="panel-head">\r
                        <div>\r
                            <p class="eyebrow">Maktab xizmati</p>\r
                            <h2>Avtobus xizmati</h2>\r
                        </div>\r
                    </div>\r
                    <form id="serviceForm" class="wide-form">\r
                        <label>\r
                            Avtobuschi F.I.Sh\r
                            <input id="serviceDriverName" type="text" placeholder="Masalan: Ali Valiyev" required>\r
                        </label>\r
                        <label>\r
                            Lavozimi\r
                            <input id="serviceJob" type="text" placeholder="Masalan: haydovchi">\r
                        </label>\r
                        <label>\r
                            Beriladigan oylik\r
                            <input id="serviceSalary" type="number" min="0" placeholder="0" required>\r
                        </label>\r
                        <label>\r
                            Berilgan avans\r
                            <input id="serviceAdvance" type="number" min="0" placeholder="0">\r
                        </label>\r
                        <label>\r
                            Avans turi\r
                            <select id="serviceAdvanceType">\r
                                <option value="Naqd pul">Naqd pul</option>\r
                                <option value="Click">Click</option>\r
                            </select>\r
                        </label>\r
                        <button type="submit">Avtobuschini saqlash</button>\r
                        <p class="form-message" id="serviceMessage" aria-live="polite"></p>\r
                    </form>\r
                    <div class="form-actions">\r
                        <button type="button" id="exportServicesBtn">Excelga eksport</button>\r
                        <button type="button" class="secondary" id="importServicesBtn">Exceldan import</button>\r
                        <input id="servicesFileInput" type="file" accept=".xlsx,.xls,.csv" class="visually-hidden">\r
                    </div>\r
                    <div class="table-wrap compact-table">\r
                        <table class="report-table">\r
                            <thead>\r
                                <tr>\r
                                    <th>No</th>\r
                                    <th>F.I.Sh</th>\r
                                    <th>Lavozimi</th>\r
                                    <th>Oylik</th>\r
                                    <th>Avans naqd</th>\r
                                    <th>Avans Click</th>\r
                                    <th>Beriladi</th>\r
                                    <th>Amal</th>\r
                                </tr>\r
                            </thead>\r
                            <tbody id="serviceTable"></tbody>\r
                        </table>\r
                    </div>\r
                </article>\r
            </section>\r
        </main>\r
    </div>\r
<div class="modal-overlay is-hidden" id="editSalaryModal" role="dialog" aria-modal="true" aria-labelledby="editSalaryModalTitle">\r
        <div class="modal-panel">\r
            <div class="modal-header">\r
                <div>\r
                    <h2 id="editSalaryModalTitle">Oylik hisobotini tahrirlash</h2>\r
                    <p class="modal-description">Ushbu yerda hisobotni zamonaviy tarzda tahrirlashingiz mumkin.</p>\r
                </div>\r
                <button type="button" class="modal-close" id="closeSalaryModalBtn" aria-label="Yopish">\u0413\u2014</button>\r
            </div>\r
            <form id="salaryReportEditForm" class="modal-form">\r
                <input id="salaryReportEditId" type="hidden">\r
                <label>\r
                    Ismi sharfi\r
                    <input id="salaryReportEditFullName" type="text" required>\r
                </label>\r
                <label>\r
                    Lavozimi\r
                    <input id="salaryReportEditPosition" type="text" required>\r
                </label>\r
                <label>\r
                    Sinf\r
                    <input id="salaryReportEditClass" type="text">\r
                </label>\r
                <label>\r
                    Jami oylik maoshi\r
                    <input id="salaryReportEditSalary" type="number" min="0" required>\r
                </label>\r
                <label>\r
                    Berilgan avans\r
                    <input id="salaryReportEditAdvance" type="number" min="0">\r
                </label>\r
                <label>\r
                    Avans turi\r
                    <select id="salaryReportEditAdvanceType">\r
                        <option value="Bank orqali">Bank orqali</option>\r
                        <option value="Click">Click</option>\r
                        <option value="Naqd pul">Naqd pul</option>\r
                    </select>\r
                </label>\r
                <label>\r
                    To'lov manzili\r
                    <input id="salaryReportEditPaymentTarget" type="text" placeholder="Masalan: Bank karta">\r
                </label>\r
                <label>\r
                    Bank kartasi\r
                    <input id="salaryReportEditBankCard" type="text" placeholder="Masalan: 8600 1234 5678 9012">\r
                </label>\r
                <label>\r
                    Talab bo'lganda berilgan pul (qarz)\r
                    <input id="salaryReportEditLoan" type="number" min="0" placeholder="0">\r
                </label>\r
                <div class="modal-actions">\r
                    <button type="submit">Saqlash</button>\r
                    <button type="button" class="secondary" id="cancelSalaryModalBtn">Bekor qilish</button>\r
                </div>\r
            </form>\r
        </div>\r
    </div>\r
    <div class="modal-overlay is-hidden" id="editServiceModal" role="dialog" aria-modal="true" aria-labelledby="editServiceModalTitle">\r
        <div class="modal-panel">\r
            <div class="modal-header">\r
                <div>\r
                    <h2 id="editServiceModalTitle">Avtobus xizmatini tahrirlash</h2>\r
                    <p class="modal-description">Avtobuschi ma'lumotlarini zamonaviy oynada tahrirlashingiz mumkin.</p>\r
                </div>\r
                <button type="button" class="modal-close" id="closeServiceModalBtn" aria-label="Yopish">\u0413\u2014</button>\r
            </div>\r
            <form id="serviceEditForm" class="modal-form">\r
                <input id="serviceEditId" type="hidden">\r
                <label>\r
                    Avtobuschi F.I.Sh\r
                    <input id="serviceEditDriverName" type="text" required>\r
                </label>\r
                <label>\r
                    Lavozimi\r
                    <input id="serviceEditJob" type="text">\r
                </label>\r
                <label>\r
                    Oylik\r
                    <input id="serviceEditSalary" type="number" min="0" required>\r
                </label>\r
                <label>\r
                    Avans\r
                    <input id="serviceEditAdvance" type="number" min="0">\r
                </label>\r
                <label>\r
                    Avans turi\r
                    <select id="serviceEditAdvanceType">\r
                        <option value="Naqd pul">Naqd pul</option>\r
                        <option value="Click">Click</option>\r
                    </select>\r
                </label>\r
                <div class="modal-actions">\r
                    <button type="submit">Saqlash</button>\r
                    <button type="button" class="secondary" id="cancelServiceModalBtn">Bekor qilish</button>\r
                </div>\r
            </form>\r
        </div>\r
    </div>\r
    <div class="modal-overlay is-hidden" id="editFinanceModal" role="dialog" aria-modal="true" aria-labelledby="editFinanceModalTitle">\r
        <div class="modal-panel">\r
            <div class="modal-header">\r
                <div>\r
                    <h2 id="editFinanceModalTitle">Rasxodni tahrirlash</h2>\r
                    <p class="modal-description">Rasxod ma'lumotlarini oynadan chiqmasdan tartibli yangilang.</p>\r
                </div>\r
                <button type="button" class="modal-close" id="closeFinanceModalBtn" aria-label="Yopish">\u0413\u2014</button>\r
            </div>\r
            <form id="financeEditForm" class="modal-form modal-grid">\r
                <input id="financeEditId" type="hidden">\r
                <label>\r
                    Rasxod turi\r
                    <input id="financeEditExpenseType" type="text" placeholder="Masalan: Ofis jihozlari" required>\r
                </label>\r
                <label>\r
                    To'lov usuli\r
                    <select id="financeEditMethod">\r
                        <option value="Naqd pul">Naqd pul</option>\r
                        <option value="Click">Click</option>\r
                        <option value="Hisob raqam">Hisob raqam</option>\r
                    </select>\r
                </label>\r
                <label>\r
                    Izoh\r
                    <input id="financeEditTitle" type="text" required>\r
                </label>\r
                <label>\r
                    Soni\r
                    <input id="financeEditQuantity" type="text">\r
                </label>\r
                <label>\r
                    Summa\r
                    <input id="financeEditAmount" type="number" min="0" required>\r
                </label>\r
                <label>\r
                    Sana\r
                    <input id="financeEditDate" type="date">\r
                </label>\r
                <div class="modal-actions">\r
                    <button type="submit">Saqlash</button>\r
                    <button type="button" class="secondary" id="cancelFinanceModalBtn">Bekor qilish</button>\r
                </div>\r
            </form>\r
        </div>\r
    </div>\r
`;document.body.insertAdjacentHTML("afterbegin",r0);var be="idealSchoolPlatformData",C0="idealSchoolTheme",I=3e5,Pe="monthly-archive-v1",xe={latitude:40.437865,longitude:70.605491,radiusMeters:100},X0=[{id:"u-superadmin",fullName:"IDEAL SCHOOL Superadmin",login:"Ideal school",password:"idealbeshariq",role:"superadmin",assignedClass:""}],L0={superadmin:"Superadmin",admin:"Admin",zauch:"Zauch",teacher:"O'qituvchi",dormitory:"Yotoqxona tarbiyachisi",accountant:"Bugalter",warehouse:"Zap xoz",staff:"Tex xodim"},P={admin:"Barcha bo'limlar",accountant:"Moliya",zauch:"Zauch bo'limi",teacher:"O'quvchilar",dormitory:"Yotoqxona",warehouse:"Zap xoz"},w0={"Barcha bo'limlar":["dashboard","zauchPanel","zauch","staff","buses","students","teachers","attendance","dormitory","admissions","roles","salaries","tutors","monthlyPayments","expenses","founders","archive"],Moliya:["monthlyPayments","expenses"],"Zauch bo'limi":["zauchPanel","zauch","salaries","tutors","students","teachers","attendance","dormitory"],"O'quvchilar":["students","teachers","attendance"],Yotoqxona:["dormitory"],"Zap xoz":["staff","buses"]},V0={superadmin:["students","attendance","dormitoryAttendance","admissions","salaryReports","roles","teachers","finance","services","payments","salaries","tutors","founders"],admin:["students","attendance","dormitoryAttendance","admissions","salaryReports","roles","teachers","finance","services","payments","salaries","tutors","founders"],zauch:["students","attendance","salaryReports","teachers","salaries","tutors"],accountant:["finance"],warehouse:["services"],teacher:["students","attendance"],dormitory:["dormitoryAttendance"],staff:["services"]},s=sa(),i=null,G="dashboard",J=null,je=!1,pe=!1,R=new Date().toISOString().slice(0,7),f=new Date().toISOString().slice(0,10),$0=document.querySelector("#loginScreen"),j=document.querySelector("#platform"),M0=document.querySelector("#loginForm"),u0=document.querySelector("#loginMessage"),Z0=document.querySelector("#logoutBtn"),Ke=document.querySelector("#themeToggle"),W0=document.querySelector("#sidebarPanel"),i0=document.querySelector("#sidebarPanelToggle"),W=document.querySelector("#menuToggle"),U0=document.querySelector("#sidebarBackdrop"),ke=document.querySelector("#exportSalaryReportsBtn"),Ee=document.querySelector("#importSalaryReportsBtn"),U=document.querySelector("#salaryReportFileInput"),Ne=document.querySelector("#exportTeachersBtn"),Ae=document.querySelector("#importTeachersBtn"),ee=document.querySelector("#teachersFileInput"),Te=document.querySelector("#exportStaffBtn"),Ce=document.querySelector("#importStaffBtn"),te=document.querySelector("#staffFileInput"),Le=document.querySelector("#exportServicesBtn"),we=document.querySelector("#importServicesBtn"),ae=document.querySelector("#servicesFileInput"),Y=document.querySelector("#editSalaryModal"),$e=document.querySelector("#salaryReportEditForm"),Me=document.querySelector("#closeSalaryModalBtn"),Re=document.querySelector("#cancelSalaryModalBtn"),_=document.querySelector("#editServiceModal"),Fe=document.querySelector("#serviceEditForm"),Be=document.querySelector("#closeServiceModalBtn"),Oe=document.querySelector("#cancelServiceModalBtn"),H=document.querySelector("#editFinanceModal"),Ie=document.querySelector("#financeEditForm"),De=document.querySelector("#closeFinanceModalBtn"),ze=document.querySelector("#cancelFinanceModalBtn");y("#paymentMonth",R);y("#salaryMonth",R);y("#tutorMonth",R);y("#staffMonth",R);y("#paymentDate",f);y("#expenseDate",f);y("#pendingExpenseDate",f);y("#attendanceDate",f);y("#dormitoryBoysDate",f);y("#dormitoryGirlsDate",f);y("#admissionDate",f);P0(localStorage.getItem(C0)||"light");oa();ca();tt();qa();le("dashboard");M0.addEventListener("submit",e=>{e.preventDefault();let t=m("#loginUsername").toLowerCase(),a=m("#loginPassword"),n=s.users.find(r=>String(r.login||"").trim().toLowerCase()===t&&String(r.password||"")===a);if(!n){u0.textContent="Login yoki parol noto'g'ri.";return}i=n,u0.textContent="",$0.classList.add("is-hidden"),j.classList.remove("is-hidden"),x(),le(G)});Z0.addEventListener("click",()=>{i=null,j.classList.add("is-hidden"),$0.classList.remove("is-hidden"),M0.reset()});Ke.addEventListener("click",()=>{let e=document.body.classList.contains("dark-theme")?"light":"dark";P0(e)});W.addEventListener("click",()=>{let e=j.classList.toggle("sidebar-open");W.setAttribute("aria-expanded",String(e)),W.setAttribute("aria-label",e?"Menyuni yopish":"Menyuni ochish")});U0.addEventListener("click",_0);i0.addEventListener("click",()=>{let e=W0.classList.toggle("is-collapsed");i0.setAttribute("aria-expanded",String(!e)),document.querySelector("#sidebarPanelIcon").textContent=e?"\u2303":"\u2304"});ke==null||ke.addEventListener("click",bt);Ee==null||Ee.addEventListener("click",()=>U==null?void 0:U.click());U==null||U.addEventListener("change",yt);Ne==null||Ne.addEventListener("click",qt);Ae==null||Ae.addEventListener("click",()=>ee==null?void 0:ee.click());ee==null||ee.addEventListener("change",ft);Te==null||Te.addEventListener("click",kt);Ce==null||Ce.addEventListener("click",()=>te==null?void 0:te.click());te==null||te.addEventListener("change",gt);Le==null||Le.addEventListener("click",Nt);we==null||we.addEventListener("click",()=>ae==null?void 0:ae.click());ae==null||ae.addEventListener("change",St);$e==null||$e.addEventListener("submit",lt);Me==null||Me.addEventListener("click",ve);Re==null||Re.addEventListener("click",ve);Y==null||Y.addEventListener("click",e=>{e.target===Y&&ve()});Fe==null||Fe.addEventListener("submit",mt);Be==null||Be.addEventListener("click",fe);Oe==null||Oe.addEventListener("click",fe);_==null||_.addEventListener("click",e=>{e.target===_&&fe()});Ie==null||Ie.addEventListener("submit",ht);De==null||De.addEventListener("click",ge);ze==null||ze.addEventListener("click",ge);H==null||H.addEventListener("click",e=>{e.target===H&&ge()});document.querySelector("#studentForm").addEventListener("submit",e=>{if(e.preventDefault(),!v("students"))return;let t=K(m("#studentClass"));if(i.role==="teacher"&&!F(i).includes(t)){S("#studentMessage","Faqat o'zingizga biriktirilgan sinfga o'quvchi qo'sha olasiz.");return}let a=document.querySelector("#studentDormitory").checked;s.students.push({id:k("student"),name:m("#studentName"),className:t,gender:m("#studentGender"),phone:m("#studentPhone"),monthlyFee:g("#studentFee")||e0(t),dormitory:a,dormitoryFee:a?I:0}),C(e.target,"#studentMessage","O'quvchi saqlandi.")});var c0;(c0=document.querySelector("#attendanceForm"))==null||c0.addEventListener("submit",async e=>{var u;if(e.preventDefault(),!v("attendance"))return;let t=m("#attendanceDate")||f,a=m("#attendanceClass"),n=[...document.querySelectorAll("#attendanceTable tr[data-student-id]")];if(!a||!n.length){S("#attendanceMessage","Davomat uchun sinf va o'quvchilar mavjud emas.");return}let r=await aa();if(!r.allowed){S("#attendanceMessage",r.message);return}n.forEach(o=>{var N,w,q;let d=o.dataset.studentId,c=s.students.find(B=>B.id===d);if(!c)return;let p=s.attendance.find(B=>B.date===t&&B.studentId===d),b={id:(p==null?void 0:p.id)||k("attendance"),date:t,className:a,studentId:d,studentName:c.name,status:o.querySelector("select").value,teacherId:i.id,teacherName:i.fullName,locationDistanceMeters:(N=r.distanceMeters)!=null?N:"",locationLatitude:(w=r.latitude)!=null?w:"",locationLongitude:(q=r.longitude)!=null?q:"",updatedAt:new Date().toISOString()};p?Object.assign(p,b):s.attendance.push(b)}),M("attendance","Davomat saqlandi",{className:a,date:t,teacherName:i.fullName,locationDistanceMeters:(u=r.distanceMeters)!=null?u:""}),E(),S("#attendanceMessage","Davomat saqlandi."),x()});document.querySelectorAll(".dormitory-attendance-form").forEach(e=>{e.addEventListener("submit",t=>{var c;if(t.preventDefault(),!v("dormitoryAttendance"))return;let a=e.dataset.gender;if(i.role==="dormitory"&&i.dormitoryGender!==a){S(e.dataset.message,"Faqat o'zingizga biriktirilgan yotoqxona guruhini saqlay olasiz.");return}let n=e.dataset.table,r=e.dataset.message,u=((c=e.querySelector('input[type="date"]'))==null?void 0:c.value)||f;if(i.role==="dormitory"&&he(a,u,i.id)){S(r,"Bugungi yotoqxona davomati topshirilgan. O'zgartirish uchun admin yoki superadminga murojaat qiling.");return}let o=[...document.querySelectorAll(`${n} tr[data-student-id]`)],d=o.filter(p=>{var b;return(b=p.querySelector("[data-dormitory-check]"))==null?void 0:b.checked});if(!o.length){S(r,"Yotoqxona davomatida o'quvchilar mavjud emas.");return}o.forEach(p=>{var Z;let b=p.dataset.studentId,N=s.students.find(z=>z.id===b);if(!N)return;let w=((Z=p.querySelector("[data-dormitory-check]"))==null?void 0:Z.checked)||!1;if(N.dormitory=w,N.dormitoryFee=w?I:0,!w)return;let q=s.dormitoryAttendance.find(z=>z.date===u&&z.studentId===b),B={id:(q==null?void 0:q.id)||k("dormitoryAttendance"),date:u,gender:a,className:N.className,studentId:b,studentName:N.name,status:p.querySelector("select").value,teacherId:i.id,teacherName:i.fullName,updatedAt:new Date().toISOString()};q?Object.assign(q,B):s.dormitoryAttendance.push(B)}),M("dormitoryAttendance","Yotoqxona davomati saqlandi",{gender:a,date:u,total:d.length,teacherName:i.fullName}),E(),S(r,"Yotoqxona davomati saqlandi."),x()})});document.querySelector("#paymentForm").addEventListener("submit",e=>{if(e.preventDefault(),!v("finance"))return;let t=s.students.find(a=>a.id===m("#paymentStudent"));if(!t){S("#paymentMessage","Avval o'quvchi tanlang.");return}s.payments.push({id:k("payment"),month:m("#paymentMonth"),className:m("#paymentClass"),studentId:t.id,studentName:t.name,phone:t.phone,category:m("#paymentCategory"),method:m("#paymentMethod"),note:m("#paymentNote"),paymentDate:m("#paymentDate")||f,dormitory:!!t.dormitory,requiredAmount:g("#paymentRequired"),paidAmount:g("#paymentPaid"),contactStatus:m("#paymentContact"),cashierId:i.id,cashierName:i.fullName,createdAt:new Date().toISOString()}),C(e.target,"#paymentMessage","To'lov saqlandi."),y("#paymentMonth",R),y("#paymentDate",f)});document.querySelector("#salaryReportForm").addEventListener("submit",e=>{if(e.preventDefault(),!v("salaryReports"))return;let t=V({salaryAmount:g("#salaryReportSalary"),advance:g("#salaryReportAdvance")});s.salaryReports.push({id:k("salaryReport"),month:R,teacherId:"",teacherName:m("#salaryReportFullName"),position:m("#salaryReportPosition"),subject:m("#salaryReportPosition"),className:K(m("#salaryReportClass")),salaryAmount:g("#salaryReportSalary"),advance:g("#salaryReportAdvance"),loan:g("#salaryReportLoan"),advanceType:m("#salaryReportAdvanceType"),paymentTarget:"",bankCard:"",calculatedSalary:t.total,remainingSalary:t.remaining,createdBy:i.fullName}),C(e.target,"#salaryReportMessage","Oylik hisobot topshirildi.")});var o0;(o0=document.querySelector("#teacherForm"))==null||o0.addEventListener("submit",e=>{if(e.preventDefault(),!v("teachers"))return;let t=m("#teacherLogin");if(s.users.some(n=>n.login.toLowerCase()===t.toLowerCase())){S("#teacherMessage","Bu login oldin kiritilgan.");return}let a=Se(m("#teacherClass"));if(F({assignedClass:a}).length>2){S("#teacherMessage","O'qituvchiga ko'pi bilan 2 ta sinf biriktiriladi.");return}s.users.push({id:k("user"),fullName:m("#teacherFullName"),login:t,password:m("#teacherPassword"),role:"teacher",subject:m("#teacherSubject"),assignedClass:a}),C(e.target,"#teacherMessage","O'qituvchi saqlandi.")});document.querySelector("#userForm").addEventListener("submit",e=>{if(e.preventDefault(),!v("roles"))return;let t=m("#userLogin"),a=m("#userRole");if(!["admin","accountant","zauch","teacher","dormitory","warehouse"].includes(a)){S("#userMessage","Faqat admin, bugalter, zauch, o'qituvchi, yotoqxona tarbiyachisi va zap xoz rollari beriladi.");return}if(s.users.some(u=>String(u.login||"").toLowerCase()===t.toLowerCase())){S("#userMessage","Bu login oldin kiritilgan.");return}let r=Se(m("#userClass"));if(a==="teacher"&&F({assignedClass:r}).length>2){S("#userMessage","O'qituvchiga ko'pi bilan 2 ta sinf biriktiriladi.");return}s.users.push({id:k("user"),fullName:m("#userFullName"),login:t,password:m("#userPassword"),role:a,responsibility:P[a]||m("#userResponsibility"),assignedClass:a==="dormitory"?"":r,dormitoryGender:a==="dormitory"?m("#userDormitoryGender"):""}),C(e.target,"#userMessage","Rol saqlandi.")});document.querySelector("#salaryForm").addEventListener("submit",e=>{if(e.preventDefault(),!v("salaries"))return;let t=s.users.find(a=>a.id===m("#salaryTeacher"));s.salaries.push({id:k("salary"),month:m("#salaryMonth"),teacherId:t?t.id:"",teacherName:t?t.fullName:"",baseSalary:g("#salaryBase"),advance:g("#salaryAdvance"),bonus:g("#salaryBonus"),createdBy:i.fullName}),C(e.target),y("#salaryMonth",R)});document.querySelector("#tutorForm").addEventListener("submit",e=>{if(e.preventDefault(),!v("tutors"))return;let t=s.users.find(a=>a.id===m("#tutorTeacher"));s.tutors.push({id:k("tutor"),month:m("#tutorMonth"),teacherId:t?t.id:"",teacherName:t?t.fullName:"",studentsCount:g("#tutorStudents"),hours:g("#tutorHours"),rate:g("#tutorRate"),bonus:g("#tutorBonus"),createdBy:i.fullName}),C(e.target),y("#tutorMonth",R)});document.querySelector("#financeForm").addEventListener("submit",e=>{var d;if(e.preventDefault(),!v("finance"))return;let t=((d=document.querySelector("#expenseSalaryCheckbox"))==null?void 0:d.checked)||!1,a=t&&document.querySelector("#expenseRecipient")?m("#expenseRecipient"):"",n=a?s.users.find(c=>c.id===a&&c.role==="teacher"):null,r=a?s.founders.find(c=>c.id===a):null,u=t?"Oldindan avans":m("#expenseType")||"Rasxod",o=g("#financeAmount");s.finance.push({id:k("finance"),type:"Rasxod",expenseType:u,recipientId:a,salaryAdvance:t,recipientName:(n==null?void 0:n.fullName)||(r==null?void 0:r.name)||"",recipientType:n?"teacher":r?"founder":"",method:m("#expenseMethod"),title:m("#financeTitle"),quantity:m("#expenseQuantity"),amount:o,expenseDate:m("#expenseDate")||f,createdById:i.id,createdBy:i.fullName,createdAt:new Date().toISOString()}),t&&n&&s.salaryReports.push({id:k("salaryReport"),month:R,teacherId:n.id,teacherName:n.fullName,position:n.subject||"O'qituvchi",subject:n.subject||"O'qituvchi",className:n.assignedClass||"",salaryAmount:0,advance:o,loan:0,advanceType:m("#expenseMethod"),paymentTarget:"Oldindan avans",bankCard:"",calculatedSalary:0,remainingSalary:0,createdBy:i.fullName}),t&&r&&M("founders","Ta'sischiga avans berildi",{name:r.name,amount:o,method:m("#expenseMethod")}),C(e.target,"#expenseMessage","Rasxod saqlandi."),y("#expenseDate",f),y("#expenseType",""),document.querySelector("#expenseSalaryCheckbox").checked=!1,oe()});var l0;(l0=document.querySelector("#pendingExpenseForm"))==null||l0.addEventListener("submit",e=>{e.preventDefault(),v("finance")&&(s.pendingExpenses.push({id:k("pendingExpense"),recipientName:m("#pendingExpenseRecipient"),title:m("#pendingExpenseTitle"),amount:g("#pendingExpenseAmount"),method:m("#pendingExpenseMethod"),expenseDate:m("#pendingExpenseDate")||f,createdById:i.id,createdBy:i.fullName,createdAt:new Date().toISOString()}),C(e.target,"#pendingExpenseMessage","Rasxod superadmin eslatmasiga yuborildi."),y("#pendingExpenseDate",f))});document.querySelector("#feeSettingsForm").addEventListener("submit",e=>{e.preventDefault(),v("finance")&&(s.settings.smallClassFee=g("#smallClassFee"),s.settings.bigClassFee=g("#bigClassFee"),C(null,"#feeSettingsMessage","Summalar saqlandi."))});document.querySelector("#founderForm").addEventListener("submit",e=>{if(e.preventDefault(),!v("founders"))return;let t=g("#founderPercent"),a=s.founders.reduce((n,r)=>n+Number(r.percent||0),0);if(a+t>100){S("#founderMessage",`Ta'sischilar ulushi 100% dan oshmasligi kerak. Qoldiq: ${100-a}%.`);return}s.founders.push({id:k("founder"),name:m("#founderName"),percent:t}),C(e.target),y("#serviceJob","haydovchi")});var d0;(d0=document.querySelector("#admissionForm"))==null||d0.addEventListener("submit",e=>{e.preventDefault(),v("admissions")&&(s.admissions.push({id:k("admission"),schoolYear:"2026/2027",studentName:m("#admissionStudentName"),className:K(m("#admissionClassName")),phone:m("#admissionPhone"),status:m("#admissionStatus"),admissionDate:m("#admissionDate")||f,note:m("#admissionNote"),createdBy:i.fullName}),M("admissions","Qabul ma'lumoti qo'shildi",s.admissions[s.admissions.length-1]),C(e.target,"#admissionMessage","Qabul ma'lumoti saqlandi."),y("#admissionDate",f))});document.querySelector("#serviceForm").addEventListener("submit",e=>{e.preventDefault(),v("services")&&(s.services.push({id:k("service"),type:"Avtobus",driverName:m("#serviceDriverName"),job:m("#serviceJob")||"haydovchi",salary:g("#serviceSalary"),advance:g("#serviceAdvance"),advanceType:m("#serviceAdvanceType"),createdBy:i.fullName}),C(e.target))});document.querySelector("#staffSalaryForm").addEventListener("submit",e=>{e.preventDefault(),v("services")&&(s.staffSalaries.push({id:k("staffSalary"),name:m("#staffName"),job:m("#staffJob"),month:m("#staffMonth"),salary:g("#staffSalary"),fine:g("#staffFine"),advance:g("#staffAdvance"),advanceType:m("#staffAdvanceType"),createdBy:i.fullName}),C(e.target,"#staffSalaryMessage","Tex xodim oyligi saqlandi."),y("#staffMonth",R))});var m0;(m0=document.querySelector("#paymentClass"))==null||m0.addEventListener("change",()=>{Qe(),ne()});var p0;(p0=document.querySelector("#paymentStudentSearch"))==null||p0.addEventListener("input",()=>{Qe(),ne()});var h0;(h0=document.querySelector("#paymentStudent"))==null||h0.addEventListener("change",ne);var y0;(y0=document.querySelector("#paymentCategory"))==null||y0.addEventListener("change",ne);var b0;(b0=document.querySelector("#dormitoryPaymentButton"))==null||b0.addEventListener("click",()=>{y("#paymentCategory","Yotoqxona"),ne(),y("#paymentPaid",g("#paymentPaid")+I)});var v0;(v0=document.querySelector("#financeClassFilter"))==null||v0.addEventListener("change",Xe);var f0;(f0=document.querySelector("#financePaymentSearch"))==null||f0.addEventListener("input",Xe);var g0;(g0=document.querySelector("#studentClassFilter"))==null||g0.addEventListener("change",B0);var S0;(S0=document.querySelector("#attendanceClass"))==null||S0.addEventListener("change",Ye);var q0;(q0=document.querySelector("#attendanceDate"))==null||q0.addEventListener("change",Ye);var x0;(x0=document.querySelector("#dormitoryBoysDate"))==null||x0.addEventListener("change",_e);var k0;(k0=document.querySelector("#dormitoryGirlsDate"))==null||k0.addEventListener("change",_e);var E0;(E0=document.querySelector("#userRole"))==null||E0.addEventListener("change",R0);var N0;(N0=document.querySelector("#expenseSalaryCheckbox"))==null||N0.addEventListener("change",oe);var A0;(A0=document.querySelector("#advanceExpenseButton"))==null||A0.addEventListener("click",()=>{let e=document.querySelector("#expenseSalaryCheckbox");e&&(e.checked=!0),y("#expenseType","Oldindan avans"),oe()});["#salaryReportSalary","#salaryReportAdvance","#salaryReportAdvanceType"].forEach(e=>{var t;return(t=document.querySelector(e))==null?void 0:t.addEventListener("input",F0)});function x(){let e=I0(),t=i?L0[i.role]||i.role:"Guest";document.querySelector("#welcomeTitle").textContent=`${t} dashboard`,document.querySelector("#roleChip").textContent=t,document.querySelector("#sidebarRole").textContent=t;let a=i.role==="dormitory"?i.dormitoryGender:i.assignedClass;document.querySelector("#sidebarUser").textContent=a?`${i.fullName} - ${a}`:i.fullName,document.querySelector("#studentCount").textContent=s.students.length,document.querySelector("#teacherCount").textContent=ue().length,document.querySelector("#incomeCount").textContent=s0(e.income),document.querySelector("#debtCount").textContent=s0(e.debt);let n=Kt();document.querySelector("#presentCount").textContent=n.present,document.querySelector("#absentCount").textContent=n.absent,document.querySelector("#absentSummary").textContent=`Sababli: ${n.excused} | Davomat bo'yicha`;let r=Qt();document.querySelector("#dormitoryTotalCount").textContent=r.total,document.querySelector("#dormitoryDashboardSummary").textContent=`O'g'il: ${r.boys.present}/${r.boys.absent} | Qiz: ${r.girls.present}/${r.girls.absent}`,document.querySelector("#assignedClassBadge").textContent=i.assignedClass||"Barcha sinflar",i.role==="teacher"&&y("#studentClass",F(i)[0]||""),at(),nt(),rt(),et(),R0(),ut(),Qe(),ne(),it(),st(),wt(),B0(),$t(),Ye(),_e(),Mt(),ct(),F0(),Lt(),Ct(),Rt(),Ft(),Bt(),Ot(),It(),Dt(),zt(),jt(),Jt(),Xt(),Xe(),_t(),Vt(),Zt(),va(),Yt(),le(G)}var T0;(T0=document.querySelector("#expenseType"))==null||T0.addEventListener("change",()=>{oe()});function et(){let e=document.querySelector("#expenseRecipient");if(!e)return;e.innerHTML="";let t=document.createElement("optgroup");t.label="O'qituvchilar",s.users.filter(r=>r.role==="teacher").forEach(r=>{let u=document.createElement("option");u.value=r.id,u.textContent=r.fullName+(r.assignedClass?` \u2014 ${r.assignedClass}`:""),t.append(u)}),e.append(t);let n=document.createElement("optgroup");n.label="Ta'sischilar",s.founders.forEach(r=>n.append(new Option(r.name,r.id))),e.append(n),oe()}function oe(){var a;let e=((a=document.querySelector("#expenseSalaryCheckbox"))==null?void 0:a.checked)||!1,t=document.querySelector("#expenseRecipientWrap");t&&t.classList.toggle("visually-hidden",!e),e&&y("#expenseType","Oldindan avans")}function tt(){document.querySelectorAll(".main-nav a").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();let a=e.getAttribute("href").replace("#","");le(a)})})}function le(e){G=e||"dashboard",document.querySelectorAll(".main-nav a").forEach(a=>{a.classList.toggle("active",a.getAttribute("href")===`#${G}`)}),document.querySelectorAll(".app-view").forEach(a=>{a.classList.toggle("is-active-view",a.dataset.view===G)}),document.querySelectorAll(".view-group").forEach(a=>{let n=!!a.querySelector(".app-view.is-active-view");a.classList.toggle("group-hidden",!n)});let t=document.querySelector(`[data-view="${G}"]`);t&&j&&!j.classList.contains("is-hidden")&&t.scrollIntoView({behavior:"smooth",block:"start"}),_0()}function at(){L("#studentForm",v("students")),L("#attendanceForm",v("attendance")),L(".dormitory-attendance-form",v("dormitoryAttendance")),L("#admissionForm",v("admissions")),L("#paymentForm",v("finance")),L("#salaryReportForm",v("salaryReports")),L("#teacherForm",v("teachers")),L("#userForm",v("roles")),L("#salaryForm",v("salaries")),L("#tutorForm",v("tutors")),L("#financeForm",v("finance")),L("#pendingExpenseForm",v("finance")),L("#founderForm",v("founders")),L("#serviceForm",v("services")),L("#staffSalaryForm",v("services")),["students","attendance","dormitory","admissions","payments","zauch","zauchPanel","teachers","roles","salaries","tutors","monthlyPayments","expenses","founders","staff","buses","archive"].forEach(t=>{let a=document.querySelector(`#${t}`);if(!a)return;let n=He(t);a.classList.toggle("locked",!n),a.classList.toggle("is-hidden",!n)}),document.querySelectorAll(".main-nav a").forEach(t=>{let a=t.getAttribute("href").replace("#",""),n=He(a);t.classList.toggle("is-hidden",!n)}),He(G)||le(ia())}function nt(){["#salaryTeacher","#tutorTeacher"].forEach(e=>{let t=document.querySelector(e);t&&(t.innerHTML="",ue().forEach(a=>{let n=a.subject?` - ${a.subject}`:"";t.append(new Option(`${a.fullName}${n} (${a.assignedClass||"sinf yo'q"})`,a.id))}))})}function rt(){let e=document.querySelector("#paymentClass"),t=We(),a=e.value;e.innerHTML="",t.forEach(n=>e.append(new Option(n,n))),t.includes(a)&&(e.value=a)}function R0(){let e=document.querySelector("#userRole"),t=document.querySelector("#userResponsibility");if(!e||!t)return;let a=e.value||"accountant";t.innerHTML="",t.append(new Option(P[a]||"Bo'lim tanlanmagan",P[a]||""));let n=document.querySelector("#userClass"),r=document.querySelector("#userDormitoryGenderWrap");n&&(n.disabled=a==="dormitory",n.placeholder=a==="teacher"?"O'qituvchi uchun 2 tagacha: 5-A, 7-A":"Masalan: 5-A, 7-A",a==="dormitory"&&(n.value="")),r==null||r.classList.toggle("is-hidden",a!=="dormitory")}function ut(){let e=document.querySelector("#financeClassFilter"),t=e.value;e.innerHTML="",e.append(new Option("Barcha sinflar","all")),We().forEach(a=>e.append(new Option(a,a))),[...e.options].some(a=>a.value===t)&&(e.value=t)}function Qe(){let e=m("#paymentClass"),t=document.querySelector("#paymentStudent"),a=t.value,n=ye(m("#paymentStudentSearch"));t.innerHTML="",re().filter(r=>r.className===e).filter(r=>!n||ye(r.name).includes(n)).forEach(r=>t.append(new Option(r.name,r.id))),[...t.options].some(r=>r.value===a)&&(t.value=a)}function ne(){let e=s.students.find(t=>t.id===m("#paymentStudent"));if(e){let t=m("#paymentCategory")==="Yotoqxona"?e.dormitoryFee||I:e.monthlyFee||e0(e.className);y("#paymentRequired",t||0)}else y("#paymentRequired",0)}function it(){let e=document.querySelector("#paymentList");e.innerHTML="",D0().slice().reverse().forEach(t=>{let a=Math.max(t.requiredAmount-t.paidAmount,0);e.append(de({title:`${t.studentName} - ${a?"Qarzdor":"To'langan"}`,meta:`${t.className} | ${t.month} | ${t.category||"O'qish to'lovi"} | Qolgan: ${h(a)} so'm`,note:`${t.method||"Naqd pul"} | ${t.phone||"Telefon yo'q"} | ${t.contactStatus}`,id:t.id,collection:"payments"}))})}function st(){let e=document.querySelector("#studentList");e.innerHTML="",re().forEach(t=>{let a=J0(t),n=document.createElement("tr");n.innerHTML=`
            <td>${l(t.name)}</td>
            <td>${l(t.className||"-")}</td>
            <td>${l(t.gender||"-")}</td>
            <td>${l(t.phone||"-")}</td>
            <td>${h((t.monthlyFee||0)+(t.dormitory?t.dormitoryFee||I:0))} so'm</td>
            <td>${h(a.paid)} so'm</td>
            <td>${h(a.debt)} so'm</td>
            <td>${t.dormitory?`${h(t.dormitoryFee||I)} so'm`:"Yo'q"}</td>
            <td></td>
        `,X(n,"students",t.id),e.append(n)}),T(e)}function ct(){let e=document.querySelector("#salaryReportList");e.innerHTML="",z0().slice().reverse().forEach((t,a)=>{let n=V(t),r=document.createElement("tr");r.innerHTML=`
            <td>${a+1}</td>
            <td>${l(t.teacherName||"-")}</td>
            <td>${l(t.position||t.subject||"-")}</td>
            <td>${l(t.className||"-")}</td>
            <td>${h(n.total)} so'm</td>
            <td>${h(t.advance||0)} so'm</td>
            <td>${h(t.loan||0)} so'm</td>
            <td>${l(t.advanceType||"Bank orqali")}</td>
            <td>${h(n.remaining)} so'm</td>
            <td></td>
        `,X(r,"salaryReports",t.id),e.append(r)}),T(e)}function ot(e){let t=s.salaryReports.find(a=>a.id===e);t&&(y("#salaryReportEditId",t.id),y("#salaryReportEditFullName",t.teacherName||""),y("#salaryReportEditPosition",t.position||t.subject||""),y("#salaryReportEditClass",t.className||""),y("#salaryReportEditSalary",t.salaryAmount||t.calculatedSalary||0),y("#salaryReportEditAdvance",t.advance||0),y("#salaryReportEditAdvanceType",t.advanceType||"Bank orqali"),y("#salaryReportEditPaymentTarget",t.paymentTarget||""),y("#salaryReportEditBankCard",t.bankCard||""),Y.classList.remove("is-hidden"))}function ve(){Y&&Y.classList.add("is-hidden")}function lt(e){e.preventDefault();let t=m("#salaryReportEditId"),a=s.salaryReports.find(r=>r.id===t);if(!a)return;a.teacherName=m("#salaryReportEditFullName"),a.position=m("#salaryReportEditPosition"),a.subject=a.position,a.className=K(m("#salaryReportEditClass")),a.salaryAmount=g("#salaryReportEditSalary"),a.advance=g("#salaryReportEditAdvance"),a.advanceType=m("#salaryReportEditAdvanceType"),a.paymentTarget=m("#salaryReportEditPaymentTarget"),a.bankCard=m("#salaryReportEditBankCard"),a.loan=g("#salaryReportEditLoan");let n=V(a);a.calculatedSalary=n.total,a.remainingSalary=n.remaining,C(e.target,"#salaryReportMessage","Hisobot yangilandi."),ve()}function dt(e){let t=s.services.find(a=>a.id===e);t&&(y("#serviceEditId",t.id),y("#serviceEditDriverName",t.driverName||t.title||""),y("#serviceEditJob",t.job||""),y("#serviceEditSalary",t.salary||0),y("#serviceEditAdvance",t.advance||0),y("#serviceEditAdvanceType",t.advanceType||"Naqd pul"),_.classList.remove("is-hidden"))}function fe(){_&&_.classList.add("is-hidden")}function mt(e){e.preventDefault();let t=m("#serviceEditId"),a=s.services.find(n=>n.id===t);a&&(a.driverName=m("#serviceEditDriverName"),a.title=a.driverName,a.job=m("#serviceEditJob"),a.salary=g("#serviceEditSalary"),a.advance=g("#serviceEditAdvance"),a.advanceType=m("#serviceEditAdvanceType"),E(),x(),fe())}function pt(e){let t=s.finance.find(a=>a.id===e);t&&(y("#financeEditId",t.id),y("#financeEditExpenseType",t.expenseType||""),y("#financeEditMethod",t.method||"Naqd pul"),y("#financeEditTitle",t.title||""),y("#financeEditQuantity",t.quantity||""),y("#financeEditAmount",t.amount||0),y("#financeEditDate",t.expenseDate||D(t.createdAt)||f),H==null||H.classList.remove("is-hidden"))}function ge(){H&&H.classList.add("is-hidden")}function ht(e){e.preventDefault();let t=m("#financeEditId"),a=s.finance.find(n=>n.id===t);a&&(a.expenseType=m("#financeEditExpenseType")||"Rasxod",a.method=m("#financeEditMethod"),a.title=m("#financeEditTitle"),a.quantity=m("#financeEditQuantity"),a.amount=g("#financeEditAmount"),a.expenseDate=m("#financeEditDate")||f,E(),x(),ge())}function yt(e){let t=e.target.files[0];t&&(vt(t),e.target.value="")}function bt(){if(!window.XLSX){S("#salaryReportMessage","Excel kutubxonasi yuklanmadi.");return}let e=s.salaryReports.map((o,d)=>({No:d+1,"Ismi sharfi":o.teacherName||"",Lavozimi:o.position||o.subject||"",Sinf:o.className||"","Jami oylik":o.salaryAmount||o.calculatedSalary||0,Avans:o.advance||0,Qarz:o.loan||0,"Avans turi":o.advanceType||"Bank orqali",Beriladi:V(o).remaining})),t=XLSX.utils.book_new(),a=XLSX.utils.json_to_sheet(e);XLSX.utils.book_append_sheet(t,a,"OylikHisobot");let n=XLSX.write(t,{bookType:"xlsx",type:"array"}),r=new Blob([n],{type:"application/octet-stream"}),u=document.createElement("a");u.href=URL.createObjectURL(r),u.download="salary_reports.xlsx",document.body.appendChild(u),u.click(),document.body.removeChild(u),URL.revokeObjectURL(u.href)}function vt(e){if(!window.XLSX){S("#salaryReportMessage","Excel kutubxonasi yuklanmadi.");return}let t=new FileReader;t.onload=a=>{try{let n=new Uint8Array(a.target.result),r=XLSX.read(n,{type:"array"}),u=r.SheetNames[0],o=r.Sheets[u],c=XLSX.utils.sheet_to_json(o,{defval:""}).map(p=>({id:k("salaryReport"),month:p.Oy||R,teacherId:"",teacherName:String(p["Ismi sharfi"]||p["F.I.Sh"]||"").trim(),position:String(p.Lavozimi||p.Lavozimi||"").trim(),subject:String(p.Lavozimi||"").trim(),className:K(String(p.Sinf||"")),salaryAmount:Number(p["Jami oylik"]||p["Jami oylik maoshi"]||0),advance:Number(p.Avans||0),loan:Number(p.Qarz||p.Qarz||0),advanceType:String(p["Avans turi"]||p["Avans turi"]||"Bank orqali").trim(),paymentTarget:String(p["To'lov manzili"]||"").trim(),bankCard:String(p["Bank kartasi"]||"").trim(),calculatedSalary:0,remainingSalary:0,createdBy:(i==null?void 0:i.fullName)||""})).filter(p=>p.teacherName);c.forEach(p=>{let b=V(p);p.calculatedSalary=b.total,p.remainingSalary=b.remaining,s.salaryReports.push(p)}),C(null,"#salaryReportMessage",`${c.length} ta hisobot import qilindi.`)}catch(n){S("#salaryReportMessage","Excel faylni o'qishda xatolik yuz berdi.")}},t.readAsArrayBuffer(e)}function ft(e){let t=e.target.files[0];t&&xt(t),e.target.value=""}function gt(e){let t=e.target.files[0];t&&Et(t),e.target.value=""}function St(e){let t=e.target.files[0];t&&At(t),e.target.value=""}function qt(){if(!v("roles"))return;let e=ue().map((t,a)=>({No:a+1,"F.I.Sh":t.fullName||"",Login:t.login||"",Parol:t.password||"",Fan:t.subject||"","Biriktirilgan sinflar":t.assignedClass||""}));Ge(e,"Oqituvchilar","oqituvchilar.xlsx","#userMessage")}function xt(e){v("roles")&&Je(e,"#userMessage",t=>{let a=0,n=[];t.forEach(u=>{let o=$(u,["F.I.Sh","FISH","Ismi sharfi","O'qituvchi","Ustoz"]);if(!o)return;let d=$(u,["Login"]);if(d&&s.users.some(b=>String(b.login||"").toLowerCase()===d.toLowerCase())){a+=1;return}let p={id:k("user"),fullName:o,login:d||Tt(o),password:$(u,["Parol"])||"teacher123",role:"teacher",responsibility:P.teacher,subject:$(u,["Fan","Lavozimi"]),assignedClass:Se($(u,["Biriktirilgan sinflar","Sinflar","Sinf"]))};s.users.push(p),n.push(p)}),n.forEach(u=>M("users","Exceldan o'qituvchi import qilindi",u)),E(),x();let r=a?` ${a} ta takror login o'tkazilmadi.`:"";S("#userMessage",`${n.length} ta o'qituvchi import qilindi.${r}`)})}function kt(){if(!v("services"))return;let e=s.staffSalaries.map((t,a)=>({No:a+1,"F.I.Sh":t.name||"",Lavozimi:t.job||"",Oy:t.month||"","Jami oylik":Number(t.salary||0),Jarima:Number(t.fine||0),Avans:t0(t).advanceTotal,"Avans turi":t.advanceType||"Bank orqali"}));Ge(e,"TexXodimlar","tex_xodimlar.xlsx","#staffSalaryMessage")}function Et(e){v("services")&&Je(e,"#staffSalaryMessage",t=>{let a=t.map(n=>({id:k("staffSalary"),name:$(n,["F.I.Sh","FISH","Ismi sharfi","Tex xodim"]),job:$(n,["Lavozimi","Ishi"])||"Tex xodim",month:$(n,["Oy"])||R,salary:ie(n,["Jami oylik","Oylik"]),fine:ie(n,["Jarima"]),advance:ie(n,["Avans","Berilgan avans"]),advanceType:ce($(n,["Avans turi"])||"Bank orqali"),createdBy:i.fullName})).filter(n=>n.name);a.forEach(n=>{s.staffSalaries.push(n),M("staffSalaries","Exceldan tex xodim import qilindi",n)}),E(),x(),S("#staffSalaryMessage",`${a.length} ta tex xodim import qilindi.`)})}function Nt(){if(!v("services"))return;let e=s.services.filter(t=>t.type==="Avtobus").map((t,a)=>({No:a+1,"F.I.Sh":t.driverName||t.title||"",Lavozimi:t.job||"haydovchi",Oylik:Number(t.salary||0),Avans:Number(t.advance||0),"Avans turi":t.advanceType||"Naqd pul"}));Ge(e,"AvtobusXizmati","avtobus_xizmati.xlsx","#serviceMessage")}function At(e){v("services")&&Je(e,"#serviceMessage",t=>{let a=t.map(n=>({id:k("service"),type:"Avtobus",driverName:$(n,["F.I.Sh","FISH","Ismi sharfi","Avtobuschi"]),job:$(n,["Lavozimi","Ishi"])||"haydovchi",salary:ie(n,["Oylik","Beriladigan oylik"]),advance:ie(n,["Avans","Berilgan avans"]),advanceType:a0($(n,["Avans turi"])||"Naqd pul"),createdBy:i.fullName})).filter(n=>n.driverName);a.forEach(n=>{s.services.push(n),M("services","Exceldan avtobuschi import qilindi",n)}),E(),x(),S("#serviceMessage",`${a.length} ta avtobuschi import qilindi.`)})}function Ge(e,t,a,n){if(!window.XLSX){S(n,"Excel kutubxonasi yuklanmadi.");return}let r=XLSX.utils.book_new(),u=XLSX.utils.json_to_sheet(e);XLSX.utils.book_append_sheet(r,u,t),XLSX.writeFile(r,a)}function Je(e,t,a){if(!window.XLSX){S(t,"Excel kutubxonasi yuklanmadi.");return}let n=new FileReader;n.onload=r=>{try{let u=XLSX.read(new Uint8Array(r.target.result),{type:"array"}),o=u.Sheets[u.SheetNames[0]];a(XLSX.utils.sheet_to_json(o,{defval:""}))}catch(u){S(t,"Excel faylni o'qishda xatolik yuz berdi.")}},n.readAsArrayBuffer(e)}function $(e,t){var a;for(let n of t){let r=String((a=e[n])!=null?a:"").trim();if(r)return r}return""}function ie(e,t){let a=$(e,t).replace(/\s/g,"").replace(/[^\d.-]/g,"");return Number(a||0)}function Tt(e){let t=String(e||"teacher").toLowerCase().replace(/[^a-z0-9]+/g,".").replace(/^\.+|\.+$/g,"")||"teacher",a=t,n=1;for(;s.users.some(r=>String(r.login||"").toLowerCase()===a.toLowerCase());)n+=1,a=`${t}${n}`;return a}function F0(){let e=document.querySelector("#salaryReportSummary");if(!e)return;let t=V({salaryAmount:g("#salaryReportSalary"),advance:g("#salaryReportAdvance")});e.innerHTML=`
        <strong>Jami oylik: ${h(t.total)} so'm</strong>
        <span>Avans: ${h(t.advance)} | Avans turi: ${l(m("#salaryReportAdvanceType")||"Bank orqali")} | Beriladi: ${h(t.remaining)} so'm</span>
    `}function Ct(){let e=document.querySelector("#teacherFinanceTable");e&&(e.innerHTML="",ue().forEach(t=>{if(i.role==="teacher"&&t.id!==i.id)return;let a=F(t),n=s.students.filter(b=>a.includes(b.className)),r=s.payments.filter(b=>a.includes(b.className));if(!n.length&&!r.length)return;let u=A(r,"requiredAmount")||A(n,"monthlyFee"),o=A(r,"paidAmount"),d=Math.max(u-o,0),c=r.filter(b=>b.requiredAmount>b.paidAmount).length,p=document.createElement("tr");p.innerHTML=`
            <td>${l(t.fullName)}</td>
            <td>${l(t.assignedClass||"-")}</td>
            <td>${n.length}</td>
            <td>${h(o)} so'm</td>
            <td>${h(d)} so'm</td>
            <td>${c?`${c} qarzdor`:"Toza"}</td>
        `,e.append(p)}),T(e))}function Lt(){let e=document.querySelector("#teacherSalaryTable");e&&(e.innerHTML="",z0().slice().reverse().forEach(t=>{let a=t.teacherId?s.users.find(o=>o.id===t.teacherId):null,n=V(t),r=Y0(t.advance||0,t.advanceType),u=document.createElement("tr");u.innerHTML=`
            <td>${l(t.teacherName||(a==null?void 0:a.fullName)||"-")}</td>
            <td>${l(t.position||t.subject||(a==null?void 0:a.subject)||"O'qituvchi")}</td>
            <td>${h(n.total)} so'm</td>
            <td>${h(t.fine||0)} so'm</td>
            <td>${h(r.bank)} so'm</td>
            <td>${h(r.click)} so'm</td>
            <td>${h(r.cash)} so'm</td>
            <td>${h(n.remaining)} so'm</td>
            <td>${l(t.className||(a==null?void 0:a.assignedClass)||"-")}</td>
        `,e.append(u)}),T(e))}function wt(){let e=document.querySelector("#studentClassFilter");if(!e)return;let t=["Barchasi",...new Set(re().map(a=>a.className).filter(Boolean))];e.innerHTML=t.map(a=>`<option value="${l(a)}">${l(a)}</option>`).join("")}function B0(){let e=document.querySelector("#studentByClassTable");if(!e)return;let t=m("#studentClassFilter")||"Barchasi",a=re().filter(n=>t==="Barchasi"||n.className===t);e.innerHTML="",a.forEach((n,r)=>{let u=J0(n),o=document.createElement("tr");o.innerHTML=`
            <td>${r+1}</td>
            <td>${l(n.name)}</td>
            <td>${l(n.className||"-")}</td>
            <td>${l(n.gender||"-")}</td>
            <td>${l(n.phone||"-")}</td>
            <td>${h((n.monthlyFee||0)+(n.dormitory?n.dormitoryFee||I:0))} so'm</td>
            <td>${h(u.paid)} so'm</td>
            <td>${h(u.debt)} so'm</td>
            <td>${n.dormitory?`${h(n.dormitoryFee||I)} so'm`:"Yo'q"}</td>
            <td>${u.label}</td>
        `,e.append(o)}),T(e)}function $t(){let e=document.querySelector("#attendanceClass");if(!e)return;let t=e.value,a=i.role==="teacher"?F(i):We();e.innerHTML="",a.forEach(n=>e.append(new Option(n,n))),a.includes(t)&&(e.value=t),e.disabled=i.role==="teacher"}function Ye(){let e=document.querySelector("#attendanceTable"),t=document.querySelector("#attendanceClassBadge");if(!e||!t)return;let a=m("#attendanceClass"),n=m("#attendanceDate")||f,r=re().filter(u=>u.className===a);t.textContent=a||"Sinf tanlanmagan",e.innerHTML="",r.forEach((u,o)=>{let d=s.attendance.find(p=>p.date===n&&p.studentId===u.id),c=document.createElement("tr");c.dataset.studentId=u.id,c.innerHTML=`
            <td>${o+1}</td>
            <td>${l(u.name)}</td>
            <td>${l(u.className||"-")}</td>
            <td>
                <select aria-label="${l(u.name)} davomati">
                    <option value="Kelgan"${(d==null?void 0:d.status)==="Kelgan"?" selected":""}>Kelgan</option>
                    <option value="Kelmagan"${(d==null?void 0:d.status)==="Kelmagan"?" selected":""}>Kelmagan</option>
                    <option value="Sababli kelmagan"${(d==null?void 0:d.status)==="Sababli kelmagan"||(d==null?void 0:d.status)==="Sababli"?" selected":""}>Sababli kelmagan</option>
                </select>
            </td>
        `,e.append(c)}),T(e)}function _e(){[{gender:"O'g'il bola",table:"#dormitoryBoysTable",date:"#dormitoryBoysDate",badge:"#dormitoryBoysBadge"},{gender:"Qiz bola",table:"#dormitoryGirlsTable",date:"#dormitoryGirlsDate",badge:"#dormitoryGirlsBadge"}].forEach(e=>{var w;let t=document.querySelector(e.table),a=document.querySelector(e.badge);if(!t||!a)return;let n=t.closest("article"),r=(i==null?void 0:i.dormitoryGender)||"",u=(i==null?void 0:i.role)==="dormitory"&&r!==e.gender;if(n==null||n.classList.toggle("is-hidden",u),u)return;let o=m(e.date)||f,d=O0(),c=(i==null?void 0:i.role)==="dormitory"&&he(e.gender,o,i.id),p=re().filter(q=>q.gender===e.gender).filter(q=>d||q.dormitory).sort((q,B)=>String(q.className||"").localeCompare(String(B.className||""))),b=p.filter(q=>q.dormitory).length;a.textContent=c?`${b} ta | Topshirildi`:`${b} ta`,t.innerHTML="",p.forEach((q,B)=>{let Z=s.dormitoryAttendance.find(n0=>n0.date===o&&n0.studentId===q.id),z=(Z==null?void 0:Z.status)||"Kelgan",qe=document.createElement("tr");qe.dataset.studentId=q.id,qe.innerHTML=`
                <td>${B+1}</td>
                <td>
                    <label class="check-row">
                        <input data-dormitory-check type="checkbox"${q.dormitory?" checked":""}${d?"":" disabled"} aria-label="${l(q.name)} yotoqxonada">
                        <span>Ha</span>
                    </label>
                </td>
                <td>${l(q.name)}</td>
                <td>${l(q.className||"-")}</td>
                <td>
                    <select${c?" disabled":""} aria-label="${l(q.name)} yotoqxona davomati">
                        <option value="Kelgan"${z==="Kelgan"?" selected":""}>Kelgan</option>
                        <option value="Kelmagan"${z==="Kelmagan"?" selected":""}>Kelmagan</option>
                        <option value="Sababli kelmagan"${z==="Sababli kelmagan"||z==="Sababli"?" selected":""}>Sababli kelmagan</option>
                    </select>
                </td>
            `,t.append(qe)});let N=(w=t.closest("form"))==null?void 0:w.querySelector('button[type="submit"]');N&&(N.disabled=c),T(t)})}function Mt(){let e=document.querySelector("#admissionTable");if(!e)return;let t=s.admissions.filter(a=>a.schoolYear==="2026/2027");document.querySelector("#admissionIncomingCount").textContent=t.filter(a=>a.status==="Kelyapti").length,document.querySelector("#admissionAcceptedCount").textContent=t.filter(a=>a.status==="Qabul qilindi").length,document.querySelector("#admissionLeavingCount").textContent=t.filter(a=>a.status==="Chiqib ketdi").length,e.innerHTML="",t.slice().reverse().forEach((a,n)=>{let r=document.createElement("tr");r.innerHTML=`
            <td>${n+1}</td>
            <td>${l(a.studentName)}</td>
            <td>${l(a.className||"-")}</td>
            <td>${l(a.phone||"-")}</td>
            <td>${l(a.status)}</td>
            <td>${l(D(a.admissionDate))}</td>
            <td>${l(a.note||"-")}</td>
            <td></td>
        `,X(r,"admissions",a.id),e.append(r)}),T(e)}function Rt(){let e=document.querySelector("#usersTable");e&&(e.innerHTML="",s.users.filter(t=>["admin","accountant","zauch","teacher","dormitory","warehouse"].includes(t.role)).forEach(t=>{let a=document.createElement("tr"),n=t.role==="dormitory"?t.dormitoryGender||"-":t.assignedClass||"-";a.innerHTML=`
            <td>${l(t.fullName)}</td>
            <td>${l(t.login)}</td>
            <td>${l(L0[t.role]||t.role)}</td>
            <td>${l(t.responsibility||P[t.role]||"-")}</td>
            <td>${l(n)}</td>
            <td></td>
        `;let r=a.querySelector("td:last-child");r&&(r.append(Q("Tahrirlash","ghost",()=>Ve("users",t.id),!v("roles"))),r.append(Q("O'chirish","danger",()=>Ze("users",t.id),!v("roles")||t.id===i.id))),e.append(a)}),T(e))}function Ft(){let e=document.querySelector("#zauchTable");e&&(e.innerHTML="",s.users.filter(t=>t.role==="zauch").forEach(t=>{let a=document.createElement("tr");a.innerHTML=`
            <td>${l(t.fullName||"-")}</td>
            <td>${l(t.login||"-")}</td>
            <td>${l(t.assignedClass||"Barcha sinflar")}</td>
            <td><span class="paid">Faol</span></td>
        `,e.append(a)}),T(e))}function Bt(){let e=document.querySelector("#salaryList");e.innerHTML="",ea().slice().reverse().forEach(t=>{let a=t.baseSalary+t.bonus,n=Math.max(a-t.advance,0);e.append(de({title:`${t.teacherName} - ${t.month}`,meta:`Jami: ${h(a)} so'm | Avans: ${h(t.advance)} so'm`,note:`Qolgan oylik: ${h(n)} so'm`,id:t.id,collection:"salaries"}))})}function Ot(){let e=document.querySelector("#tutorList");e.innerHTML="",ta().slice().reverse().forEach(t=>{let a=G0(t);e.append(de({title:`${t.teacherName} - ${t.month}`,meta:`${t.studentsCount} bola | ${t.hours} soat | KPI: ${h(t.bonus)} so'm`,note:`Repetitor oyligi: ${h(a)} so'm`,id:t.id,collection:"tutors"}))})}function It(){let e=document.querySelector("#financeList"),t=document.querySelector("#financeTodaySummary"),a=ba();t.innerHTML=`
        <strong>Bugun yig'ilgan: ${h(a.net)} so'm</strong>
        <span>Kirim: ${h(a.income)} | Naqd: ${h(a.cash)} | Click: ${h(a.click)} | Hisob raqam: ${h(a.account)} | Chiqim: ${h(a.expense)} | Farq: ${h(a.net)}</span>
    `,e.innerHTML="",Ut().slice().reverse().forEach((n,r)=>{var o;let u=document.createElement("tr");u.innerHTML=`
            <td>${l(n.title||"Izoh yo'q")}</td>
            <td>${l(n.quantity||"-")}</td>
            <td>${h(n.amount)} so'm</td>
            <td>${l(n.expenseType||"-")}</td>
            <td>${l(n.recipientName||((o=s.users.find(d=>d.id===n.recipientId))==null?void 0:o.fullName)||"-")}</td>
            <td>${l(n.method||"Naqd pul")}</td>
            <td>${l(D(n.expenseDate||n.createdAt))}</td>
            <td></td>
        `,u.insertAdjacentHTML("afterbegin",`<td>${r+1}</td>`),X(u,"finance",n.id),e.append(u)}),T(e)}function Xe(){let e=document.querySelector("#financePaymentsTable"),t=m("#financeClassFilter")||"all",a=ye(m("#financePaymentSearch"));e.innerHTML="",D0().filter(n=>t==="all"||n.className===t).filter(n=>!a||ye(n.studentName).includes(a)).forEach((n,r)=>{let u=document.createElement("tr");u.innerHTML=`
                <td>${r+1}</td>
                <td>${l(n.studentName)}</td>
                <td>${l(n.className)}</td>
                <td>${h(n.paidAmount)} so'm</td>
                <td>${l(n.method||"Naqd pul")}</td>
                <td>${l(n.note||n.category||"-")}</td>
                <td>${l(D(n.paymentDate||n.createdAt))}</td>
                <td></td>
            `,X(u,"payments",n.id),e.append(u)}),T(e)}function Dt(){let e=document.querySelector("#pendingExpenseTable");e&&(e.innerHTML="",s.pendingExpenses.filter(t=>t.createdById===(i==null?void 0:i.id)).slice().reverse().forEach((t,a)=>{let n=document.createElement("tr");n.innerHTML=`
                <td>${a+1}</td>
                <td>${l(t.recipientName||"-")}</td>
                <td>${l(t.title||"-")}</td>
                <td>${h(t.amount)} so'm</td>
                <td>${l(t.method||"Naqd pul")}</td>
                <td>${l(D(t.expenseDate||t.createdAt))}</td>
                <td>Superadmin kutyapti</td>
            `,e.append(n)}),T(e))}function zt(){let e=document.querySelector("#expenseReminders"),t=document.querySelector("#expenseReminderList"),a=document.querySelector("#expenseReminderCount");if(!e||!t||!a)return;let n=(i==null?void 0:i.role)==="superadmin"||(i==null?void 0:i.role)==="admin";e.classList.toggle("is-hidden",!n),t.innerHTML="",a.textContent=`${s.pendingExpenses.length} ta`,n&&s.pendingExpenses.slice().reverse().forEach(r=>{let u=document.createElement("div");u.className="record-item",u.innerHTML=`
            <strong>${l(r.recipientName||"-")} - ${h(r.amount)} so'm</strong>
            <span>${l(r.title||"-")} | ${l(r.method||"Naqd pul")} | ${l(D(r.expenseDate||r.createdAt))}</span>
            <small>Kiritdi: ${l(r.createdBy||"-")}</small>
        `;let o=document.createElement("div");o.className="record-actions",o.append(Q("Rasxodlarga qo'shish","ghost",()=>Ht(r.id)),Q("Olib tashlash","danger",()=>Pt(r.id))),u.append(o),t.append(u)})}function Ht(e){let t=s.pendingExpenses.find(a=>a.id===e);t&&(s.finance.push({id:k("finance"),type:"Rasxod",expenseType:t.title||"Kassa rasxodi",recipientName:t.recipientName||"",method:t.method||"Naqd pul",title:t.title||"Kassa rasxodi",quantity:"",amount:Number(t.amount||0),expenseDate:t.expenseDate||f,createdById:t.createdById||"",createdBy:t.createdBy||i.fullName,approvedBy:i.fullName,createdAt:t.createdAt||new Date().toISOString()}),M("pendingExpenses","Rasxodlarga qo'shildi",t),s.pendingExpenses=s.pendingExpenses.filter(a=>a.id!==e),E(),x())}function Pt(e){let t=s.pendingExpenses.find(a=>a.id===e);t&&M("pendingExpenses","Olib tashlandi",t),s.pendingExpenses=s.pendingExpenses.filter(a=>a.id!==e),E(),x()}function jt(){let e=document.querySelector("#attendanceReminders"),t=document.querySelector("#attendanceReminderList"),a=document.querySelector("#attendanceReminderCount");if(!e||!t||!a)return;let n=(i==null?void 0:i.role)==="superadmin"||(i==null?void 0:i.role)==="admin";if(e.classList.toggle("is-hidden",!n),t.innerHTML="",!n)return;let r=ue().flatMap(u=>F(u).filter(o=>!s.attendance.some(d=>d.date===f&&d.className===o)).map(o=>({teacher:u,className:o})));a.textContent=`${r.length} ta`,r.forEach(({teacher:u,className:o})=>{let d=document.createElement("div");d.className="record-item",d.innerHTML=`
            <strong>${l(o)} sinf - davomat olinmagan</strong>
            <span>Sinf rahbar: ${l(u.fullName||"-")}</span>
            <small>Bugungi sana: ${l(f)}</small>
        `,t.append(d)})}function Kt(){let e=s.attendance.filter(t=>t.date===f);return{present:e.filter(t=>t.status==="Kelgan").length,absent:e.filter(t=>t.status==="Kelmagan"||t.status==="Sababli"||t.status==="Sababli kelmagan").length,excused:e.filter(t=>t.status==="Sababli"||t.status==="Sababli kelmagan").length}}function Qt(){let e=s.students.filter(n=>n.dormitory),t=s.dormitoryAttendance.filter(n=>n.date===f),a={total:e.length,boys:{present:0,absent:0},girls:{present:0,absent:0}};return e.forEach(n=>{let r=t.find(o=>o.studentId===n.id),u=n.gender==="Qiz bola"?a.girls:a.boys;(r==null?void 0:r.status)==="Kelmagan"||(r==null?void 0:r.status)==="Sababli"||(r==null?void 0:r.status)==="Sababli kelmagan"?u.absent+=1:u.present+=1}),a}function Gt(){return s.users.filter(e=>e.role==="dormitory"&&e.dormitoryGender)}function O0(){return(i==null?void 0:i.role)==="superadmin"||(i==null?void 0:i.role)==="admin"}function he(e,t=f,a=""){return s.dormitoryAttendance.some(n=>n.date===t&&n.gender===e&&(!a||n.teacherId===a))}function Jt(){let e=document.querySelector("#dormitoryAbsentPanel"),t=document.querySelector("#dormitoryAbsentList"),a=document.querySelector("#dormitoryAbsentCount");if(!e||!t||!a)return;let n=(i==null?void 0:i.role)==="superadmin"||(i==null?void 0:i.role)==="admin";if(e.classList.toggle("is-hidden",!n),t.innerHTML="",!n)return;let r=Gt(),u=r.filter(c=>s.students.some(p=>p.dormitory&&p.gender===c.dormitoryGender)&&!he(c.dormitoryGender,f,c.id)),o=r.filter(c=>he(c.dormitoryGender,f,c.id)),d=s.dormitoryAttendance.filter(c=>c.date===f&&(c.status==="Kelmagan"||c.status==="Sababli"||c.status==="Sababli kelmagan")).filter(c=>s.students.some(p=>p.id===c.studentId&&p.dormitory));a.textContent=`${u.length} topshirmadi | ${d.length} kelmadi`,u.forEach(c=>{let p=document.createElement("div");p.className="record-item",p.innerHTML=`
            <strong>${l(c.dormitoryGender)} yotoqxona davomati topshirilmagan</strong>
            <span>Tarbiyachi: ${l(c.fullName||"-")}</span>
            <small>Bugungi sana: ${l(f)}</small>
        `,t.append(p)}),o.forEach(c=>{let p=document.createElement("div");p.className="record-item",p.innerHTML=`
            <strong>${l(c.dormitoryGender)} yotoqxona davomati topshirildi</strong>
            <span>Tarbiyachi: ${l(c.fullName||"-")}</span>
            <small>Bugungi sana: ${l(f)}</small>
        `,t.append(p)}),d.forEach(c=>{t.append(de({title:`${c.studentName} - ${c.status}`,meta:`${c.gender||"-"} | ${c.className||"-"} | ${c.date}`,note:`Nazoratchi: ${c.teacherName||"-"}`,id:c.id,collection:"dormitoryAttendance"}))})}function M(e,t,a){s.archive.push({id:k("archive"),collection:e,action:t,data:JSON.parse(JSON.stringify(a||{})),performedBy:(i==null?void 0:i.fullName)||"-",archivedAt:new Date().toISOString()})}function Yt(){let e=document.querySelector("#archiveTable"),t=document.querySelector("#archiveCount");!e||!t||(e.innerHTML="",t.textContent=`${s.archive.length} ta`,s.archive.slice().reverse().forEach(a=>{let n=a.data.name||a.data.title||a.data.studentName||a.data.teacherName||a.data.recipientName||a.data.fullName||"-",r=document.createElement("tr");r.innerHTML=`
            <td>${l(D(a.archivedAt))}</td>
            <td>${l(a.collection||"-")}</td>
            <td>${l(a.action||"-")}</td>
            <td>${l(n)}</td>
            <td>${l(a.performedBy||"-")}</td>
        `,e.append(r)}),T(e))}function _t(){let e=document.querySelector("#founderSummary"),t=document.querySelector("#founderList"),a=I0(),n=s.founders.reduce((u,o)=>u+Number(o.percent||0),0),r=Math.max(100-n,0);e.innerHTML=`
        <strong>Sof foyda: ${h(a.profit)} so'm</strong>
        <span>Jami tushim: ${h(a.income)} | Jami chiqim: ${h(a.expenses+a.salaryCost)} | Rasxod: ${h(a.expenses)} | Oyliklar: ${h(a.salaryCost)}</span>
        <div class="percent-meter" aria-label="Ta'sischilar 100 foizlik rejimi">
            <span style="width: ${Math.min(n,100)}%"></span>
        </div>
        <span>Ajratilgan ulush: ${h(n)}% | Qoldiq: ${h(r)}%</span>
    `,t.innerHTML="",s.founders.forEach(u=>{let o=a.profit*u.percent/100,d=s.finance.filter(c=>c.recipientType==="founder"&&c.recipientId===u.id&&c.salaryAdvance).reduce((c,p)=>c+Number(p.amount||0),0);t.append(de({title:u.name,meta:`${u.percent}% ulush`,note:`Ulushi: ${h(o)} so'm | Avans olgan: ${h(d)} so'm | Qoldiq: ${h(o-d)} so'm`,id:u.id,collection:"founders"}))})}function Xt(){let e=new Date().toISOString().slice(0,10),t=s.payments.filter(d=>D(d.paymentDate||d.createdAt)===e),a=s.finance.filter(d=>d.type==="Rasxod"&&D(d.expenseDate||d.createdAt)===e),n=[{label:"Naqd",value:A(t.filter(d=>d.method==="Naqd pul"),"paidAmount"),color:"#22c55e"},{label:"Click",value:A(t.filter(d=>d.method==="Click"||d.method==="Click/Payme"),"paidAmount"),color:"#38bdf8"},{label:"Hisob",value:A(t.filter(d=>d.method==="Hisob raqam"),"paidAmount"),color:"#facc15"}],r=ma(a,"expenseType","amount"),u=n.reduce((d,c)=>d+c.value,0),o=r.reduce((d,c)=>d+c.value,0);document.querySelector("#dailyIncomeBadge").textContent=`${h(u)} so'm`,document.querySelector("#dailyExpenseBadge").textContent=`${h(o)} so'm`,ha("#dailyIncomeChart",n,u),pa("#dailyExpenseChart",r.length?r:[{label:"Rasxod",value:0}],o)}function Vt(){let e=document.querySelector("#serviceTable");e&&(e.innerHTML="",s.services.filter(t=>t.type==="Avtobus").slice().reverse().forEach((t,a)=>{let n=Number(t.salary||0),r=Number(t.advance||0),u=Math.max(n-r,0),o=fa(r,t.advanceType),d=document.createElement("tr");d.innerHTML=`
            <td>${a+1}</td>
            <td>${l(t.driverName||t.title||"Avtobuschi")}</td>
            <td>${l(t.job||"haydovchi")}</td>
            <td>${h(n)} so'm</td>
            <td>${h(o.cash)} so'm</td>
            <td>${h(o.click)} so'm</td>
            <td>${h(u)} so'm</td>
            <td></td>
        `,X(d,"services",t.id),e.append(d)}),T(e))}function Zt(){let e=document.querySelector("#staffSalaryTable");e&&(e.innerHTML="",s.staffSalaries.slice().reverse().forEach((t,a)=>{let n=t0(t),r=Y0(n.advanceTotal,t.advanceType),u=document.createElement("tr");u.innerHTML=`
            <td>${a+1}</td>
            <td>${l(t.name)}</td>
            <td>${l(t.job||"Tex xodim")}</td>
            <td>${l(t.month||"-")}</td>
            <td>${h(t.salary)} so'm</td>
            <td>${h(t.fine||0)} so'm</td>
            <td>${h(r.bank)} so'm</td>
            <td>${h(r.click)} so'm</td>
            <td>${h(r.cash)} so'm</td>
            <td>${h(n.remaining)} so'm</td>
            <td></td>
        `,X(u,"staffSalaries",t.id),e.append(u)}),T(e))}function T(e){let t=e?e.closest(".table-wrap"):null;t&&t.classList.toggle("is-empty",e.children.length===0)}function X(e,t,a){let n=e.querySelector("td:last-child");!n||!H0(t)||n.append(Q("Tahrirlash","ghost",()=>Ve(t,a)),Q("O'chirish","danger",()=>Ze(t,a)))}function de({title:e,meta:t,note:a,id:n,collection:r}){let u=document.createElement("div");if(u.className="record-item",u.innerHTML=`
        <strong>${l(e)}</strong>
        <span>${l(t)}</span>
        <small>${l(a)}</small>
    `,H0(r)){let o=document.createElement("div");o.className="record-actions",o.append(Q("Tahrirlash","ghost",()=>Ve(r,n)),Q("O'chirish","danger",()=>Ze(r,n))),u.append(o)}return u}function O({title:e,description:t="Ma'lumotlarni tizim ichida tahrirlang.",fields:a,onSave:n}){var d;(d=document.querySelector("#inlineEditModal"))==null||d.remove();let r=document.createElement("div");r.className="modal-overlay",r.id="inlineEditModal",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true");let u=a.map(c=>{var p;if(c.type==="select"){let b=c.options.map(N=>`<option value="${l(N)}"${String(N)===String(c.value||"")?" selected":""}>${l(N)}</option>`).join("");return`
                <label>
                    ${l(c.label)}
                    <select name="${l(c.name)}">${b}</select>
                </label>
            `}return c.type==="checkbox"?`
                <label class="check-row">
                    <input name="${l(c.name)}" type="checkbox"${c.value?" checked":""}>
                    <span>${l(c.label)}</span>
                </label>
            `:`
            <label>
                ${l(c.label)}
                <input name="${l(c.name)}" type="${l(c.type||"text")}" value="${l((p=c.value)!=null?p:"")}" ${c.min!==void 0?`min="${l(c.min)}"`:""}>
            </label>
        `}).join("");r.innerHTML=`
        <div class="modal-panel">
            <div class="modal-header">
                <div>
                    <h2>${l(e)}</h2>
                    <p class="modal-description">${l(t)}</p>
                </div>
                <button type="button" class="modal-close" aria-label="Yopish">\xD7</button>
            </div>
            <form class="modal-form modal-grid">
                ${u}
                <p class="form-message" data-modal-message aria-live="polite"></p>
                <div class="modal-actions">
                    <button type="submit">Saqlash</button>
                    <button type="button" class="secondary" data-cancel>Bekor qilish</button>
                </div>
            </form>
        </div>
    `;let o=()=>r.remove();return r.querySelector(".modal-close").addEventListener("click",o),r.querySelector("[data-cancel]").addEventListener("click",o),r.addEventListener("click",c=>{c.target===r&&o()}),r.querySelector("form").addEventListener("submit",c=>{c.preventDefault();let p=new FormData(c.target),b=Object.fromEntries(p.entries());a.filter(w=>w.type==="checkbox").forEach(w=>{b[w.name]=p.has(w.name)}),n(b,r.querySelector("[data-modal-message]"))!==!1&&o()}),document.body.append(r),r}function Wt(e){let t=e==null?void 0:e.querySelector('[name="role"]'),a=e==null?void 0:e.querySelector('[name="assignedClass"]'),n=e==null?void 0:e.querySelector('[name="dormitoryGender"]'),r=a==null?void 0:a.closest("label"),u=n==null?void 0:n.closest("label");if(!t||!a||!n)return;let o=()=>{let d=t.value==="dormitory";r==null||r.classList.toggle("is-hidden",d),u==null||u.classList.toggle("is-hidden",!d),a.disabled=d,d&&(a.value="")};t.addEventListener("change",o),o()}function Ve(e,t){let a=s[e].find(n=>n.id===t);if(a){if(e==="payments"){O({title:"To'lovni tahrirlash",fields:[{name:"paidAmount",label:"To'langan summa",type:"number",min:0,value:a.paidAmount||0},{name:"method",label:"To'lov usuli",type:"select",value:a.method||"Naqd pul",options:["Naqd pul","Click","Hisob raqam"]},{name:"note",label:"Chegirma va izoh",type:"text",value:a.note||""},{name:"paymentDate",label:"Sana",type:"date",value:a.paymentDate||D(a.createdAt)||f},{name:"contactStatus",label:"Aloqa holati",type:"select",value:a.contactStatus||"Aloqa qilinmagan",options:["Aloqa qilinmagan","Telefon qilindi","Va'da berdi","Hal qilindi"]}],onSave:n=>{a.paidAmount=Number(n.paidAmount||0),a.method=n.method,a.note=n.note,a.paymentDate=n.paymentDate||f,a.contactStatus=n.contactStatus,E(),x()}});return}if(e==="students"){O({title:"O'quvchini tahrirlash",fields:[{name:"name",label:"O'quvchi F.I.Sh",type:"text",value:a.name||""},{name:"className",label:"Sinf",type:"text",value:a.className||""},{name:"gender",label:"Jinsi",type:"select",value:a.gender||"O'g'il bola",options:["O'g'il bola","Qiz bola"]},{name:"phone",label:"Telefon",type:"tel",value:a.phone||""},{name:"monthlyFee",label:"Oylik to'lov",type:"number",min:0,value:a.monthlyFee||0},{name:"dormitory",label:"Yotoqxonada qoladi (+300000 so'm)",type:"checkbox",value:!!a.dormitory}],onSave:n=>{a.name=n.name,a.className=K(n.className),a.gender=n.gender,a.phone=n.phone,a.monthlyFee=Number(n.monthlyFee||0),a.dormitory=!!n.dormitory,a.dormitoryFee=a.dormitory?I:0,E(),x()}});return}if(e==="dormitoryAttendance"){O({title:"Yotoqxona davomatini tahrirlash",fields:[{name:"status",label:"Holati",type:"select",value:a.status||"Kelgan",options:["Kelgan","Kelmagan","Sababli kelmagan"]},{name:"date",label:"Sana",type:"date",value:a.date||f}],onSave:n=>{a.status=n.status,a.date=n.date||f,a.updatedAt=new Date().toISOString(),M("dormitoryAttendance","Yotoqxona davomati tahrirlandi",a),E(),x()}});return}if(e==="users"){let n=O({title:"Rolni tahrirlash",description:"Bitta ustozga bir nechta sinf berish uchun sinflarni vergul bilan yozing: 5-A, 7-A.",fields:[{name:"fullName",label:"F.I.Sh",type:"text",value:a.fullName||""},{name:"login",label:"Login",type:"text",value:a.login||""},{name:"password",label:"Parol",type:"text",value:a.password||""},{name:"role",label:"Rol",type:"select",value:a.role||"teacher",options:["admin","accountant","zauch","teacher","dormitory","warehouse"]},{name:"assignedClass",label:"Biriktirilgan sinflar (o'qituvchi uchun 2 tagacha)",type:"text",value:a.assignedClass||""},{name:"dormitoryGender",label:"Yotoqxona guruhi",type:"select",value:a.dormitoryGender||"O'g'il bola",options:["O'g'il bola","Qiz bola"]}],onSave:(r,u)=>{if(s.users.some(c=>c.id!==a.id&&String(c.login||"").toLowerCase()===String(r.login||"").toLowerCase()))return u.textContent="Bu login boshqa xodimda mavjud.",!1;let d=Se(r.assignedClass);if(r.role==="teacher"&&F({assignedClass:d}).length>2)return u.textContent="O'qituvchiga ko'pi bilan 2 ta sinf biriktiriladi.",!1;a.fullName=r.fullName,a.login=r.login,a.password=r.password,a.role=r.role,a.responsibility=P[r.role]||"",a.assignedClass=r.role==="dormitory"?"":d,a.dormitoryGender=r.role==="dormitory"?r.dormitoryGender:"",M("users","Rol tahrirlandi",a),E(),x()}});Wt(n);return}if(e==="admissions"){O({title:"Qabul ma'lumotini tahrirlash",fields:[{name:"studentName",label:"O'quvchi F.I.Sh",type:"text",value:a.studentName||""},{name:"className",label:"Sinf",type:"text",value:a.className||""},{name:"phone",label:"Telefon",type:"tel",value:a.phone||""},{name:"status",label:"Holati",type:"select",value:a.status||"Kelyapti",options:["Kelyapti","Qabul qilindi","Chiqib ketdi"]},{name:"admissionDate",label:"Sana",type:"date",value:a.admissionDate||f},{name:"note",label:"Izoh",type:"text",value:a.note||""}],onSave:n=>{a.studentName=n.studentName,a.className=K(n.className),a.phone=n.phone,a.status=n.status,a.admissionDate=n.admissionDate||f,a.note=n.note,M("admissions","Qabul ma'lumoti tahrirlandi",a),E(),x()}});return}if(e==="salaryReports"){ot(t);return}if(e==="services"){dt(t);return}if(e==="salaries"){O({title:"Oylikni tahrirlash",fields:[{name:"baseSalary",label:"Jami oylik",type:"number",min:0,value:a.baseSalary||0},{name:"advance",label:"Avans",type:"number",min:0,value:a.advance||0},{name:"bonus",label:"Bonus / KPI",type:"number",min:0,value:a.bonus||0}],onSave:n=>{a.baseSalary=Number(n.baseSalary||0),a.advance=Number(n.advance||0),a.bonus=Number(n.bonus||0),E(),x()}});return}if(e==="tutors"){O({title:"Repetitor oyligini tahrirlash",fields:[{name:"studentsCount",label:"Bola soni",type:"number",min:0,value:a.studentsCount||0},{name:"hours",label:"O'tgan soati",type:"number",min:0,value:a.hours||0},{name:"rate",label:"Stavka",type:"number",min:0,value:a.rate||0},{name:"bonus",label:"KPI bonus",type:"number",min:0,value:a.bonus||0}],onSave:n=>{a.studentsCount=Number(n.studentsCount||0),a.hours=Number(n.hours||0),a.rate=Number(n.rate||0),a.bonus=Number(n.bonus||0),E(),x()}});return}if(e==="finance"){pt(t);return}if(e==="founders"){O({title:"Ta'sischini tahrirlash",fields:[{name:"name",label:"Ta'sischi F.I.Sh",type:"text",value:a.name||""},{name:"percent",label:"Ulush foizi",type:"number",min:0,value:a.percent||0}],onSave:(n,r)=>{let u=Number(n.percent||0),o=s.founders.filter(d=>d.id!==a.id).reduce((d,c)=>d+Number(c.percent||0),0);if(o+u>100)return r.textContent=`Ta'sischilar ulushi 100% dan oshmasligi kerak. Qoldiq: ${100-o}%.`,!1;a.name=n.name,a.percent=u,E(),x()}});return}if(e==="staffSalaries"){let n=t0(a);O({title:"Tex xodim oyligini tahrirlash",fields:[{name:"name",label:"Tex xodim F.I.Sh",type:"text",value:a.name||""},{name:"job",label:"Lavozimi",type:"text",value:a.job||""},{name:"salary",label:"Oylik",type:"number",min:0,value:a.salary||0},{name:"fine",label:"Jarima",type:"number",min:0,value:a.fine||0},{name:"advance",label:"Berilgan avans",type:"number",min:0,value:n.advanceTotal||0},{name:"advanceType",label:"Avans turi",type:"select",value:a.advanceType||"Bank orqali",options:["Bank orqali","Click","Naqd pul"]}],onSave:r=>{a.name=r.name,a.job=r.job,a.salary=Number(r.salary||0),a.fine=Number(r.fine||0),a.advance=Number(r.advance||0),a.advanceType=ce(r.advanceType),a.advanceBank=0,a.advanceClick=0,a.advanceCash=0,E(),x()}})}}}function Ze(e,t){O({title:"Ma'lumotni o'chirish",description:"Ushbu yozuv o'chirilsinmi?",fields:[],onSave:()=>{let a=s[e].find(n=>n.id===t);a&&M(e,"O'chirildi",a),s[e]=s[e].filter(n=>n.id!==t),E(),x()}})}function I0(){let e=A(s.payments,"paidAmount"),t=A(s.finance.filter(p=>p.type!=="Rasxod"),"amount"),a=A(s.finance.filter(p=>p.type==="Rasxod"),"amount"),n=s.salaries.reduce((p,b)=>p+b.baseSalary+b.bonus,0),r=s.staffSalaries.reduce((p,b)=>p+Number(b.salary||0),0),u=s.tutors.reduce((p,b)=>p+G0(b),0),o=s.payments.reduce((p,b)=>p+Math.max(b.requiredAmount-b.paidAmount,0),0),d=e+t,c=n+u+r;return{income:d,expenses:a,salaryCost:c,debt:o,profit:d-a-c}}function re(){return i?i.role==="teacher"?s.students.filter(e=>F(i).includes(e.className)):i.role==="dormitory"?s.students.filter(e=>e.gender===i.dormitoryGender):s.students:[]}function D0(){return i?i.role==="teacher"?s.payments.filter(e=>F(i).includes(e.className)||e.teacherId===i.id):s.payments:[]}function Ut(){if(!i)return[];let e=s.finance.filter(t=>t.type==="Rasxod");return i.role==="accountant"?e.filter(t=>t.createdById===i.id||!t.createdById&&t.createdBy===i.fullName):e}function z0(){return i?i.role==="teacher"?s.salaryReports.filter(e=>e.teacherId===i.id):s.salaryReports:[]}function ea(){return i?i.role==="teacher"?s.salaries.filter(e=>e.teacherId===i.id):s.salaries:[]}function ta(){return i?i.role==="teacher"?s.tutors.filter(e=>e.teacherId===i.id):s.tutors:[]}function We(){let e=[...new Set([...s.students.map(t=>t.className),...ue().flatMap(t=>F(t))].filter(Boolean))];return i.role==="teacher"?F(i):e}function ue(){return s.users.filter(e=>e.role==="teacher")}function F(e={}){return String(e.assignedClass||"").split(",").map(t=>K(t)).filter(Boolean)}function ye(e=""){return String(e||"").trim().toLowerCase()}async function aa(){if((i==null?void 0:i.role)!=="teacher")return{allowed:!0};if(!navigator.geolocation)return{allowed:!1,message:"Bu qurilmada geolokatsiya ishlamaydi. Davomatni maktab hududida topshirish uchun lokatsiya kerak."};S("#attendanceMessage","Lokatsiya tekshirilmoqda. Ruxsat bering...");try{let e=await na(),t=e.coords.latitude,a=e.coords.longitude,n=Math.round(ra(t,a,xe.latitude,xe.longitude));return n>xe.radiusMeters?{allowed:!1,message:`Davomat faqat maktab atrofida olinadi. Siz maktabdan taxminan ${n} metr uzoqdasiz.`}:{allowed:!0,latitude:t,longitude:a,distanceMeters:n}}catch(e){return{allowed:!1,message:ua(e)}}}function na(){return new Promise((e,t)=>{navigator.geolocation.getCurrentPosition(e,t,{enableHighAccuracy:!0,maximumAge:0,timeout:15e3})})}function ra(e,t,a,n){let u=me(e),o=me(a),d=me(a-e),c=me(n-t),p=Math.sin(d/2)**2+Math.cos(u)*Math.cos(o)*Math.sin(c/2)**2;return 2*6371e3*Math.atan2(Math.sqrt(p),Math.sqrt(1-p))}function me(e){return Number(e||0)*Math.PI/180}function ua(e={}){return e.code===1?"Lokatsiyaga ruxsat berilmasa davomat saqlanmaydi.":e.code===2?"Lokatsiyani aniqlab bo'lmadi. Internet/GPSni yoqib qayta urinib ko'ring.":e.code===3?"Lokatsiyani aniqlash vaqti tugadi. Qayta urinib ko'ring.":"Lokatsiya tekshiruvida xatolik bo'ldi. Qayta urinib ko'ring."}function v(e){return i&&(V0[i.role]||[]).includes(e)}function He(e){if(!i)return e==="dashboard";if(e==="dashboard")return i.role==="superadmin"||i.role==="admin";if(i.role==="superadmin"||i.role==="admin")return!0;let t=i.responsibility||P[i.role]||"";return(w0[t]||[]).includes(e)}function ia(){if(!i||i.role==="superadmin"||i.role==="admin")return"dashboard";let e=i.responsibility||P[i.role]||"";return(w0[e]||[])[0]||"students"}function H0(e){return e==="dormitoryAttendance"?O0():v({payments:"finance",students:"students",users:"roles",admissions:"admissions",schedules:"schedule",salaryReports:"salaryReports",salaries:"salaries",tutors:"tutors",finance:"finance",founders:"founders",services:"services",staffSalaries:"services",salarySheetReadOnly:"never"}[e])}function L(e,t){document.querySelectorAll(`${e} input, ${e} select, ${e} button`).forEach(a=>{a.disabled=!t})}function Q(e,t,a,n=!1){let r=document.createElement("button");return r.type="button",r.className=t,r.textContent=e,r.disabled=n,r.addEventListener("click",a),r}function P0(e){let t=e==="dark";document.body.classList.toggle("dark-theme",t),localStorage.setItem(C0,t?"dark":"light"),Ke.textContent=t?"\u2600":"\u263E",Ke.setAttribute("aria-label",t?"Kunduzgi rejimga o'tish":"Tungi rejimga o'tish")}function sa(){let e=localStorage.getItem(be),t=e?JSON.parse(e):{};return Ue(t)}function E(){localStorage.setItem(be,JSON.stringify(s)),j0(),da()}async function ca(){try{let e=await fetch("/api/platform");if(!e.ok)return;let t=await e.json();if(t&&Object.keys(t).length){let a=K0(t);s=Ue(t),localStorage.setItem(be,JSON.stringify(s)),a&&await j0(),i&&x()}pe=!0}catch(e){pe=!1}}async function j0(){try{pe=(await fetch("/api/platform",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)})).ok}catch(e){pe=!1}}function oa(){if(!(!window.firebase||!window.IDEAL_SCHOOL_FIREBASE_CONFIG))try{firebase.apps.length||firebase.initializeApp(window.IDEAL_SCHOOL_FIREBASE_CONFIG),firebase.analytics&&window.IDEAL_SCHOOL_FIREBASE_CONFIG.measurementId&&firebase.analytics(),J=firebase.firestore(),je=!0,la()}catch(e){console.warn("Firebase ulanmagan:",e),je=!1}}async function la(){if(J)try{let e=await J.collection("platform").doc("idealSchool").get();if(e.exists){let t=e.data(),a=K0(t);s=Ue(t),localStorage.setItem(be,JSON.stringify(s)),a&&await J.collection("platform").doc("idealSchool").set(s)}else await J.collection("platform").doc("idealSchool").set(s);i&&x()}catch(e){console.warn("Firebase'dan o'qishda xatolik:",e)}}async function da(){if(!(!J||!je))try{await J.collection("platform").doc("idealSchool").set(s)}catch(e){console.warn("Firebase'ga saqlashda xatolik:",e)}}function Ue(e={}){let t=e.settings&&typeof e.settings=="object"?e.settings:{},a=t.archivePolicyVersion===Pe?Q0(e.archive):[],n=Array.isArray(e.users)?e.users.map(u=>({subject:"",dormitoryGender:"",...u,responsibility:u.responsibility||P[u.role]||""})):[],r=new Set(n.map(u=>u.login));return X0.forEach(u=>{r.has(u.login)||n.unshift(u)}),{users:n,students:Array.isArray(e.students)?e.students.map(u=>({monthlyFee:0,dormitory:!1,dormitoryFee:0,gender:"",...u})):[],schedules:Array.isArray(e.schedules)?e.schedules:[],salaryReports:Array.isArray(e.salaryReports)?e.salaryReports.map(u=>({subject:"",position:u.position||u.subject||"",className:u.className||"",salaryAmount:0,advance:0,loan:Number(u.loan||0),paymentTarget:"Bank karta",bankCard:"",calculatedSalary:0,remainingSalary:0,...u,advanceType:ce(u.advanceType||"Bank orqali")})):[],payments:Array.isArray(e.payments)?e.payments.map(u=>({category:"O'qish to'lovi",method:"Naqd pul",note:"",paymentDate:String(u.createdAt||"").slice(0,10),dormitory:!1,...u})):[],attendance:Array.isArray(e.attendance)?e.attendance:[],dormitoryAttendance:Array.isArray(e.dormitoryAttendance)?e.dormitoryAttendance:[],admissions:Array.isArray(e.admissions)?e.admissions:[],salaries:Array.isArray(e.salaries)?e.salaries:[],tutors:Array.isArray(e.tutors)?e.tutors:[],founders:Array.isArray(e.founders)?e.founders:[],pendingExpenses:Array.isArray(e.pendingExpenses)?e.pendingExpenses:[],archive:a,finance:Array.isArray(e.finance)?e.finance.map(u=>({quantity:"",createdById:"",expenseDate:String(u.createdAt||"").slice(0,10),...u})):[],services:Array.isArray(e.services)?e.services.map(u=>({...u,driverName:u.driverName||u.title||"",job:u.job||"haydovchi",salary:Number(u.salary||0),advance:Number(u.advance||0),advanceType:a0(u.advanceType||"Naqd pul")})):[],staffSalaries:Array.isArray(e.staffSalaries)?e.staffSalaries.map(u=>({...u,fine:Number(u.fine||0),advanceBank:Number(u.advanceBank||0),advanceClick:Number(u.advanceClick||0),advanceCash:Number(u.advanceCash||u.advance||0),advance:Sa(u),advanceType:ce(u.advanceType||ga(u))})):[],settings:{smallClassFee:0,bigClassFee:0,dormitoryFee:0,...t,archivePolicyVersion:Pe}}}function K0(e={}){return(e.settings&&typeof e.settings=="object"?e.settings:{}).archivePolicyVersion!==Pe?!0:Q0(e.archive).length!==(Array.isArray(e.archive)?e.archive.length:0)}function Q0(e){let t=new Date().toISOString().slice(0,7);return Array.isArray(e)?e.filter(a=>String(a.archivedAt||"").slice(0,7)===t):[]}function C(e,t,a){E(),e&&e.reset(),t&&a&&S(t,a),x()}function G0(e){return e.studentsCount*e.hours*e.rate+e.bonus}function A(e,t){return e.reduce((a,n)=>a+Number(n[t]||0),0)}function ma(e,t,a){let n=new Map;return e.forEach(r=>{let u=r[t]||"Boshqa";n.set(u,(n.get(u)||0)+Number(r[a]||0))}),[...n.entries()].map(([r,u])=>({label:r,value:u}))}function pa(e,t,a){let n=document.querySelector(e);if(!n)return;let r=Math.max(...t.map(u=>Number(u.value||0)),1);n.innerHTML="",t.forEach(u=>{let o=document.createElement("div");o.className="chart-row";let d=a>0?Math.max(Number(u.value||0)/r*100,6):6;o.innerHTML=`
            <span>${l(u.label)}</span>
            <div class="chart-track"><i style="width: ${d}%"></i></div>
            <strong>${h(u.value)} so'm</strong>
        `,n.append(o)})}function ha(e,t,a){let n=document.querySelector(e);if(!n)return;let r=Math.max(...t.map(c=>Number(c.value||0)),1),u=0,o=t.map(c=>{let p=a>0?Number(c.value||0)/a*100:0,b=u;return u+=p,`${c.color} ${b}% ${u}%`}).join(", ");n.innerHTML=`
        <div class="income-chart-layout">
            <div class="donut-chart" style="background: conic-gradient(${a>0?o:"#243653 0 100%"});">
                <span>${h(a)}<small>so'm</small></span>
            </div>
            <div class="income-bars"></div>
        </div>
    `;let d=n.querySelector(".income-bars");t.forEach(c=>{let p=document.createElement("div");p.className="chart-row";let b=a>0?Math.max(Number(c.value||0)/r*100,6):6;p.innerHTML=`
            <span><i class="legend-dot" style="background:${c.color}"></i>${l(c.label)}</span>
            <div class="chart-track"><i style="width: ${b}%; background:${c.color}"></i></div>
            <strong>${h(c.value)} so'm</strong>
        `,d.append(p)})}function m(e){let t=document.querySelector(e);return t?String(t.value||"").trim():""}function g(e){return Number(m(e)||0)}function y(e,t){let a=document.querySelector(e);a&&(a.value=t)}function k(e){return`${e}-${Date.now()}-${Math.random().toString(16).slice(2)}`}function K(e){return e.trim().toUpperCase()}function Se(e){return String(e||"").split(/[,;\n]+/).map(t=>K(t)).filter(Boolean).filter((t,a,n)=>n.indexOf(t)===a).join(", ")}function e0(e){return ya(e)?Number(s.settings.bigClassFee||0):Number(s.settings.smallClassFee||0)}function ya(e){var a;return Number(((a=String(e||"").match(/\d+/))==null?void 0:a[0])||0)>=8}function J0(e){let t=s.payments.filter(u=>u.studentId===e.id&&u.month===R),a=(e.monthlyFee||e0(e.className))+(e.dormitory?e.dormitoryFee||I:0),n=A(t,"paidAmount"),r=Math.max(a-n,0);return{paid:n,debt:r,label:r?"To'lanmagan":"To'langan"}}function ba(){let e=new Date().toISOString().slice(0,10),t=s.payments.filter(c=>String(c.createdAt||"").slice(0,10)===e),a=s.finance.filter(c=>String(c.createdAt||"").slice(0,10)===e),n=A(t.filter(c=>c.method==="Naqd pul"),"paidAmount"),r=A(t.filter(c=>c.method==="Click"||c.method==="Click/Payme"),"paidAmount"),u=A(t.filter(c=>c.method==="Hisob raqam"),"paidAmount"),o=A(a.filter(c=>c.type==="Rasxod"),"amount"),d=A(t,"paidAmount")+A(a.filter(c=>c.type!=="Rasxod"),"amount");return{income:d,cash:n,click:r,account:u,expense:o,net:d-o}}function va(){y("#smallClassFee",s.settings.smallClassFee||""),y("#bigClassFee",s.settings.bigClassFee||"")}function V(e={}){let t=Number(e.salaryAmount||e.calculatedSalary||0),a=Number(e.advance||0),n=Number(e.loan||0),r=Number(e.fine||0),u=a+n;return{lessonSalary:0,certificatePayment:0,extraPayment:0,advance:u,loan:n,total:t,remaining:Math.max(t-r-u,0)}}function t0(e={}){let t=Number(e.salary||0),a=Number(e.fine||0),n=Number(e.advance||0)||Number(e.advanceBank||0)+Number(e.advanceClick||0)+Number(e.advanceCash||0);return{advanceTotal:n,remaining:Math.max(t-a-n,0)}}function Y0(e,t){let a=ce(t),n=Number(e||0);return{bank:a==="Bank orqali"?n:0,click:a==="Click"?n:0,cash:a==="Naqd pul"?n:0}}function fa(e,t){let a=a0(t),n=Number(e||0);return{cash:a==="Naqd pul"?n:0,click:a==="Click"?n:0}}function ce(e=""){let t=String(e).trim().toLowerCase();return t.includes("click")?"Click":t.includes("naqd")?"Naqd pul":"Bank orqali"}function a0(e=""){let t=String(e).trim().toLowerCase();return t.includes("click")||t.includes("klik")?"Click":"Naqd pul"}function ga(e={}){return Number(e.advanceBank||0)>0?"Bank orqali":Number(e.advanceClick||0)>0?"Click":Number(e.advanceCash||e.advance||0)>0?"Naqd pul":"Bank orqali"}function Sa(e={}){let t=Number(e.advance||0);return t||Number(e.advanceBank||0)+Number(e.advanceClick||0)+Number(e.advanceCash||0)}function D(e){return String(e||"").slice(0,10)||"-"}function _0(){!j||!W||(j.classList.remove("sidebar-open"),W.setAttribute("aria-expanded","false"),W.setAttribute("aria-label","Menyuni ochish"))}function qa(){document.addEventListener("contextmenu",e=>{j.classList.contains("is-hidden")||(e.preventDefault(),se("O'ng tugma o'chirilgan."))}),document.addEventListener("keydown",e=>{if(j.classList.contains("is-hidden"))return;let t=e.key.toLowerCase();if(e.key==="F12"||e.ctrlKey&&e.shiftKey&&["i","j","c"].includes(t)||e.ctrlKey&&["u","s","p"].includes(t)){e.preventDefault(),se("Bu amal platformada cheklangan.");return}e.key==="PrintScreen"&&se("Skrinshot olish platformada taqiqlangan.")})}function se(e){let t=document.querySelector("#securityNotice");t||(t=document.createElement("div"),t.id="securityNotice",t.className="security-notice",document.body.append(t)),t.textContent=e,t.classList.add("is-visible"),clearTimeout(se.timeout),se.timeout=setTimeout(()=>t.classList.remove("is-visible"),1800)}function S(e,t){let a=document.querySelector(e);a.textContent=t,setTimeout(()=>{a.textContent=""},2400)}function h(e){return new Intl.NumberFormat("uz-UZ").format(Number(e||0))}function s0(e){let t=Number(e||0);return t>=1e6?`${(t/1e6).toFixed(1)} mln`:h(t)}function l(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}})();
