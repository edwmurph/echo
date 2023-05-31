#!/bin/bash

echo "<center>" > public/index.html
echo "<h2>$(aws --version)</h2>" >> public/index.html
echo "<br />" > public/index.html
echo "<h2>$(aws sts get-caller-identity)</h2>" >> public/index.html
echo "<br />" > public/index.html
echo "<h2>$(curl ${ECS_CONTAINER_METADATA_URI_V4})</h2>" >> public/index.html
echo "</center>" >> public/index.html

node index.mjs
