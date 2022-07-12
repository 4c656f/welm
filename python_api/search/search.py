import csv
import socket
import urllib.parse
import json
import urllib






def search(data):
    new_list = []


    with open('./listing_status_new.csv', newline='') as f:
        reader = csv.reader(f)
        list_csv = list(reader)


    for i in list_csv:

        new_list.append({"tick":i[0],
                        "name": i[1],
                        "exchange": i[2]
                         })


    new_list = new_list[1:]

    data_new = list(filter(lambda x: data.upper() in x["tick"].upper() or data.upper() in x["name"].upper(), new_list))

    return json.dumps(data_new[:30])

# Define socket host and port
SERVER_HOST = '0.0.0.0'
SERVER_PORT = 8000

# Create socket
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
server_socket.bind((SERVER_HOST, SERVER_PORT))
server_socket.listen(10)
print('Listening on port %s ...' % SERVER_PORT)

while True:
    # Wait for client connections

    client_connection, client_address = server_socket.accept()

    # Get the client request
    request = urllib.parse.unquote(client_connection.recv(4096).decode())
    try:
        request_line, headers_alone = request.split('\r\n', 1)
    except Exception as e:
        print(e)
    try:

        type_of_data = request_line[6:-9]
        data_from_url = urllib.parse.parse_qs(type_of_data)
        print(data_from_url)

        if (data_from_url.get("type")[0] == "search"):
            try:
                client_connection.send('HTTP/1.0 200 OK\r\n'.encode())
                client_connection.send("Access-Control-Allow-Origin: *\r\n".encode())
                client_connection.send("Content-Type: application/json\r\n\r\n".encode())

                client_connection.sendall(str(search(data_from_url.get("search")[0])).encode())
                client_connection.close()
            except Exception as e:
                print(e)
                client_connection.close()
        else:
            client_connection.close()


    except Exception as e:
        print(e)
        client_connection.close()





server_socket.close()