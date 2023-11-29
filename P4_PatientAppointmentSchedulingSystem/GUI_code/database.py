import pyodbc 

def connect_to_db():
    server = 'localhost'  # Adjust as needed, e.g., 'localhost\SQLEXPRESS'
    database = 'Hospital'
    username = 'sa'
    password = 'Talwar@0398'  # Ensure your password is kept secure
    cnxn_str = 'DRIVER={ODBC Driver 17 for SQL Server};SERVER=' + server + ';DATABASE=' + database + ';UID=' + username + ';PWD=' + password
    try:
        cnxn = pyodbc.connect(cnxn_str)
        print("Connection successful")
        return cnxn
    except pyodbc.Error as e:
        print("Error in connection: ", e)
        return None

# Test the connection
cnxn = connect_to_db()

if cnxn:
    # You can perform further operations here using the connection
    # Don't forget to close the connection when done
    cnxn.close()
