# DMDD_group13
The project of group 13 of NEU Database Management and Database Design in 2023 Fall

## Topic: Patient Appointment Scheduling System

### Background

Imagine you're in a busy healthcare facility, trying to schedule a doctor's appointment. But it's not as simple as picking a date and time. Other factors to consider include making sure there's a room available, the necessary medications are on hand, and any required tests are in order.
Here's the question: Can we handle all this efficiently without a reliable database? Is it practical to rely solely on manual methods, like jotting down appointments with pen and paper, without considering the complexities involved?
That's where our Patient Appointment Scheduling System comes into play. It breaks down the different parts of this system and shows how they work together smoothly. It emphasizes how technology helps streamline the process, ensuring timely care and efficient resource management.
In today's ever-changing healthcare landscape, this system isn't just a convenience; it's a necessity. It's about more than just appointments; it's about making the entire process better for patients while keeping things organized and formal.



### Mission Statement/Objectives

Our primary objective is to develop and implement a robust Patient Appointment Scheduling System that simplifies the booking process, minimizes no-shows, and maximizes the utilization of healthcare resources. We strive to provide an intuitive and efficient platform that integrates seamlessly with existing healthcare systems, ultimately improving patient care, reducing administrative burdens, and fostering data-driven decision-making within the healthcare industry.

### ER DIAGRAM
![P3](https://github.com/kaohenry9287/DMDD_group13/assets/43743693/9e9e2f8a-739f-4973-9656-a114b6e7ada3)


### Entities

1. Patient
2. Appointment
3. Doctor
4. Department
5. Hospital
6. Billing
7. Room
8. Insurance
9. Report
10. Prescription
11. Test
12. Holiday

### Entities and their Attributes
- Patient
  1. PatientID (Primary Key)
  2. First Name
  3. Last Name
  4. Date Of Birth
  5. Gender
  6. Phone Number
  7. Emergency Contact Name
  8. Emergency Contact Number
- Appointment
  1. AppointmentID (Primary Key)
  2. PatientID (Foreign Key)
  3. DoctorID (Foreign Key)
  4. Appointment Date Time
  5. Appointment Status
  6. Appointment Reason
  7. Comments
- Doctor
  1. DoctorID (Primary Key)
  2. First Name
  3. Last Name
  4. Specialization
  5. Phone Number
  6. License Number
  7. Holiday Dates(Multivalued attribute)

- Department
  1. DepartmentID (Primary Key)
  2. HospitalID(Foreign Key)
  3. Department Name
  4. Description
  5. Location
- Hospital
  1. HospitalID (Primary Key)
  2. Hospital Name
  3. Hospital Address
- Billing
  1. Billing ID (Primary Key)
  2. Appointment ID (Foreign Key)
  3. Billing Date
  4. Amount
  5. Payment Status
- Room
  1. Room Number(Primary Key)
  2. Appointment ID (Foreign Key)
  3. Floor Number
- Insurance
  1. Insurance ID (Primary key)
  2. PatientID (Foreign Key)
  3. Insurance Company Name
  4. Policy Number
  5. Expiration Date
- Report
  1. ReportID (Primary Key)
  2. ReportDescription
  3. ReportDate
- Prescription
  1. PrescriptionID (Primary Key)
  2. ReportID (Foreign Key)
  3. Medication Name
  4. Dosage
  5. Start Date
  6. End Date
- Test
  1. TestID (Primary Key)
  2. ReportID (Foreign Key)
  3. Test Name
  4. Date
  5. Result
 
- Holiday 
  1. DoctorID (Primary Key, Foreign Key)
  2. HolidayDate
 
### RELATION BETWEEN ENTITIES

1. Patient-Insurance: Patients may have health insurance coverage. This relationship links patients to their respective insurance policies, enabling the healthcare facility to verify coverage and manage insurance claims.

2. Patient-Appointment: Each patient is associated with one or more appointments. This relationship links patients to their scheduled medical visits, allowing for tracking appointment history and ensuring timely care.

3. Appointment-Billing: Each billing record is associated with a specific appointment, and conversely, an appointment is linked to its corresponding billing information. This relationship simplifies the financial aspect of healthcare services, enabling accurate billing and payment tracking.

4. Appointment-Room: Each appointment is assigned to a specific room, and each room is scheduled based on appointments. This relationship is crucial for efficiently managing the allocation of examination and treatment spaces.

5. Appointment-Report: Every appointment generates a report detailing the proceedings, and each report is specific to an appointment. This relationship facilitates the recording and retrieval of essential medical information.

6. Report-Prescription: It links prescriptions to the report which is prescribed by the doctor in the report during the appointment. This is essential for tracking the medical history of patients and ensuring the proper administration of medications.

7. Report-Test: The report may contain medical tests for patients. This relationship connects the tests to the healthcare providers who requested them, ensuring that the correct tests are conducted and results communicated.

8. Appointment-Doctor: An appointment is linked to a specific doctor or healthcare provider. This relationship establishes the connection between the scheduled visit and the healthcare professional who will attend to the patient.

9. Doctor-Department: Doctors are affiliated with specific departments within the healthcare institution, where they apply their specialized expertise. This relationship is vital for organizing medical services and aligning the right doctors with the appropriate departments.

10. Department-Hospital: Each department operates within a specific hospital, contributing to the efficient organization of medical services and resource allocation within the healthcare institution. This relationship helps ensure the smooth functioning of the entire healthcare system.

11. Doctor-Holiday: Doctor may or may not go on leave which makes it optional many relation. Sometimes they go for conferences which makes them unavailable for appointments with patients. In the same way a holiday/leave will definitely have a person who applied for a holiday or going on leave. 


### DESIGN DECISIONS

1. A PATIENT may have multiple INSURANCE policies, but each INSURANCE policy must be associated with exactly one PATIENT.
2. A PATIENT may schedule multiple APPOINTMENTS, but each APPOINTMENT must be linked to precisely one PATIENT.
3. An APPOINTMENT must be associated with exactly one REPORT, and each REPORT must be generated for precisely one APPOINTMENT.
4. A REPORT may include multiple PRESCRIPTIONs, but each PRESCRIPTION must be a component of exactly one REPORT.
5. A REPORT may encompass multiple TESTs, but each TEST must be a part of exactly one REPORT.
6. A ROOM must be assigned to exactly one APPOINTMENT, and each APPOINTMENT will be conducted in a ROOM.
7. A BILLING record is tied to exactly one APPOINTMENT, and each APPOINTMENT will have precisely one BILLING record.
8. An APPOINTMENT will be allocated to one or more DOCTORS, and a DOCTOR may be responsible for multiple APPOINTMENTS.
9. A DEPARTMENT may employ multiple DOCTORS, but each DOCTOR must be affiliated with exactly one DEPARTMENT.
10. A HOSPITAL may house multiple DEPARTMENTS, but each DEPARTMENT must be a part of exactly one HOSPITAL.

### CHANGES FOR P3

1. Released the relationship between “Patient” and “Room”, “Patient” and “Billing”. “Room” and “Billing” are now related to “Patient” by accessing “Appointment” which has “PatientID” as a foreign key.
2. Released the relationship between “Billing” and “Doctor”, “Report” and “Doctor”. “Billing” and “Report” are now related to “Doctor” by accessing “Appointment” which has “DoctorID” as a foreign key.
3. Deleted “Resource” entity.
4. Added entity “Holiday” related to “Doctor” entity. Each doctor may have many holidays.
5. Deleted the relationship between “Prescription” and “Patient”, “Test” and “Patient”. “Prescription” and “Test” are now just contained in the “Report” entity.
6. Released the relationship between “Room” and “Hospital”. “Room” is now being related to “Hospital” by a foreign key chain like Room->Appointment->Doctor->Department->Hospital.
7. The diagram is now normalized to 3NF.
