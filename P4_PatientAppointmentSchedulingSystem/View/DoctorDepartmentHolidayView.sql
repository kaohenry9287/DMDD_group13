CREATE VIEW DoctorDepartmentHolidayView
AS
SELECT
    D.doctor_fname,
    D.doctor_lname,
    D.doctor_specialization,
    D.doctor_phone,
    DP.department_name,
    H.holiday_date
FROM dbo.Doctor D
JOIN dbo.Department DP ON D.department_id = DP.department_id
LEFT JOIN dbo.Holiday H ON D.doctor_id = H.doctor_id;