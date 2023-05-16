

import csv
import pandas as pd

df = pd.read_csv('/Users/dhruvsridhar/Developer/bookProject/stunning-octo-succotash/books.csv')

# with open('/Users/dhruvsridhar/Developer/bookProject/stunning-octo-succotash/books.csv', 'r') as f:
#     reader = csv.reader(f)
#     lines = list(reader)

# df = pd.DataFrame(lines)
# # print(df.head())
# df = df.drop(columns=['1'])