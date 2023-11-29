from flask import Flask, request, jsonify
import pyodbc
import os
from flask_cors import CORS
import random
import time


app = Flask(__name__)
app.debug = True
CORS(app)

# Database connection function
def get_db_connection():
    server = os.environ.get('SQL_SERVER')
    database = os.environ.get('SQL_DATABASE')
    username = os.environ.get('SQL_USER')
    password = os.environ.get('SQL_PASSWORD')
    cnxn_str = f'DRIVER={{ODBC Driver 18 for SQL Server}};SERVER={server};DATABASE={database};UID={username};PWD={password};TrustServerCertificate=Yes'
    return pyodbc.connect(cnxn_str)

##PATIENT CRUD
# Create a new patient
@app.route('/patients', methods=['POST'])
def create_patient():
    data = request.json
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
     # Generate a random patient_id
    patient_id = random.randint(0, 999)

    cursor.execute("""
    INSERT INTO Patient (patient_fname, patient_lname, patient_birth, patient_gender, patient_phone, emergency_Contact_Name, emergency_Contact_Num)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    """, data['patient_fname'], data['patient_lname'], data['patient_birth'], data['patient_gender'], data['patient_phone'], data['emergency_Contact_Name'], data['emergency_Contact_Num'])

    cnxn.commit()
    return jsonify({"success": True, "patient_id": patient_id}), 201
# Get all patients
@app.route('/patients', methods=['GET'])
def get_patients():
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("SELECT patient_id, patient_fname, patient_lname, patient_birth, patient_gender, patient_phone, emergency_Contact_Name, emergency_Contact_Num FROM Patient")
    patients = cursor.fetchall()
    patients_list = [dict(zip([column[0] for column in cursor.description], row)) for row in patients]
    cursor.close()
    cnxn.close()
    return jsonify(patients_list)
# Update a patient
@app.route('/patients/<int:patient_id>', methods=['PUT'])
def update_patient(patient_id):
    data = request.json
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("""
        UPDATE Patient
        SET patient_fname = ?, patient_lname = ?, patient_birth = ?, patient_gender = ?, patient_phone = ?, emergency_Contact_Name = ?, emergency_Contact_Num = ?
        WHERE patient_id = ?
    """, data['patient_fname'], data['patient_lname'], data['patient_birth'], data['patient_gender'], data['patient_phone'], data['emergency_Contact_Name'], data['emergency_Contact_Num'], patient_id)
    cnxn.commit()
    return jsonify({"success": True}), 200

# Delete a patient
@app.route('/patients/<int:patient_id>', methods=['DELETE'])
def delete_patient(patient_id):
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("DELETE FROM Patient WHERE patient_id = ?", patient_id)
    cnxn.commit()
    return jsonify({"success": True}), 200

## INSURANCE CRUD
@app.route('/insurance', methods=['POST'])
def create_insurance():
    data = request.json
    cnxn = get_db_connection()
    cursor = cnxn.cursor()

    cursor.execute("""
        INSERT INTO Insurance (patient_id, policy_num, expiration_date, insurance_company_name)
        VALUES (?, ?, ?, ?)
    """, data['patient_id'], data['policy_num'], data['expiration_date'], data['insurance_company_name'])

    cnxn.commit()
    return jsonify({"success": True}), 201

@app.route('/insurance', methods=['GET'])
def get_insurance():
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("SELECT * FROM Insurance")
    insurance_records = cursor.fetchall()
    insurance_list = [dict(zip([column[0] for column in cursor.description], record)) for record in insurance_records]
    cursor.close()
    cnxn.close()
    return jsonify(insurance_list)

@app.route('/insurance/<int:insurance_id>', methods=['PUT'])
def update_insurance(insurance_id):
    data = request.json
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("""
        UPDATE Insurance
        SET patient_id = ?, policy_num = ?, expiration_date = ?, insurance_company_name = ?
        WHERE insurance_id = ?
    """, data['patient_id'], data['policy_num'], data['expiration_date'], data['insurance_company_name'], insurance_id)
    cnxn.commit()
    return jsonify({"success": True}), 200

@app.route('/insurance/<int:insurance_id>', methods=['DELETE'])
def delete_insurance(insurance_id):
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("DELETE FROM Insurance WHERE insurance_id = ?", insurance_id)
    cnxn.commit()
    return jsonify({"success": True}), 200

##Hospital
@app.route('/hospital', methods=['POST'])
def create_hospital():
    data = request.json
    cnxn = get_db_connection()
    cursor = cnxn.cursor()

    cursor.execute("""
        INSERT INTO Hospital (hospital_name, hospital_location)
        VALUES (?, ?)
    """, data['hospital_name'], data['hospital_location'])

    cnxn.commit()
    return jsonify({"success": True}), 201

@app.route('/hospital', methods=['GET'])
def get_hospital():
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("SELECT * FROM Hospital")
    hospital_records = cursor.fetchall()
    hospital_list = [dict(zip([column[0] for column in cursor.description], record)) for record in hospital_records]
    cursor.close()
    cnxn.close()
    return jsonify(hospital_list)

@app.route('/hospital/<int:hospital_id>', methods=['PUT'])
def update_hospital(hospital_id):
    data = request.json
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("""
        UPDATE Hospital
        SET hospital_name = ?, hospital_location = ?
        WHERE hospital_id = ?
    """, data['hospital_name'], data['hospital_location'], hospital_id)
    cnxn.commit()
    return jsonify({"success": True}), 200

@app.route('/hospital/<int:hospital_id>', methods=['DELETE'])
def delete_hospital(hospital_id):
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("DELETE FROM Hospital WHERE hospital_id = ?", hospital_id)
    cnxn.commit()
    return jsonify({"success": True}), 200

##Department
@app.route('/department', methods=['POST'])
def create_department():
    data = request.json
    cnxn = get_db_connection()
    cursor = cnxn.cursor()

    cursor.execute("""
        INSERT INTO Department (hospital_id, department_name, department_description, department_location)
        VALUES (?, ?, ?, ?)
    """, data['hospital_id'], data['department_name'], data['department_description'], data['department_location'])

    cnxn.commit()
    return jsonify({"success": True}), 201

@app.route('/department', methods=['GET'])
def get_department():
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("SELECT * FROM Department")
    department_records = cursor.fetchall()
    department_list = [dict(zip([column[0] for column in cursor.description], record)) for record in department_records]
    cursor.close()
    cnxn.close()
    return jsonify(department_list)

@app.route('/department/<int:department_id>', methods=['PUT'])
def update_department(department_id):
    data = request.json
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("""
        UPDATE Department
        SET hospital_id = ?, department_name = ?, department_description = ?, department_location = ?
        WHERE department_id = ?
    """, data['hospital_id'], data['department_name'], data['department_description'], data['department_location'], department_id)
    cnxn.commit()
    return jsonify({"success": True}), 200

@app.route('/department/<int:department_id>', methods=['DELETE'])
def delete_department(department_id):
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("DELETE FROM Department WHERE department_id = ?", department_id)
    cnxn.commit()
    return jsonify({"success": True}), 200

## Doctor
@app.route('/doctor', methods=['POST'])
def create_doctor():
    data = request.json
    cnxn = get_db_connection()
    cursor = cnxn.cursor()

    cursor.execute("""
        INSERT INTO Doctor (department_id, doctor_fname, doctor_lname, doctor_specialization, doctor_phone, doctor_license, doctor_holiday)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, data['department_id'], data['doctor_fname'], data['doctor_lname'], data['doctor_specialization'], data['doctor_phone'], data['doctor_license'], data['doctor_holiday'])

    cnxn.commit()
    return jsonify({"success": True}), 201

@app.route('/doctor', methods=['GET'])
def get_doctor():
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("SELECT * FROM Doctor")
    doctor_records = cursor.fetchall()
    doctor_list = [dict(zip([column[0] for column in cursor.description], record)) for record in doctor_records]
    cursor.close()
    cnxn.close()
    return jsonify(doctor_list)

@app.route('/doctor/<int:doctor_id>', methods=['PUT'])
def update_doctor(doctor_id):
    data = request.json
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("""
        UPDATE Doctor
        SET department_id = ?, doctor_fname = ?, doctor_lname = ?, doctor_specialization = ?, doctor_phone = ?, doctor_license = ?, doctor_holiday = ?
        WHERE doctor_id = ?
    """, data['department_id'], data['doctor_fname'], data['doctor_lname'], data['doctor_specialization'], data['doctor_phone'], data['doctor_license'], data['doctor_holiday'], doctor_id)
    cnxn.commit()
    return jsonify({"success": True}), 200

@app.route('/doctor/<int:doctor_id>', methods=['DELETE'])
def delete_doctor(doctor_id):
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("DELETE FROM Doctor WHERE doctor_id = ?", doctor_id)
    cnxn.commit()
    return jsonify({"success": True}), 200

## Holiday
@app.route('/holiday', methods=['POST'])
def create_holiday():
    data = request.json
    cnxn = get_db_connection()
    cursor = cnxn.cursor()

    cursor.execute("""
        INSERT INTO Holiday (doctor_id, holiday_date)
        VALUES (?, ?)
    """, data['doctor_id'], data['holiday_date'])

    cnxn.commit()
    return jsonify({"success": True}), 201

@app.route('/holiday', methods=['GET'])
def get_holiday():
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("SELECT * FROM Holiday")
    holiday_records = cursor.fetchall()
    holiday_list = [dict(zip([column[0] for column in cursor.description], record)) for record in holiday_records]
    cursor.close()
    cnxn.close()
    return jsonify(holiday_list)

@app.route('/holiday/<int:doctor_id>/<string:original_date>', methods=['PUT'])
def update_holiday(doctor_id, original_date):
    data = request.json
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("""
        UPDATE Holiday
        SET holiday_date = ?
        WHERE doctor_id = ? AND holiday_date = ?
    """, data['holiday_date'], doctor_id, original_date)
    cnxn.commit()
    return jsonify({"success": True}), 200

@app.route('/holiday/<int:doctor_id>/<string:holiday_date>', methods=['DELETE'])
def delete_holiday(doctor_id, holiday_date):
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("DELETE FROM Holiday WHERE doctor_id = ? AND holiday_date = ?", doctor_id, holiday_date)
    cnxn.commit()
    return jsonify({"success": True}), 200

## Appointment
@app.route('/appointment', methods=['POST'])
def create_appointment():
    data = request.json
    cnxn = get_db_connection()
    cursor = cnxn.cursor()

    cursor.execute("""
        INSERT INTO Appointment (patient_id, doctor_id, appointment_date, appointment_status, appointment_reason, appointment_comments)
        VALUES (?, ?, ?, ?, ?, ?)
    """, data['patient_id'], data['doctor_id'], data['appointment_date'], data['appointment_status'], data['appointment_reason'], data['appointment_comments'])

    cnxn.commit()
    return jsonify({"success": True}), 201

@app.route('/appointment', methods=['GET'])
def get_appointment():
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("SELECT * FROM Appointment")
    appointment_records = cursor.fetchall()
    appointment_list = [dict(zip([column[0] for column in cursor.description], record)) for record in appointment_records]
    cursor.close()
    cnxn.close()
    return jsonify(appointment_list)

@app.route('/appointment/<int:appointment_id>', methods=['PUT'])
def update_appointment(appointment_id):
    data = request.json
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("""
        UPDATE Appointment
        SET patient_id = ?, doctor_id = ?, appointment_date = ?, appointment_status = ?, appointment_reason = ?, appointment_comments = ?
        WHERE appointment_id = ?
    """, data['patient_id'], data['doctor_id'], data['appointment_date'], data['appointment_status'], data['appointment_reason'], data['appointment_comments'], appointment_id)
    cnxn.commit()
    return jsonify({"success": True}), 200

@app.route('/appointment/<int:appointment_id>', methods=['DELETE'])
def delete_appointment(appointment_id):
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("DELETE FROM Appointment WHERE appointment_id = ?", appointment_id)
    cnxn.commit()
    return jsonify({"success": True}), 200

## Report
@app.route('/report', methods=['POST'])
def create_report():
    data = request.json
    cnxn = get_db_connection()
    cursor = cnxn.cursor()

    cursor.execute("""
        INSERT INTO Report (report_description, report_date)
        VALUES (?, ?)
    """, data['report_description'], data['report_date'])

    cnxn.commit()
    return jsonify({"success": True}), 201

@app.route('/report', methods=['GET'])
def get_report():
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("SELECT * FROM Report")
    report_records = cursor.fetchall()
    report_list = [dict(zip([column[0] for column in cursor.description], record)) for record in report_records]
    cursor.close()
    cnxn.close()
    return jsonify(report_list)

@app.route('/report/<int:report_id>', methods=['PUT'])
def update_report(report_id):
    data = request.json
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("""
        UPDATE Report
        SET report_description = ?, report_date = ?
        WHERE report_id = ?
    """, data['report_description'], data['report_date'], report_id)
    cnxn.commit()
    return jsonify({"success": True}), 200

@app.route('/report/<int:report_id>', methods=['DELETE'])
def delete_report(report_id):
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("DELETE FROM Report WHERE report_id = ?", report_id)
    cnxn.commit()
    return jsonify({"success": True}), 200

## Prescription
@app.route('/prescription', methods=['POST'])
def create_prescription():
    data = request.json
    cnxn = get_db_connection()
    cursor = cnxn.cursor()

    cursor.execute("""
        INSERT INTO Prescription (report_id, medication_name, dosage, start_date, end_date)
        VALUES (?, ?, ?, ?, ?)
    """, data['report_id'], data['medication_name'], data['dosage'], data['start_date'], data['end_date'])

    cnxn.commit()
    return jsonify({"success": True}), 201

@app.route('/prescription', methods=['GET'])
def get_prescription():
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("SELECT * FROM Prescription")
    prescription_records = cursor.fetchall()
    prescription_list = [dict(zip([column[0] for column in cursor.description], record)) for record in prescription_records]
    cursor.close()
    cnxn.close()
    return jsonify(prescription_list)


@app.route('/prescription/<int:prescription_id>', methods=['PUT'])
def update_prescription(prescription_id):
    data = request.json
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("""
        UPDATE Prescription
        SET report_id = ?, medication_name = ?, dosage = ?, start_date = ?, end_date = ?
        WHERE prescription_id = ?
    """, data['report_id'], data['medication_name'], data['dosage'], data['start_date'], data['end_date'], prescription_id)
    cnxn.commit()
    return jsonify({"success": True}), 200

@app.route('/prescription/<int:prescription_id>', methods=['DELETE'])
def delete_prescription(prescription_id):
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("DELETE FROM Prescription WHERE prescription_id = ?", prescription_id)
    cnxn.commit()
    return jsonify({"success": True}), 200

## Billing
@app.route('/billing', methods=['POST'])
def create_billing():
    data = request.json
    cnxn = get_db_connection()
    cursor = cnxn.cursor()

    cursor.execute("""
        INSERT INTO Billing (appointment_id, billing_date, billing_amount, payment_status)
        VALUES (?, ?, ?, ?)
    """, data['appointment_id'], data['billing_date'], data['billing_amount'], data['payment_status'])

    cnxn.commit()
    return jsonify({"success": True}), 201

@app.route('/billing', methods=['GET'])
def get_billing():
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("SELECT * FROM Billing")
    billing_records = cursor.fetchall()
    billing_list = [dict(zip([column[0] for column in cursor.description], record)) for record in billing_records]
    cursor.close()
    cnxn.close()
    return jsonify(billing_list)

@app.route('/billing/<int:billing_id>', methods=['PUT'])
def update_billing(billing_id):
    data = request.json
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("""
        UPDATE Billing
        SET appointment_id = ?, billing_date = ?, billing_amount = ?, payment_status = ?
        WHERE billing_id = ?
    """, data['appointment_id'], data['billing_date'], data['billing_amount'], data['payment_status'], billing_id)
    cnxn.commit()
    return jsonify({"success": True}), 200

@app.route('/billing/<int:billing_id>', methods=['DELETE'])
def delete_billing(billing_id):
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("DELETE FROM Billing WHERE billing_id = ?", billing_id)
    cnxn.commit()
    return jsonify({"success": True}), 200

## Test
@app.route('/test', methods=['POST'])
def create_test():
    data = request.json
    cnxn = get_db_connection()
    cursor = cnxn.cursor()

    cursor.execute("""
        INSERT INTO Test (report_id, test_name, test_date, test_result, part_of)
        VALUES (?, ?, ?, ?, ?)
    """, data['report_id'], data['test_name'], data['test_date'], data['test_result'], data['part_of'])

    cnxn.commit()
    return jsonify({"success": True}), 201

@app.route('/test', methods=['GET'])
def get_test():
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("SELECT * FROM Test")
    test_records = cursor.fetchall()
    test_list = [dict(zip([column[0] for column in cursor.description], record)) for record in test_records]
    cursor.close()
    cnxn.close()
    return jsonify(test_list)

@app.route('/test/<int:test_id>', methods=['PUT'])
def update_test(test_id):
    data = request.json
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("""
        UPDATE Test
        SET report_id = ?, test_name = ?, test_date = ?, test_result = ?, part_of = ?
        WHERE test_id = ?
    """, data['report_id'], data['test_name'], data['test_date'], data['test_result'], data['part_of'], test_id)
    cnxn.commit()
    return jsonify({"success": True}), 200

@app.route('/test/<int:test_id>', methods=['DELETE'])
def delete_test(test_id):
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("DELETE FROM Test WHERE test_id = ?", test_id)
    cnxn.commit()
    return jsonify({"success": True}), 200

##Room
@app.route('/room', methods=['POST'])
def create_room():
    data = request.json
    cnxn = get_db_connection()
    cursor = cnxn.cursor()

    cursor.execute("""
        INSERT INTO Room (appointment_id, floor_number)
        VALUES (?, ?)
    """, data['appointment_id'], data['floor_number'])

    cnxn.commit()
    return jsonify({"success": True}), 201

@app.route('/room', methods=['GET'])
def get_room():
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("SELECT * FROM Room")
    room_records = cursor.fetchall()
    room_list = [dict(zip([column[0] for column in cursor.description], record)) for record in room_records]
    cursor.close()
    cnxn.close()
    return jsonify(room_list)

@app.route('/room/<int:room_number>', methods=['PUT'])
def update_room(room_number):
    data = request.json
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("""
        UPDATE Room
        SET appointment_id = ?, floor_number = ?
        WHERE room_number = ?
    """, data['appointment_id'], data['floor_number'], room_number)
    cnxn.commit()
    return jsonify({"success": True}), 200

@app.route('/room/<int:room_number>', methods=['DELETE'])
def delete_room(room_number):
    cnxn = get_db_connection()
    cursor = cnxn.cursor()
    cursor.execute("DELETE FROM Room WHERE room_number = ?", room_number)
    cnxn.commit()
    return jsonify({"success": True}), 200


if __name__ == '__main__':
    app.run(debug=True)
