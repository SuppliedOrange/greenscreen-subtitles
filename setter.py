import argparse
import requests

url = 'http://127.0.0.1:4999/update_subtitles'

parser = argparse.ArgumentParser(description='Set text on subtitle server')

parser.add_argument('-t', '--text', type=str,
                    help='the new text to send to subtitle server')
parser.add_argument('-u', '--ui', action='store_true',
                    help='activates loop to get data from user input and send it to subtitle server')

args = parser.parse_args()

def send_request( text ):

    try: 
        res = requests.post( url, json={ 'text': text } )
        res = res.json()

        try:
            if res["success"]: print("Finish!")
            else: print(res["error"])

        except KeyError: print("Subtitle server returned malformed, internal error maybe?")
        except TypeError as e: print("Subtitle server returned nothing, internal error maybe?")
        except Exception as e: print("Fatal Error:\n" + str(e))

    except requests.ConnectionError: print( "Could not connect to subtitle server. Is the server running?" )
    except Exception as e: print("Could not establish connection with subtitle server\n" + str(e))

if args.text: send_request(args.text)

elif args.ui:
    while True:
        text = input("> ")
        send_request(text)

else:
    print("No args were provided.\nUse the -h flag to see options")
