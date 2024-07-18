# Branches
### <i> [Electron Branch](https://github.com/SuppliedOrange/greenscreen-subtitles/tree/main): Launches an electron app (for window captures) </i>

### <i> [Website with websockets branch](https://github.com/SuppliedOrange/greenscreen-subtitles/tree/main): Initializes as a website with websockets (for browser sources) </i>
^ You are here

# Green Screen Subtitles on a Website with Websockets
This serves a website with a green screen and subtitles/any text that be updated via an endpoint.

# My use case:
![ezgif-7-0bbbd241f6](https://github.com/SuppliedOrange/greenscreen-subtitles/assets/70258998/8a7b4ea1-17e9-41c5-95b6-03fb645961a1)
![NVIDIA_Share_gji0puXL50](https://github.com/SuppliedOrange/greenscreen-subtitles/assets/70258998/7b8f415f-6359-42e1-90de-5568d498821e)
![ZYn3K6X](https://github.com/user-attachments/assets/1e464fb7-7ae2-40bd-bfb7-a35627f071ae)

Backup Links of media resources: [1](https://i.imgur.com/l0cxH8c.gif) [2](https://i.imgur.com/3twdxFe.gif) [3](https://i.imgur.com/ZYn3K6X.png)

I use this on OBS for streaming with a chroma key. My speech is converted to text and is sent to this app.

# How to build:
+ Download the repo, run `npm install` in the directory. <br>
+ Run `node index.js` or `npm start` in the directory to start the server.

# How to use: 
Send a request to `http://127.0.0.1:4999/update_subtitles` with a post request in the form of
```json
JSON
{ "text": "Your text here" }
```

# Example usage
This is how I do it in python:
```py
import requests
url = 'http://127.0.0.1:4999/update_subtitles'
try: 
    res = requests.post( url, json={ 'text': text } )
    res = res.json()

    try:
        if res["success"]: print("Finish!")
        else: print(res["error"])

    except Exception as e: print("Error while reading data recieved from server\n" + str(e))

except requests.ConnectionError: print( "Could not connect to subtitle server. Is the server running?" )
except Exception as e: print("Could not establish connection with subtitle server\n" + str(e))
```
Use `setter.py` included with the repo to have a cli-based interface specifically for this.
+ `setter.py -t "new text"` updates the text with your args
+ `setter.py -u` runs in interactive mode

# OBS
+ Choose Browser Source and set `http://localhost:4999` as the URL. Adjust size to whatever suits you, I prefer *w/h 1279x206*
+ Go to filters and enable chroma key.
+ Start the server and it should show you the subtitles.

<br>

![image](https://github.com/user-attachments/assets/1703081e-55ad-4d2a-9fcf-398d66fdf40e)
Backup link: [1](https://i.imgur.com/95TJzro.png)

## Notes:
I made this for myself, for my specific use case- which means you may encounter problems. Make an [issue](https://github.com/SuppliedOrange/greenscreen-subtitles/issues/new) if you run into problems along with your device info<br>
You may also simply use text files instead of this method unless you want the freedom to use effects on your texts
