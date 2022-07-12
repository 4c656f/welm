
import socket
import urllib.parse
import json
import urllib
import yahoo as ya






# Define socket host and port
SERVER_HOST = '0.0.0.0'
SERVER_PORT = 80

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

    request_line, headers_alone = request.split('\r\n', 1)
    try:
        type_of_data = request_line[6:-9]
        data_from_url = urllib.parse.parse_qs(type_of_data)
        print(data_from_url)

        if (data_from_url.get("type")[0] == "year"):
            try:
                client_connection.send('HTTP/1.0 200 OK\r\n'.encode())
                client_connection.send("Access-Control-Allow-Origin: *\r\n".encode())
                client_connection.send("Content-Type: application/json\r\n\r\n".encode())

                client_connection.sendall(str(json.dumps(ya.get_one_year(data_from_url.get("ticks")))).encode())
                client_connection.close()
            except Exception as e:
                print(e)
                client_connection.close()
        elif(data_from_url.get("type")[0] == "get"):

            try:
                client_connection.send('HTTP/1.0 200 OK\r\n'.encode())
                client_connection.send("Access-Control-Allow-Origin: *\r\n".encode())
                client_connection.send("Content-Type: application/json\r\n\r\n".encode())

                client_connection.sendall(str(json.dumps(ya.get_current_price(data_from_url.get("ticks")))).encode())
                client_connection.close()
            except Exception as e:
                print(e)
                client_connection.close()
        else:
            client_connection.close()


    except Exception as e:
        print(e)
        client_connection.close()




    # req_data = urllib.parse.parse_qs(request_line[6:len(request_line)-9])


    # Send HTTP response



# Close socket
server_socket.close()