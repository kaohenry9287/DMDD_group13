USE Hospital_system
GO

-- Insert data into Patient
INSERT INTO dbo.Patient (patient_fname, patient_lname, patient_birth, patient_gender, patient_phone, emergency_Contact_Name, emergency_Contact_Num)
VALUES
    ('John', 'Doe', '1990-01-01', 'Male', '123-456-7890', 'Jane Doe', '987-654-3210'),
    ('Jane', 'Smith', '1985-05-15', 'Female', '987-654-3210', 'John Smith', '123-456-7890'),
    ('Alice', 'Johnson', '1988-05-10', 'Female', '555-123-4567', 'Bob Johnson', '555-987-6543'),
    ('Michael', 'Smith', '1975-09-22', 'Male', '777-555-1234', 'Jennifer Smith', '777-555-4321'),
    ('Emily', 'Brown', '1995-03-18', 'Female', '999-333-2222', 'Chris Brown', '999-333-1111'),
    ('Daniel', 'Miller', '1980-11-30', 'Male', '444-666-8888', 'Emma Miller', '444-666-9999'),
    ('Olivia', 'White', '1992-07-12', 'Female', '222-888-3333', 'David White', '222-888-4444'),
    ('William', 'Taylor', '1983-12-05', 'Male', '666-222-4444', 'Sophia Taylor', '666-222-5555'),
    ('Sophia', 'Clark', '1998-04-25', 'Female', '111-999-7777', 'Henry Clark', '111-999-8888'),
    ('Ethan', 'Johnson', '1978-08-15', 'Male', '888-444-6666', 'Ava Johnson', '888-444-5555');
    
-- Insert data into dbo.Insurance
INSERT INTO dbo.Insurance (patient_id, policy_num, expiration_date, insurance_company_name)
VALUES
    (1, 'POL123456', '2024-01-01', 'ABC Insurance'),
    (2, 'POL789012', '2023-06-30', 'XYZ Insurance'),
    (3, 'POL345678', '2023-12-31', 'LMN Insurance'),
    (4, 'POL901234', '2023-08-15', 'PQR Insurance'),
    (5, 'POL567890', '2024-02-28', 'XYZ Insurance'),
    (6, 'POL123789', '2023-10-10', 'ABC Insurance'),
    (7, 'POL456789', '2023-11-30', 'DEF Insurance'),
    (8, 'POL987654', '2023-09-05', 'GHI Insurance'),
    (9, 'POL234567', '2024-03-15', 'JKL Insurance'),
    (10, 'POL890123', '2023-07-20', 'MNO Insurance');
    
-- Insert data into dbo.Hospital
INSERT INTO dbo.Hospital (hospital_name, hospital_location)
VALUES
    ('General Hospital', 'City A'),
    ('Community Hospital', 'City B'),
    ('City Medical Center', 'City A'),
    ('Regional Hospital', 'City D'),
    ('University Hospital', 'City A'),
    ('Children Hospital', 'City C'),
    ('Veterans Hospital', 'City C'),
    ('Mental Health Institute', 'City D'),
    ('Women Hospital', 'City A'),
    ('Cancer Center', 'City B');
    
-- Insert data into dbo.Department
INSERT INTO dbo.Department (hospital_id, department_name, department_description, department_location)
VALUES
    (1, 'Cardiology', 'Heart-related issues', 'Floor 3'),
    (1, 'Orthopedics', 'Bone-related issues', 'Floor 4'),
    (2, 'Pediatrics', 'Child health care', 'Floor 2'),
    (2, 'Dermatology', 'Skin-related issues', 'Floor 5'),
    (3, 'Oncology', 'Cancer treatment', 'Floor 6'),
    (4, 'Neurology', 'Nervous system disorders', 'Floor 3'),
    (5, 'Psychiatry', 'Mental health care', 'Floor 4'),
    (6, 'Obstetrics', 'Pregnancy and childbirth', 'Floor 2'),
    (7, 'Gynecology', 'Female reproductive system', 'Floor 3'),
    (8, 'Cardiovascular', 'Heart-related issues', 'Floor 4');

-- Insert data into dbo.Doctor
INSERT INTO dbo.Doctor (department_id, doctor_fname, doctor_lname, doctor_specialization, doctor_phone, doctor_license, doctor_holiday)
VALUES
    (1, 'Dr. Smith', 'Jones', 'Cardiologist', '555-1234', 'License123', '2023-12-25'),
    (2, 'Dr. Johnson', 'Davis', 'Orthopedic Surgeon', '555-5678', 'License456', '2023-11-01'),
    (3, 'Dr. Brown', 'Miller', 'Pediatrician', '555-3333', 'License789', '2023-12-10'),
    (4, 'Dr. Wilson', 'Moore', 'Dermatologist', '555-4444', 'License101', '2023-11-05'),
    (5, 'Dr. Roberts', 'Baker', 'Oncologist', '555-5555', 'License202', '2023-11-20'),
    (6, 'Dr. Hill', 'Ward', 'Neurologist', '555-6666', 'License303', '2023-12-05'),
    (7, 'Dr. Nelson', 'Fisher', 'Psychiatrist', '555-7777', 'License404', '2023-11-15'),
    (8, 'Dr. Murphy', 'Barnes', 'Obstetrician', '555-8888', 'License505', '2023-11-25'),
    (9, 'Dr. Turner', 'Evans', 'Gynecologist', '555-9999', 'License606', '2023-12-15'),
    (10, 'Dr. Ward', 'Harrison', 'Cardiologist', '555-1010', 'License707', '2023-11-30');

-- Insert data into dbo.Holiday
INSERT INTO dbo.Holiday (doctor_id, holiday_date)
VALUES
    (1, '2023-12-25'),
    (2, '2023-11-01'),
    (3, '2023-12-10'),
    (4, '2023-11-05'),
    (5, '2023-11-20'),
    (6, '2023-12-05'),
    (7, '2023-11-15'),
    (8, '2023-11-25'),
    (9, '2023-12-15'),
    (10, '2023-11-30');

-- Insert data into dbo.Appointment
INSERT INTO dbo.Appointment (patient_id, doctor_id, appointment_date, appointment_status, appointment_reason, appointment_comments)
VALUES
    (1, 1, '2023-02-15', 'Done', 'Routine checkup', 'No specific comments'),
    (2, 2, '2023-03-20', 'Done', 'Follow-up', 'Patient doing well'),
    (3, 3, '2023-03-10', 'Done', 'Pediatric checkup', 'No specific comments'),
    (4, 3, '2023-04-05', 'Done', 'Skin examination', 'Patient concerns about rashes'),
    (5, 4, '2024-01-20', 'Scheduled', 'Cancer follow-up', 'No specific comments'),
    (6, 6, '2024-06-05', 'Scheduled', 'Neurology consultation', 'Patient experiencing headaches'),
    (7, 2, '2024-07-15', 'Canceled', 'Psychiatry session', 'Patient seeking counseling'),
    (8, 5, '2024-08-25', 'Scheduled', 'Obstetrics appointment', 'Routine checkup for pregnancy'),
    (9, 9, '2024-09-15', 'Scheduled', 'Gynecology checkup', 'Routine examination'),
    (10, 10, '2024-10-30', 'Canceled', 'Cardiology consultation', 'Patient with heart concerns');

-- Insert data into dbo.Report
INSERT INTO dbo.Report (report_description, report_date)
VALUES
    ('Cardiology Report', '2023-02-20'),
    ('Orthopedics Report', '2023-03-25'),
    ('Pediatrics Report', '2023-03-15'),
    ('Dermatology Report', '2023-04-20'),
    ('Oncology Report', '2023-05-25'),
    ('Neurology Report', '2023-06-10'),
    ('Psychiatry Report', '2023-07-20'),
    ('Obstetrics Report', '2023-08-30'),
    ('Gynecology Report', '2023-09-20'),
    ('Cardiology Report', '2023-10-05');

-- Insert data into dbo.Prescription
INSERT INTO dbo.Prescription (report_id, medication_name, dosage, start_date, end_date)
VALUES
    (1, 'Aspirin', 50, '2023-02-20', '2023-03-20'),
    (2, 'Ibuprofen', 75, '2023-03-25', '2023-04-25'),
	(3, 'Paracetamol', 30, '2023-03-15', '2023-04-15'),
    (4, 'Antibiotic', 100, '2023-04-20', '2023-05-20'),
    (5, 'Chemotherapy', NULL, '2023-05-25', '2023-06-25'), -- Assuming Chemotherapy dosage varies
    (6, 'Migraine Medication', 25, '2023-06-10', '2023-07-10'),
    (7, 'Antidepressant', 50, '2023-07-20', '2023-08-20'),
    (8, 'Prenatal Vitamins', NULL, '2023-08-30', '2023-09-30'), -- Assuming Prenatal Vitamins dosage varies
    (9, 'Hormone Therapy', NULL, '2023-09-20', '2023-10-20'), -- Assuming Hormone Therapy dosage varies
    (10, 'Blood Control', 75, '2023-10-05', '2023-11-05');

-- Insert data into dbo.Billing
INSERT INTO dbo.Billing (appointment_id, billing_date, billing_amount, payment_status)
VALUES
    (1, '2023-02-20', 100, 'Paid'),
    (2, '2023-03-25', 150, 'Pending'),
    (3, '2023-03-15', 80, 'Paid'),
    (4, '2023-04-20', 120, 'Pending'),
    (5, '2023-05-25', 200, 'Paid'),
    (6, '2023-06-10', 50, 'Pending'),
    (7, '2023-07-20', 90, 'Paid'),
    (8, '2023-08-30', 150, 'Pending'),
    (9, '2023-09-20', 100, 'Paid'),
    (10, '2023-10-05', 120, 'Pending');


-- Insert data into dbo.Test
INSERT INTO dbo.Test (report_id, test_name, test_date, test_result, part_of)
VALUES
    (1, 'ECG', '2023-02-20', 'Normal', 'Cardiology Report'),
    (2, 'X-ray', '2023-03-25', 'Stable', 'Orthopedics Report'),
	(3, 'Blood Test', '2023-03-15', 'Normal', 'Pediatrics Report'),
    (4, 'Skin Biopsy', '2023-04-20', 'Negative', 'Dermatology Report'),
    (5, 'CT Scan', '2023-05-25', 'Stable', 'Oncology Report'),
    (6, 'MRI', '2023-06-10', 'Normal', 'Neurology Report'),
    (7, 'Psychological Test', '2023-07-20', 'Stable', 'Psychiatry Report'),
    (8, 'Ultrasound', '2023-08-30', 'Normal', 'Obstetrics Report'),
    (9, 'Pap Smear', '2023-09-20', 'Normal', 'Gynecology Report'),
    (10, 'Echocardiogram', '2023-10-05', 'Normal', 'Cardiology Report');
    
-- Insert data into dbo.Room
INSERT INTO dbo.Room (appointment_id, floor_number)
VALUES
    (1, 2),
    (2, 4),
    (3, 1),
    (4, 3),
    (5, 5),
    (6, 2),
    (7, 4),
    (8, 3),
    (9, 1),
    (10, 5);