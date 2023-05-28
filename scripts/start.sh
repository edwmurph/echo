#!/bin/bash

echo "<center><h2>$(curl ${ECS_CONTAINER_METADATA_URI_V4})</h2></center>" > public/index.html

node index.mjs
