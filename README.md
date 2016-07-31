# find my iPhone for ifttt (or any other https rest call)

to run do:
```
docker run --restart=always -d \
  -e SECRET_TOKEN=something_top_secret_only_you_know
  -e SUBDOMAIN=something_unique
  -e ICLOUDUSER=your_full_icloud_email_address
  -e ICLOUDPASS=your_icloud_password
  chrisns/ifttt-findmyiphone
```

you'll then need to setup a maker action in ifttt to look like:
URL: `https://something_unique.localtunnel.me`
Method: `POST`
Content Type: `application/json`
Body: `{"token":1234, "device": "name of your device"}`
