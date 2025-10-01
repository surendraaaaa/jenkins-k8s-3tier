#!/bin/bash

# Set the Instance ID and path to the .env file
INSTANCE_ID="i-0bb8d7ab09cc91be2"

# Retrieve the public IP address of the specified EC2 instance
ipv4_address=$(aws ec2 describe-instances --instance-ids $INSTANCE_ID --query 'Reservations[0].Instances[0].PublicIpAddress' --output text)

# Path to the .env file
file_to_find=".env.example"

# Check the current FRONTEND_URL in the .env file
current_url=$(sed -n "7p" $file_to_find)

# Update the .env file if the IP address has changed
if [[ "$current_url" != "VITE_API_URL=\"http://${ipv4_address}:5000\"" ]]; then
    if [ -f $file_to_find ]; then
        sed -i -e "s|VITE_API_URL.*|VITE_API_URL=\"http://${ipv4_address}:5000\"|g" $file_to_find
    else
        echo "ERROR: File not found."
    fi
fi


#!/bin/bash

# Update VITE_API_URL in frontend/.env with current EC2 public IP
#INSTANCE_ID="i-xxxxxxxxxxxxxxxxx"
#PUBLIC_IP=$(aws ec2 describe-instances --instance-ids "$INSTANCE_ID" --query 'Reservations[0].Instances[0].PublicIpAddress' --output text)

#if [[ -z "$PUBLIC_IP" || "$PUBLIC_IP" == "None" ]]; then
#    echo "❌ ERROR: Could not get public IP"
#    exit 1
#fi

#ENV_FILE=".env.example"
#echo "VITE_API_URL=http://${PUBLIC_IP}:5000" > "$ENV_FILE"
#echo "✅ Updated VITE_API_URL in $ENV_FILE"
