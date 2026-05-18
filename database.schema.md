# IDEAL SCHOOL Database Schema

Firestore document: `platform/idealSchool`

Collections are stored as arrays inside the document for the current frontend version:

- `users`: `fullName`, `login`, `password`, `role`, `subject`, `assignedClass`
- `students`: `name`, `className`, `phone`, `monthlyFee`, `dormitory`, `dormitoryFee`
- `payments`: `month`, `className`, `studentId`, `studentName`, `category`, `method`, `requiredAmount`, `paidAmount`, `contactStatus`, `dormitory`
- `salaryReports`: `month`, `teacherId`, `teacherName`, `subject`, `salaryAmount`, `advance`, `advanceType`, `paymentTarget`, `bankCard`, `calculatedSalary`, `remainingSalary`, `createdBy`
- `salaries`: `month`, `teacherId`, `teacherName`, `baseSalary`, `advance`, `bonus`
- `tutors`: `month`, `teacherId`, `teacherName`, `studentsCount`, `hours`, `rate`, `bonus`
- `founders`: `name`, `percent`
- `finance`: `type`, `title`, `amount`, `createdBy`
- `services`: `type`, `driverName`, `salary`, `advance`, `createdBy`
- `staffSalaries`: `name`, `job`, `month`, `salary`, `advance`, `createdBy`

Roles:

- `superadmin`: all sections, including roles and teacher creation
- `admin`: school management without role creation
- `zauch`: salaryReports, students, payments, salaries, tutors
- `accountant`: payments, finance, students, founders
- `teacher`: own class students and payments
- `staff`: services
