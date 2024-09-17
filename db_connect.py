import psycopg2
from psycopg2 import sql

# Database connection parameters
db_params = {
    'dbname': 'sharemarketDB',
    'user': 'postgres',
    'password': '123456',
    'host': 'localhost',
    'port': '5432'
}


def get_db_connection():
    try:
        # Establish a connection to the PostgreSQL database
        conn = psycopg2.connect(**db_params)
        print("Connection established successfully")
        return conn
    except Exception as e:
        print(f"Error: {e}")
        return None


def get_all_rows():
    try:
        # Establish a connection to the PostgreSQL database
        conn = psycopg2.connect(**db_params)
        cursor = conn.cursor()

        # SQL query to perform inner join
        query = """
        SELECT 
            tbl_company_detail.company_unique_name as symbol, 
            tbl_company_detail.company_name as cname, 
            tbl_company_detail.stock_exchange as exchange, 
            tbl_share_details.current_price as cprice, 
            tbl_share_details.volume as volume, 
            tbl_share_details.p_e as pe, 
            tbl_share_details.dividend as dividend, 
            TO_CHAR(tbl_share_details.check_date, 'DD/MM/YYYY') as cdate, 
            tbl_company_detail.id as cid,
            TO_CHAR(tbl_share_details.share_start_date, 'DD/MM/YYYY') as s_start_date
        FROM 
            tbl_company_detail
        INNER JOIN 
            tbl_share_details
        ON 
            tbl_company_detail.id = tbl_share_details.company_id
        ORDER BY tbl_share_details.share_start_date ASC;
        """

        # Execute the query
        cursor.execute(query)

        # Fetch all rows
        rows = cursor.fetchall()

        # Close the cursor and connection
        cursor.close()
        conn.close()

        return rows
    except Exception as e:
        print(f"Error: {e}")
        return None


def update_check_date(check_date, company_id):
    try:
        # Establish a connection to the PostgreSQL database
        with psycopg2.connect(**db_params) as conn:
            with conn.cursor() as cursor:
                # SQL query to update check_date
                query = sql.SQL("""
                    UPDATE tbl_share_details
                    SET check_date = %s
                    WHERE id = %s;
                """)

                # Execute the query
                cursor.execute(query, (check_date, company_id))

                # Commit the transaction
                conn.commit()

                # print(f"Updated check_date to {check_date} for company_id {company_id}")
    except Exception as e:
        print(f"Error: {e}")


def update_share_start_date(start_date, company_id):
    try:
        # Establish a connection to the PostgreSQL database
        with psycopg2.connect(**db_params) as conn:
            with conn.cursor() as cursor:
                # SQL query to update check_date
                query = sql.SQL("""
                    UPDATE tbl_share_details
                    SET share_start_date = %s
                    WHERE id = %s;
                """)

                # Execute the query
                cursor.execute(query, (start_date, company_id))

                # Commit the transaction
                conn.commit()

                # print(f"Updated check_date to {check_date} for company_id {company_id}")
    except Exception as e:
        print(f"Error: {e}")


def remove_check_date(company_id):
    try:
        # Establish a connection to the PostgreSQL database
        with psycopg2.connect(**db_params) as conn:
            with conn.cursor() as cursor:
                # SQL query to remove check_date
                query = sql.SQL("""
                    UPDATE tbl_share_details
                    SET check_date = NULL
                    WHERE id = %s;
                """)

                # Execute the query
                cursor.execute(query, (company_id,))

                # Commit the transaction
                conn.commit()

                # print(f"Removed check_date for company_id {company_id}")
    except Exception as e:
        print(f"Error: {e}")
