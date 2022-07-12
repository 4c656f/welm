from tkinter.filedialog import Open
import time
import yfinance as yf
import multiprocessing
import pandas as pd
import statistics
import numpy as np
import math

def calculate_pre(a, b):
    c = ((b-a)/a*100)
    return round(c,2)

# def get_current_price(symbol):
#     arr_response = []
#     for i in symbol:
#         ticker = yf.Ticker(i.upper())
#         try:
#             todays_data = ticker.history(period='1d' , interval='1h', group_by = 'ticker')
#             Last_close = ticker.history(period='2d' , interval='1h', group_by = 'ticker')
#             data_len = len(todays_data["Open"])
#             arr_response.append({"Tick": i.upper(), "Per_day": calculate_pre(Last_close['Close'][data_len -2],todays_data['Close'][-1])})
#
#
#         except:
#             pass
#
#     return arr_response





def get_current_price(symbol):
    def request_thread(L, ticker):
        try:
            #data = yf.download(i, period="1d", interval='1d')
            data2 = yf.download(i, period="2d", interval='1d')
            c = ((data2['Close'][-1] - data2['Close'][0]) / data2['Close'][0] * 100)
            L.update({i: round(c, 2)})
            return
        except Exception as e:
            print(e)




    with multiprocessing.Manager() as manager:
        L = manager.dict()
        threads = []


        for i in symbol:


            t = multiprocessing.Process(target=request_thread, args=(L, i))
            t.start()
            threads.append(t)


        for t in threads:
            t.join()

        L = dict(L)
    print(L)
    return(L)








def get_one_year(symbol):
    def request_thread(L, ticker):
        try:
            data = yf.download(i, period="1y", interval='1wk')

            date = data['Close'].index.strftime('%Y-%m-%d').tolist()
            pricee= data['Close']

            nan_array = np.isnan(pricee)
            not_nan_array = ~ nan_array
            array2 = pricee[not_nan_array].tolist()




            data_return = []
            for j in range(len(array2)):
                data_return.append({"date": date[j], "price": round(array2[j], 2)})

            # c = ((data['Close'][-1] - data2['Close'][0]) / data2['Close'][0] * 100)

            L.update({ticker: data_return})
            return
        except Exception as e:
            print(e)




    with multiprocessing.Manager() as manager:
        L = manager.dict()
        threads = []


        for i in symbol:


            t = multiprocessing.Process(target=request_thread, args=(L, i))
            t.start()
            threads.append(t)


        for t in threads:
            t.join()

        L = dict(L)


    return(L)





