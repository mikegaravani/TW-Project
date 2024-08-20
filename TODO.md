# Issues / bugs / things to address

- When should a JWT expire? Should it overwrite an earlier token if a new login is made with the same account? Should it expire after a while? Should it expire if the browser is closed??? + Handle logout (aka voluntary token expiration)!!

- There's parts of functions that I will have to write in every component: TODO write them once and import them in the single components

- Fix vite.config.js so I dont have to update it everytime I add a new route
