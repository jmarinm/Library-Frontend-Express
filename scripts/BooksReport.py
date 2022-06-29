import sqlalchemy as db
from decouple import config
import pandas as pd
import os
def queryAllBooks():
    URI = "mysql+pymysql://{}:{}@{}/{}".format(config('DB_USER'),config('DB_PASSWORD'),config('DB_HOST'),config('DB_NAME'))
    print(URI)
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

def dfToExcel(dataFrame: pd.DataFrame):
    reports_dir = os.path.dirname(os.path.realpath(__file__))+"/../reports"
    dataFrame.to_excel(reports_dir+"/report.xlsx")
    
def main():
    result = queryAllBooks()
    dfToExcel(result)

if __name__ == "__main__":
    main()