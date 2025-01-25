from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import pandas as pd
from subprocess import call

app = Flask(__name__)
CORS(app)

# MySQL connetion config
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'react_bc'
}

@app.route('/data', methods=['GET'])
def get_data_breast_cancer():
    try:
        # Opens MySQL connection
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        # Execute query
        query = "SELECT * FROM breast_cancer"
        cursor.execute(query)
        rows = cursor.fetchall()

        # Closing query
        cursor.close()
        conn.close()

        return jsonify(rows)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/data', methods=['DELETE'])
def truncate_data_breast_cancer():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Execute query to TRUNCATE all datas
        query = "TRUNCATE TABLE breast_cancer"
        cursor.execute(query)

        conn.commit()  # Save changes
        cursor.close()
        conn.close()

        return jsonify({"message": "Data successfully truncated"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/upload', methods=['POST'])
def upload_csv():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    if file and file.filename.endswith('.csv'):
        try:
            # Reads file using pandas
            data = pd.read_csv(file)

            conn = mysql.connector.connect(**db_config)
            cursor = conn.cursor()

            # Create query to insert data 
            for index, row in data.iterrows():
                query = """
                INSERT INTO breast_cancer (id, diagnosis, radius_mean, texture_mean, perimeter_mean, area_mean, smoothness_mean, compactness_mean, concavity_mean, concave_points_mean, symmetry_mean, fractal_dimension_mean, radius_se, texture_se, perimeter_se, area_se, smoothness_se, compactness_se, concavity_se, concave_points_se, symmetry_se, fractal_dimension_se, radius_worst, texture_worst, perimeter_worst, area_worst, smoothness_worst, compactness_worst, concave_points_worst, symmetry_worst, fractal_dimension_worst)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """
                cursor.execute(query, tuple(row[:31]))  # Make sure to only have 31 columns

            conn.commit()
            cursor.close()
            conn.close()

            # Adds reload page if succeed
            return jsonify({"message": "File successfully uploaded and data imported to MySQL"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return jsonify({"error": "Invalid file format. Please upload a CSV file."}), 400

@app.route('/knn', methods=['GET'])
def get_data_knn():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        query = "SELECT * FROM knn"
        cursor.execute(query)
        rows = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(rows)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/knn', methods=['DELETE'])
def truncate_data_knn():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        query = "TRUNCATE TABLE knn"
        cursor.execute(query)

        conn.commit() 
        cursor.close()
        conn.close()

        return jsonify({"message": "Data successfully truncated"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/knn/run')
def knn():
    call(["python", "knn.py"])

@app.route('/gaussian_nb', methods=['GET'])
def get_data_gaussian():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        query = "SELECT * FROM gaussian_nb"
        cursor.execute(query)
        rows = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(rows)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/gaussian_nb', methods=['DELETE'])
def truncate_data_gaussian():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        query = "TRUNCATE TABLE gaussian_nb"
        cursor.execute(query)

        conn.commit() 
        cursor.close()
        conn.close()

        return jsonify({"message": "Data successfully truncated"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/gaussian_nb/run')
def gaussian_nb():
    call(["python", "gaussian.py"])

@app.route('/truncate_all', methods=['DELETE'])
def truncate_all_data():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Daftar tabel yang ingin di-truncate
        tables = ['breast_cancer', 'knn', 'gaussian_nb']
        for table in tables:
            query = f"TRUNCATE TABLE {table}"
            cursor.execute(query)

        conn.commit() 
        cursor.close()
        conn.close()

        return jsonify({"message": "All data successfully truncated"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Endpoint untuk confusion matrix
@app.route('/confusion-matrix', methods=['GET'])
def get_confusion_matrix():
    # Cek apakah dataset knn dan gaussian_nb tidak kosong sebelum import
    if not is_empty('knn') and not is_empty('gaussian_nb'):
        from knn import conf_matrix_df_knn, reportKNN, results_df_knn
        from gaussian import conf_matrix_df_gnb, reportGNB, results_df_gnb
        return jsonify({
            "knn": conf_matrix_df_knn.to_dict(),
            "gnb": conf_matrix_df_gnb.to_dict()
        })
    return jsonify({"error": "Dataset kosong, tidak dapat melakukan import."}), 400

@app.route('/classification-report', methods=['GET'])
def get_classification_report():
    # Cek apakah dataset knn dan gaussian_nb tidak kosong sebelum import
    if not is_empty('knn') and not is_empty('gaussian_nb'):
        from knn import reportKNN
        from gaussian import reportGNB
        return jsonify({
            "knn": reportKNN,
            "gnb": reportGNB
        })
    return jsonify({"error": "Dataset kosong, tidak dapat melakukan import."}), 400

@app.route('/predicted-results', methods=['GET'])
def get_predicted_results():
    # Cek apakah dataset knn dan gaussian_nb tidak kosong sebelum import
    if not is_empty('knn') and not is_empty('gaussian_nb'):
        from knn import results_df_knn
        from gaussian import results_df_gnb
        return jsonify({
            "knn": results_df_knn.to_dict(orient='records'),
            "gnb": results_df_gnb.to_dict(orient='records')
        })
    return jsonify({"error": "Dataset kosong, tidak dapat melakukan import."}), 400

def is_empty(table_name):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute(f"SELECT COUNT(*) FROM {table_name}")
    count = cursor.fetchone()[0]
    cursor.close()
    conn.close()
    return count == 0

if __name__ == '__main__':
    app.run(debug=True)