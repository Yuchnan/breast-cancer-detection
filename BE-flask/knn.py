import mysql.connector
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sqlalchemy import create_engine
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score


db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'react_bc'
}

engine = create_engine('mysql+mysqlconnector://root:@localhost/react_bc')

conn = mysql.connector.connect(**db_config)
query = f"SELECT * FROM breast_cancer"
df = pd.read_sql(query, conn)

# Feature Selection
features = ['radius_mean', 'texture_mean', 'perimeter_mean', 'area_mean', 'smoothness_mean', 'compactness_mean', 'concavity_mean', 'concave_points_mean', 'symmetry_mean', 'fractal_dimension_mean', 'radius_se', 'texture_se', 'perimeter_se', 'area_se', 'smoothness_se', 'compactness_se', 'concavity_se', 'concave_points_se', 'symmetry_se', 'fractal_dimension_se', 'radius_worst', 'texture_worst', 'perimeter_worst', 'area_worst', 'smoothness_worst', 'compactness_worst', 'concave_points_worst', 'symmetry_worst', 'fractal_dimension_worst']

x = df[features]
y = df['diagnosis']

# Data Split
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.3, random_state=18)

scaler = StandardScaler()
scaler.fit(x_train)
x_train = scaler.transform(x_train)
x_test = scaler.transform(x_test)

classifier = KNeighborsClassifier(n_neighbors=5)
classifier.fit(x_train, y_train)

y_pred = classifier.predict(x_test)
labels = ["M", "B"]

# print(classification_report(y_test, y_pred))
conf_matrix = confusion_matrix(y_test, y_pred)
conf_matrix_df_knn = pd.DataFrame(conf_matrix, index=labels, columns=labels)
# print(conf_matrix_df_knn)

sns.heatmap(conf_matrix, annot=True, fmt='d', cmap='Blues')
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.title('KNN')
# plt.show()

accuracy = accuracy_score(y_test, y_pred)
# print(f"KNN Accuracy: {accuracy * 100:.2f}%")

results_df_knn = pd.DataFrame(x_test, columns=features)
results_df_knn['actual_label'] = y_test.values
results_df_knn['predicted_label'] = y_pred
results_df_knn['id'] = range(1, len(results_df_knn) + 1)
results_df_knn.insert(0, 'id', results_df_knn.pop('id'))

# Saving results to database and CSV file
results_df_knn.to_sql(name='knn', con=engine, if_exists='replace', index=False)

# Getting the report as a dictionary
reportKNN = classification_report(y_test, y_pred, output_dict=True)

# Getting values for class 'M'
precision_M = reportKNN['M']['precision']
recall_M = reportKNN['M']['recall']
f1_M = reportKNN['M']['f1-score']

# Getting values for class 'B'
precision_B = reportKNN['B']['precision']
recall_B = reportKNN['B']['recall']
f1_B = reportKNN['B']['f1-score']