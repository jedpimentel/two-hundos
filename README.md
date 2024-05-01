# two-hundos

run via:
    (moving to dotenv instead update this doc where needed) node --env-file=.env .


run frontend via:
    cd frontend
    npm start

I'm writing this on a Windows machine #sorrynotsorry

for addTextBox.js:
    node --env-file=.env addTextBox.js

for setting the mongodb env variable
    heroku config:set VAR_NAME=value










wololololloooooo

npm run build
(build the frontend)
then
npm start


apolloclient.js has some stuff that needs to be toggled manually between  local and build mode
not gonna try to solve it right now because #time


import Draggable from 'react-draggable';
react-draggable was depricated, (darn machines :/)
need to refactor that logic, but in mean time I'll remove strict mode
I REMOVED STRICT MODE