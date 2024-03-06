# Green Screen Subtitles on Electron
This hosts an electron app on your pc with a green screen and subtitles that be updated via an endpoint.

# My use case:
![ezgif-7-0bbbd241f6](https://github.com/SuppliedOrange/greenscreen-subtitles/assets/70258998/8a7b4ea1-17e9-41c5-95b6-03fb645961a1)
![brave_Eqqv8rFU6A](https://github.com/SuppliedOrange/greenscreen-subtitles/assets/70258998/e6e269d8-d70e-4251-a610-bad017add9f2)
![image](https://github.com/SuppliedOrange/greenscreen-subtitles/assets/70258998/12f29517-7e28-4574-9264-24e2185fb4e8)


Backup Links of media resources: (https://i.imgur.com/l0cxH8c.gif, https://i.imgur.com/EJItnQZ.png, https://i.imgur.com/rBfbTGR.gif)

I use this on OBS for streaming with a chroma key. My speech is converted to text and is sent to this app.

# How to build:
Download the repo, run `npm install` in the directory.
Run `npm install -g` and install electron globally.
Run `electron .` in the directory, and you're done.

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
try: res = requests.post( url, json={ 'text': text } )

except ConnectionError:
    return {"success": False, "error": "Subtitle server is not alive" }
except Exception as e:
    return {"success": False, "error": "Subtitle server hit an error!\n" + str(e)}

try:
  if res["success"]: print("Finish!")
  else: print(res["error"])
except KeyError: print("Subtitle server returned malformed, internal error maybe?")
```

# OBS
Choose window capture and capture the electron app (should show up as `[electron.exe]: Electron`)
Go to filters and enable chroma key and crop/pad the top by 24.
It should work as intended.
![image](https://github.com/SuppliedOrange/greenscreen-subtitles/assets/70258998/cfbb6717-8ce9-4aaf-8cd4-14fdd02923a1)

## Notes:
I made this for myself, for my specific use case- which means you may encounter problems. Make an [issue](https://github.com/SuppliedOrange/greenscreen-subtitles/issues/new) if you run into problems along with your device info<br>
I have also found that you can simply use text files on OBS instead of this elaborate method.
