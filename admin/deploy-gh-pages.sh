#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

export $(cat $SCRIPT_DIR/../.env.deploy.local | xargs)

curl -i \
  -X POST \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token ${GITHUB_TOKEN}" \
  https://api.github.com/repos/dotcs/dotcs.github.io/dispatches \
  -d '{"event_type":"deploy"}'