from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import pandas as pd
from subprocess import call
from knn import conf_matrix_df, report, results_df

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
    return jsonify(conf_matrix_df.to_dict())

# Endpoint untuk classification report
@app.route('/classification-report', methods=['GET'])
def get_classification_report():
    return jsonify(report)

# Endpoint untuk hasil prediksi
@app.route('/predicted-results', methods=['GET'])
def get_predicted_results():
    return results_df.to_dict(orient='records')

if __name__ == '__main__':
    app.run(debug=True)
