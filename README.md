# shopper-rewards-react
This app uses [json-server](https://github.com/typicode/json-server), a fake REST API for rapid prototyping.

## Starting the App:
* Open terminal, and clone this repo via ```git clone https://github.com/abtheteabandit/shopper-rewards-react.git```.
* In terminal, navigate into the ```rewards-app``` directory.
* Start the JSON Server with the command ```json-server --watch db.json```.
* Start the React project with ```npm start```.
* Open your browser to [localhost:8000](http://localhost:8000).
* Log in with the credentials specified in db.json for a user. By default the username is 'user1' & the password is 'password1'.
* Once logged in, you may browse the user's dashboard to view the past three months' worth of their transactions and their calculated rewards points.
* (Optional) In a new tab, open [localhost:3000/users](http://localhost:3000/users) to view the users array within db.json.


## Testing
* While the JSON Server is running with the ```--watch``` flag, you may modify db.json and reload the browser window to see how the app handles your changes.
* To revert any changes made to db.json, just copy the contents of default.json into db.json.
