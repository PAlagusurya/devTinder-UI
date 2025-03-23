# Deploying a Frontend Application Using Nginx on AWS EC2

## Step 1: Create an AWS Account

- Sign up for an AWS account at [AWS Console](https://aws.amazon.com/).
- Log in to the AWS Management Console.

## Step 2: Launch an EC2 Instance

- In the AWS console, search for **EC2** and open the EC2 Dashboard.
- Click **Launch Instance**.
- Choose **Ubuntu** as the operating system.
- Create a new key pair (e.g., `my-key.pem`) and download it to your system.
- Leave the remaining configurations as default.
- Click **Launch** and wait for the instance to start.

## Step 3: Connect to the EC2 Instance

```sh
cd /path/to/pem-file
chmod 400 my-key.pem
ssh -i my-key.pem ubuntu@<your-ec2-public-ip>
```

## Step 4: Install Node.js

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
nvm install <your-node-version>
```

## Step 5: Clone and Build the Frontend Project

```sh
git clone <your-repository-url>
cd <your-project-folder>
npm install
npm run build
```

## Step 6: Install and Configure Nginx

```sh
sudo apt update  # Ensures package list is updated
sudo apt install nginx -y  # Installs Nginx web server
sudo systemctl start nginx  # Starts Nginx service
sudo systemctl enable nginx  # Ensures Nginx starts on boot
```

## Step 7: Deploy the Build Files

```sh
sudo cp -r dist/* /var/www/html/
```

## Step 8: Configure Security Group Inbound Rules

- Go to the AWS **EC2 Dashboard**.
- Select your instance and navigate to the **Security** section.
- Click on **Security Groups** and then **Edit Inbound Rules**.
- Add a new rule to allow HTTP traffic:
  - **Type**: HTTP
  - **Port Range**: 80
  - **Source**: Anywhere (0.0.0.0/0)

> **Why is this needed?**
>
> - Port 22 (SSH) is for remote access to the server.
> - Port 80 is required to allow web traffic to access your frontend application via a browser.

## Step 9: Verify the Deployment

- Open a web browser and enter your EC2 public IP address.
- If configured correctly, your frontend application should load.

# Configuring Nginx to Proxy Backend to `/api/`

## Step 1: Open Nginx Configuration File

```sh
sudo nano /etc/nginx/sites-available/default
```

## Step 2: Update Server Configuration

Find the `server_name` directive and set it to your public IP.  
Then, add the following location block below it:

```nginx
server {
    listen 80;
    server_name YOUR_PUBLIC_IP;

    location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

> **Note:** Replace `YOUR_PUBLIC_IP` with your actual public IP address.

## Step 3: Save and Exit

- Press `CTRL + X` to exit the editor.
- Press `Y` to confirm saving the changes.
- Press `Enter` to save and exit.

## Step 4: Restart Nginx

Restart the Nginx service to apply the new configuration:

```sh
sudo systemctl restart nginx
```

## Step 5: Update Frontend Configuration

Set the `BASE_URL` in your frontend code to:

```js
const BASE_URL = "/api";
```

This ensures all API requests are sent through Nginx to the backend.

## Notes

- PEM (Privacy-Enhanced Mail) is a file format commonly used to store and exchange cryptographic keys, certificates, and other security-related data.
