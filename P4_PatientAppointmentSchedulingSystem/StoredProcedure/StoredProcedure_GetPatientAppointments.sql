USE Hospital
GO

CREATE PROCEDURE GenerateReportWithPrescriptionAndTest 
    @report_description VARCHAR(50),
    @report_date VARCHAR(20),
    @medication_name VARCHAR(20),
    @dosage INT,
    @start_date VARCHAR(20),
    @end_date VARCHAR(20),
    @test_name VARCHAR(20),
    @test_date VARCHAR(20),
    @test_result VARCHAR(20),
    @part_of VARCHAR(20),
    @new_report_id INT OUTPUT,
    @new_prescription_id INT OUTPUT,
    @new_test_id INT OUTPUT
AS
BEGIN
    -- Insert data into dbo.Report
    INSERT INTO dbo.Report (report_description, report_date)
    VALUES (@report_description, @report_date);

    -- Get the newly inserted report_id
    SET @new_report_id = SCOPE_IDENTITY();

    -- Insert data into dbo.Prescription
    INSERT INTO dbo.Prescription (report_id, medication_name, dosage, start_date, end_date)
    VALUES (@new_report_id, @medication_name, @dosage, @start_date, @end_date);

    -- Get the newly inserted prescription_id
    SET @new_prescription_id = SCOPE_IDENTITY();

    -- Insert data into dbo.Test
    INSERT INTO dbo.Test (report_id, test_name, test_date, test_result, part_of)
    VALUES (@new_report_id, @test_name, @test_date, @test_result, @part_of);

    -- Get the newly inserted test_id
    SET @new_test_id = SCOPE_IDENTITY();
END;


-- Execute

DECLARE @new_report_id INT;
DECLARE @new_prescription_id INT;
DECLARE @new_test_id INT;

EXEC GenerateReportWithPrescriptionAndTest
    @report_description = 'Medical Report',
    @report_date = '2023-01-15',
    @medication_name = 'Aspirin',
    @dosage = 100,
    @start_date = '2023-01-15',
    @end_date = '2023-01-30',
    @test_name = 'Blood Test',
    @test_date = '2023-01-20',
    @test_result = 'Normal',
    @part_of = 'Blood',
    @new_report_id = @new_report_id OUTPUT,
    @new_prescription_id = @new_prescription_id OUTPUT,
    @new_test_id = @new_test_id OUTPUT;

-- Check the output parameters
PRINT 'New Report ID: ' + ISNULL(CONVERT(VARCHAR, @new_report_id), 'NULL');
PRINT 'New Prescription ID: ' + ISNULL(CONVERT(VARCHAR, @new_prescription_id), 'NULL');
PRINT 'New Test ID: ' + ISNULL(CONVERT(VARCHAR, @new_test_id), 'NULL');
