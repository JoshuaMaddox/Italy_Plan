#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 23
exec /Users/joshuamaddox/.nvm/versions/node/v23.3.0/bin/node /Users/joshuamaddox/Documents/Italy_Plan/node_modules/.bin/vite
