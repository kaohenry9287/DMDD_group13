CREATE DATABASE Hospital_system
go
USE  Hospital_system
GO

CREATE TABLE dbo.Patient
(
    patient_id int IDENTITY(1,1) NOT NULL,
    patient_fname varchar(20) NOT NULL,
    patient_lname varchar(20) NOT NULL,
    patient_birth varchar(20),
    patient_gender varchar(20),
    patient_phone varchar(20),
    emergency_Contact_Name varchar(20),
    emergency_Contact_Num varchar(20),
    CONSTRAINT Patient_PK PRIMARY KEY (patient_id)
);

CREATE TABLE dbo.Insurance
(
    insurance_id int IDENTITY(1,1) NOT NULL,
    patient_id int NOT NULL,
    policy_num varchar(50),
    expiration_date varchar(50),
    insurance_company_name VARCHAR(50),
    CONSTRAINT Insurance_PK PRIMARY KEY (insurance_id),
    CONSTRAINT Insurance_FK FOREIGN KEY (patient_id) REFERENCES Patient(patient_id)
);

CREATE TABLE dbo.Hospital
(
    hospital_id int IDENTITY(1,1) NOT NULL,
    hospital_name varchar(50),
    hospital_location varchar(50),
    CONSTRAINT Hospital_PK PRIMARY KEY (hospital_id)
);

CREATE TABLE dbo.Department
(
    department_id int IDENTITY(1,1) NOT NULL,
    hospital_id int NOT NULL,
    department_name varchar(50),
    department_description varchar(50),
    department_location varchar(50),
    CONSTRAINT Department_PK PRIMARY KEY (department_id),
    CONSTRAINT Department_FK FOREIGN KEY(hospital_id) REFERENCES Hospital(hospital_id)
);

CREATE TABLE dbo.Doctor
(
    doctor_id int IDENTITY(1,1) NOT NULL,
    department_id int NOT NULL,
    doctor_fname varchar(20),
    doctor_lname varchar(20),
    doctor_specialization varchar(20),
    doctor_phone varchar(20),
    doctor_license varchar(20),
    doctor_holiday varchar(20),
    CONSTRAINT Doctor_PK PRIMARY KEY (doctor_id),
    CONSTRAINT Doctor_FK FOREIGN KEY(department_id) REFERENCES Department(department_id)
);

CREATE TABLE dbo.Holiday
(
    doctor_id int NOT NULL,
    holiday_date varchar(20),
    CONSTRAINT Holiday_PK PRIMARY KEY (doctor_id, holiday_date),
    CONSTRAINT Holiday_FK FOREIGN KEY (doctor_id) REFERENCES Doctor(doctor_id)
);

CREATE TABLE dbo.Appointment
(
    appointment_id int IDENTITY(1,1) NOT NULL,
    patient_id int NOT NULL,
    doctor_id int NOT NULL,
    appointment_date varchar(20),
    appointment_status VARCHAR(10),
    appointment_reason VARCHAR(50),
    appointment_comments VARCHAR(50),
    CONSTRAINT Appointment_PK PRIMARY KEY (appointment_id),
    CONSTRAINT Appointment_FK1 FOREIGN KEY (patient_id) REFERENCES Patient(patient_id),
    CONSTRAINT Appointment_FK2 FOREIGN KEY (doctor_id) REFERENCES Doctor(doctor_id)
);

CREATE TABLE dbo.Report
(
    report_id int IDENTITY(1,1) NOT NULL,
    report_description varchar(50),
    report_date varchar(20),
    CONSTRAINT Report_PK PRIMARY KEY (report_id)
);

CREATE TABLE dbo.Prescription
(
    prescription_id int IDENTITY(1,1) NOT NULL,
    report_id int NOT NULL,
    medication_name varchar(20),
    dosage int,
    start_date varchar(20),
    end_date varchar(20),
    CONSTRAINT Prescription_PK PRIMARY KEY (prescription_id),
    CONSTRAINT Prescription_FK FOREIGN KEY (report_id) REFERENCES Report(report_id)
);

CREATE TABLE dbo.Billing
(
    billing_id int IDENTITY(1,1) NOT NULL,
    appointment_id int NOT NULL,
    billing_date varchar(20),
    billing_amount int,
    payment_status varchar(10),
    CONSTRAINT Billing_PK PRIMARY KEY (billing_id),
    CONSTRAINT Billing_FK FOREIGN KEY (appointment_id) REFERENCES Appointment(appointment_id)
);

CREATE TABLE dbo.Test
(
    test_id int IDENTITY(1,1) NOT NULL,
    report_id int NOT NULL,
    test_name varchar(20),
    test_date varchar(20),
    test_result varchar(20),
    part_of varchar(20),
    CONSTRAINT Test_PK PRIMARY KEY (test_id),
    CONSTRAINT Test_FK FOREIGN KEY (report_id) REFERENCES Report(report_id)
);

CREATE TABLE dbo.Room
(
    room_number int IDENTITY(1,1) NOT NULL,
    appointment_id int NOT NULL,
    floor_number int,
    CONSTRAINT Room_PK PRIMARY KEY (room_number),
    CONSTRAINT Room_FK FOREIGN KEY (appointment_id) REFERENCES Appointment(appointment_id)
);
