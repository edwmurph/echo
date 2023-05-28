#!/bin/bash

function metadata() {
  local API=${1?USAGE: metadata <API>}
  local HOST='http://169.254.169.254'
  local TOKEN=$(curl --max-time 10 -s -X PUT "$HOST/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
  curl -s -H "X-aws-ec2-metadata-token: $TOKEN" "$HOST/latest/meta-data/$API"
  echo ''
}

function subnet() {
  local INTERFACE=$(metadata "network/interfaces/macs")
  local SUBNET=$(metadata "network/interfaces/macs/${INTERFACE}/subnet-id")
  echo $SUBNET
}

echo "<center><h1>SUBNET: $(curl ${ECS_CONTAINER_METADATA_URI_V4})</h1></center>" > public/index.html

node index.mjs
