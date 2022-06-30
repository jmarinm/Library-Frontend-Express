import sqlalchemy as db
from decouple import config
import pandas as pd
import time
import sys
import os
def queryAllBooks():
    URI = "mysql+pymysql://{}:{}@{}/{}".format(config('DB_USER'),config('DB_PASSWORD'),config('DB_HOST'),config('DB_NAME'))
    engine = db.create_engine(URI,connect_args={'connect_timeout': 10})
    connection = engine.connect()
    metadata = db.MetaData()
    books = db.Table('books', metadata, autoload=True, autoload_with=engine)

    query = db.select([books.columns.id, books.columns.Title, books.columns.Description])
    ResultProxy = connection.execute(query)
    ResultSet = ResultProxy.fetchall()
    
    df = pd.DataFrame(ResultSet)
    df.columns = ["id","Title", "Description"]

    return df

def queryBooksByWord(word):
    URI = "mysql+pymysql://{}:{}@{}/{}".format(config('DB_USER'),config('DB_PASSWORD'),config('DB_HOST'),config('DB_NAME'))
    engine = db.create_engine(URI,connect_args={'connect_timeout': 10})
    connection = engine.connect()
    metadata = db.MetaData()
    books = db.Table('books', metadata, autoload=True, autoload_with=engine)

    query = db.select([books.columns.id, books.columns.Title, books.columns.Description]).filter(books.columns.Title.contains(word))
    ResultProxy = connection.execute(query)
    ResultSet = ResultProxy.fetchall()
    
    df = pd.DataFrame(ResultSet)
    df.columns = ["id","Title", "Description"]

    return df

def dfToExcel(dataFrame,mode):
    
    reportType = "" if mode == 1 else "word"
    reports_dir = os.path.dirname(os.path.realpath(__file__))+"/../reports/"+reportType+"report"+str(time.time())+".xlsx"
    dataFrame.to_excel(reports_dir)
    print(reports_dir)

def main():

    mode = len(sys.argv)

    if mode == 1:
        result = queryAllBooks()
    elif mode ==2:
        result = queryBooksByWord(sys.argv[1])
    dfToExcel(result,mode)

if __name__ == "__main__":
    main()