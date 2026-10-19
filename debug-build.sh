#!/bin/bash
mkdir -p .output/public
{ echo "node $(node -v) npm $(npm -v)"; uname -a; df -h . | tail -1; free -m 2>/dev/null | head -2
  npm run build 2>&1; echo "EXIT=$?"; } > .output/public/build.log 2>&1
# build.log was written before .output may be wiped by nuxt, so copy again at the end
cp .output/public/build.log /tmp/build.log 2>/dev/null
mkdir -p .output/public && cp /tmp/build.log .output/public/build.log
exit 0
