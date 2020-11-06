---
title: Build an ngrok alternative with Inlets and Caddy
date: "2020-11-02T22:12:03.284Z"
layout: post
draft: false
path: "/posts/build-an-ngrok-alternative-with-inlets-and-caddy/"
category: "Caddy"
tags:
  - "reverse-proxy"
  - "caddy"
  - "inlets"
  - "systemd"
  - "systemctl"

description: "In this tutorial, I will show you how to build a ngrok alternative using Inlets as an exit server and Caddy as a reverse proxy for HTTPS traffic. We will then map a subdomain we own to the Droplet's public IP address for ease of access."
---

If you've ever faced any limitations with ngrok, then it's pretty easy to roll a custom solution. ngrok works, but if you find yourself needing multiple https domains for local development, you will have to upgrade to a paid plan, and the cost could add up pretty quickly. For me, this didn't make financial sense since I had access to free cloud VMs.

In this tutorial, I will show you how to build a ngrok alternative using Inlets as an exit server and Caddy as a reverse proxy for HTTPS traffic. We will then map a subdomain we own to the Droplet's public IP address for ease of access.


## Setup the VM

<a href="https://www.digitalocean.com/products/linux-distribution/ubuntu/" target="_blank" rel="noopener">Click here to create an Ubuntu Droplet on digital ocean</a>, feel free to configure as required. 

You may set up your VM using any cloud provider of your choice, I choose to use DigitalOcean.

💡 <a href="https://cloud.google.com/free" target="_blank" rel="noopener">GCP offers a $300 credit</a> for first-time users

## Map a subdomain to your Ubuntu instance

In your DNS host, create an A record pointing to your Droplets public IP address.

```
subdomain: sub.example.com
Type: A
value: your.droplet.ip.address 
```

> Your DNS host must support the ACME protocol since Caddy uses Let's Encrypt for automatically provisioning SSL/TLS certificate.

If your DNS host does not support the ACME protocol, for example, GoDaddy, you can delegate your domain to a free DNS provider that does. <a href="https://docs.netlify.com/domains-https/netlify-dns/delegate-to-netlify/" target="_blank" rel="noopener">Netlify</a> offers free DNS management

## Setup Inlets and Caddy

SSH or password login into the Ubuntu Droplet we created. 

1. Install Inlets 

```
curl -sLS https://get.inlets.dev | sudo sh
```

2. Install Caddy 

```
echo "deb [trusted=yes] https://apt.fury.io/caddy/ /" \
    | sudo tee -a /etc/apt/sources.list.d/caddy-fury.list
sudo apt update
sudo apt install caddy
```

## Exposing your local web server

1. On your Droplet, start an inlet exit server

```
inlets server --port=80 --token=123
```

> The token 123 is used here to keep things simple, you should use something more secure

2. On your computer with the HTTP port you would like to expose, install inlets

```
curl -sLS https://get.inlets.dev | sudo sh
```

If you are on a mac, install with Homebrew 

```
brew install inlets
```

3. Start the web service you would like to expose, in my case, a rails app running on port 4000 

```
rails s -p 4000 
```

4. Expose the process to the the inlets exit server by starting an inlet client

```
inlets client --remote=subdomain.example.com \
--upstream=http://127.0.0.1:4000 \
--token=123
```

> Both the inlets client and server must have the same token

5. Go to http://subdomain.example.com, you should be able to access your local web service. Notice we currently don't have HTTPS

## Enabling HTTPS 

1. On your Droplet, stop the inlets exit server and make it listen on a different port other than 80.

```
inlets server --port=8080 --token=123
```

> Caddy needs port 80 to handle web traffic

2. Start Caddy as a reverse proxy, routing HTTPS traffic to your inlets exit server

```
caddy reverse-proxy \
--from subdomain.example.com \
--to localhost:8080
```

3. On your computer running the inlets client, stop the inlet client and start it up to allow for secure tunnelling using websocket

```
inlets client \
--remote=wss://subdomain.example.com \
--upstream=http://127.0.0.1:4000 \
--token=123
```

4. Go to https://subdomain.example.com, you should be able to access your local web traffic via HTTPS. 

> Caddy took care of obtaining an SSL certificate on our behalf and will renew it when it gets expired, basically it's certbot+nginx on steriod.

## Automate with systemd

1. Create this serivce unit file for inlets and place in `/etc/systemd/system/inlets.service`

```
[Unit]
Description=Inlets Exit Server
After=network.target network-online.target
Requires=network-online.target

[Service]
Type=simple
Restart=always
RestartSec=1
StartLimitInterval=0
ExecStart=/usr/local/bin/inlets server --port=8080 --token=123

[Install]
WantedBy=multi-user.target
```

2. And for Caddy, place in `/etc/systemd/system/caddy.service`

```
[Unit]
Description=Caddy Server
After=network.target network-online.target
Requires=network-online.target

[Service]
ExecStart=/usr/local/bin/caddy reverse-proxy --from subdomain.com --to localhost:8080
TimeoutStopSec=5s
LimitNOFILE=1048576
LimitNPROC=512
PrivateTmp=true
ProtectSystem=full
AmbientCapabilities=CAP_NET_BIND_SERVICE

[Install]
WantedBy=multi-user.target
```

3. Stop the Caddy and inlets process and use systemctl to start them as a service. 

```
systemctl daemon-reload

systemctl enable inlets
systemctl enable caddy 

systemctl start inlets
systemctl start caddy
```

4. Now you can start, stop, restart or check the status of both services on your server using the usual systemctl `status`, `start`, `stop`, `restart` followed by the service name  

