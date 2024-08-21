# Issues / bugs / things to address

## General shit to check or fix

- When should a JWT expire? Should it overwrite an earlier token if a new login is made with the same account? Should it expire after a while? Should it expire if the browser is closed??? + Handle logout (aka voluntary token expiration)!!

- NEED LOGOUT FUNCTIONALITY!!!

- There's parts of functions that I will have to write in every component: TODO write them once and import them in the single components

- Fix vite.config.js so I dont have to update it everytime I add a new route

## Next in line TODO

- Start working on notes: first direct user to the notes page in the frontend, then work on them separately (backend: new route/model file, connect the note schema to the user/event schema, frontend add functionality, learn markup rules, find possible npm dependencies for note view, etc)
