USE Hospital
GO

CREATE PROCEDURE CreateAppointment
    @patient_id INT,
    @doctor_id INT,
    @appointment_date VARCHAR(20),
    @appointment_status VARCHAR(10),
    @appointment_reason VARCHAR(50),
    @appointment_comments VARCHAR(50),
    @new_appointment_id INT OUTPUT,
    @error_message VARCHAR(255) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the doctor is on vacation on the specified appointment date
    IF NOT EXISTS (
        SELECT 1
        FROM dbo.Holiday
        WHERE doctor_id = @doctor_id AND holiday_date = @appointment_date
    )
    BEGIN
        -- Doctor is not on vacation, proceed with the appointment creation
        INSERT INTO dbo.Appointment (patient_id, doctor_id, appointment_date, appointment_status, appointment_reason, appointment_comments)
        VALUES (@patient_id, @doctor_id, @appointment_date, @appointment_status, @appointment_reason, @appointment_comments);

        SET @new_appointment_id = SCOPE_IDENTITY();
        SET @error_message = NULL; -- No error
    END
    ELSE
    BEGIN
        -- Doctor is on vacation, set an error message
        SET @new_appointment_id = NULL;
        SET @error_message = 'Doctor is on vacation on the specified appointment date.';
    END
END;



-- Execute

DECLARE @new_appointment_id INT;
DECLARE @error_message VARCHAR(255);

EXEC CreateAppointment
    @patient_id = 1,
    @doctor_id = 101,
    @appointment_date = '2023-01-01',
    @appointment_status = 'Scheduled',
    @appointment_reason = 'Regular check-up',
    @appointment_comments = 'No specific comments',
    @new_appointment_id = @new_appointment_id OUTPUT,
    @error_message = @error_message OUTPUT;

-- Check the output parameters
PRINT 'New Appointment ID: ' + ISNULL(CONVERT(VARCHAR, @new_appointment_id), 'NULL');
PRINT 'Error Message: ' + ISNULL(@error_message, 'NULL');
