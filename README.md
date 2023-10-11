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
![FinalP2CHANGES drawio](https://github.com/kaohenry9287/DMDD_group13/assets/43743693/ba549527-4f7b-4b11-8d50-57ad6bd15772)


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
  5. DepartmentID
  6. Phone Number
  7. License Number
  8. Holiday Dates
- Department
  1. DepartmentID (Primary Key)
  2. Department Name
  3. Description
  4. Location
- Hospital
  1. HospitalID (Primary Key)
  2. Hospital Name
  3. Hospital Address
- Billing
  1. Billing ID (Primary Key)
  2. Patient ID (Foreign Key)
  3. Doctor ID (Foreign Key)
  4. Appointment ID (Foreign Key)
  5. Billing Date
  6. Amount
  7. Payment Status
- Room
  1. Room Number
  2. Floor Number
- Insurance
  1. Insurance ID (Primary key)
  2. Insurance Company Name
  3. Policy Number
  4. Expiration Date
- Report
  1. ReportID (Primary Key)
  2. ReportDescription
  3. ReportDate
- Prescription
  1. PrescriptionID (Primary Key)
  2. PatientID (Foreign Key)
  3. ReportID (Foreign Key)
  4. Medication Name
  5. Dosage
  6. Start Date
  7. End Date
- Test
  1. TestID (Primary Key)
  2. PatientID (Foreign Key)
  3. ReportID (Foreign Key)
  4. Test Name
  5. Date
  6. Result
 
### RELATION BETWEEN ENTITIES

1. Patient-Appointment: Each patient is associated with one or more appointments. This relationship links patients to their scheduled medical visits, allowing for tracking appointment history and ensuring timely care.
2. Appointment-Doctor: An appointment is linked to a specific doctor or healthcare provider. This relationship establishes the connection between the scheduled visit and the healthcare professional who will attend to the patient.
3. Doctor-Department: Doctors are affiliated with specific departments within the healthcare institution. This relationship defines the specialization and expertise of each doctor.
4. Department-Hospital: Each department operates within a particular hospital. This relationship helps in the organization of medical services, and it is vital for resource allocation.
5. Hospital-Room: Hospitals consist of multiple rooms, such as patient rooms, examination rooms, and operating rooms. This relationship associates rooms with the hospital they belong to.
6. Patient-Room: Patients have to go to a specific room to receive the treatment. 
7. Patient-Billing: Each patient has a billing record associated with their medical expenses. This relationship facilitates the management of financial transactions related to healthcare services.
8. Doctor-Billing: Doctors generate bills for their services. This relationship connects the healthcare provider to the billing system, enabling accurate invoicing for medical consultations and procedures.
9. Patient-Prescription: Patients receive prescriptions for medications from doctors. This relationship tracks the medications prescribed to individual patients.
10. Prescription-Report: It links prescriptions to the report which is prescribed by the doctor in the report during the appointment. This is essential for tracking the medical history of patients and ensuring the proper administration of medications.
11. Patient-Test: Patients may undergo various medical tests. This relationship associates patients with the tests they are scheduled for or have undergone, facilitating the tracking of diagnostic procedures.
12. Report-Doctor: The doctor will give a report for each appointment with a Patient, which might contain a Test or Prescription or none.
13. Test-Report: The report may contain medical tests for patients. This relationship connects the tests to the healthcare providers who requested them, ensuring that the correct tests are conducted and results communicated.
15. Patient-Insurance: Patients may have health insurance coverage. This relationship links patients to their respective insurance policies, enabling the healthcare facility to verify coverage and manage insurance claims.

### DESIGN DECISIONS

1. A PATIENT may have many BILLINGs. However, each BILLING must belong to exactly one PATIENT.
2. A PATIENT may make many APPOINTMENTs. But each APPOINTMENT must belong to exactly one PATIENT. 
3. A PATIENT may have many PRESCRIPTIONs. However, each PRESCRIPTIONS must belong to exactly one PATIENT.
4. A PATIENT may use many INSURANCE. But each INSURANCE must belong to exactly one PATIENT.
5. A PATIENT may have many PRESCRIPTIONs. However, each PRESCRIPTION must belong to one PATIENT.
6. A PATIENT may take many TESTs. And each TEST may be taken by one PATIENT.
7. A REPORT may contain many PRESCRIPTIONs. But each PRESCRIPTION must be a part of exactly one REPORT.
8. A REPORT may contain many TESTs. But each TEST must be a part of exactly one REPORT.
9. A DOCTOR must give at least one REPORT. And each REPORT must be given by exactly one DOCTOR.
10. A DEPARTMENT may have many DOCTORs. But each DOCTOR must belong to exactly one DEPARTMENT.
11. A HOSPITAL may have many DEPARTMENTs. But each DEPARTMENT must belong to exactly one HOSPITAL.
12. A DEPARTMENT  may have many RESOURCEs. And each RESOURCE must belong to at least one DEPARTMENT.
13. A ROOM may be assigned to many PATIENTs. And each PATIENT may accommodate one ROOM.
14. A HOSPITAL must have at least one ROOM. And each ROOM only could belong to one HOSPITAL.
