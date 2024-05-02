# two-hundos

This app lets you speak to two benjamin Franklins at the same time.
They're always bickering.

Last request made is saved and persists accross sessions.

This project is at least 80-90% AI generated. Transcript:
https://chat.openai.com/share/66b6840d-9387-40ac-8172-da8568766884

I was surprised how often copy/pasting worked.
Moreso surprised by how much faster it was than a websearch.
There where definitely some esoteric bugs that were resolved via hunches.
The AI also led me towards stuff that was depricated, and ended becoming part of the project.
(not everything was copy-pasted, and towards the end the AI diverged more from previous code)

I feel the stack is bloated for what the app does







=====here be dragons=====

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


gotta fixx ports 3000 and 4000 having to be manually set for local mode versus deployment
build mode is a single port


the chatgpt stuff I first tried usint via rest/post, but graphql ended up being more consistent with rest of project, and less headache
I still need to clean the old stuff.


I NEED TO ADD ERROR HANDLING
For if mongo or chatGPT are down or something