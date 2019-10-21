import React, { useState, useEffect } from 'react';
import './App.css';
import Login from '../Login';
import Header from '../Header';
import Dashboard from '../Dashboard';

function App() {

  const [users, setUsers] = useState([]);

  // effectively a null user
  const [CURR_USER, setCURR_USER] = useState({
    "_id":-1,
    "username":"default",
    "password":"default",
    "transactions":[
        {
          "id":0,
          "title":"Month",
          "data":[],
          "totalPoints":-1,
          "expanded":false,
        },
        {
          "id":1,
          "title":"Month",
          "data":[],
          "totalPoints":-1,
          "expanded":false,
        },
        {
          "id":2,
          "title":"Month",
          "data":[],
          "totalPoints":-1,
          "expanded":false,
        }
    ]
  });

  const loadUser = () => {
    document.getElementById('login-comp').style.display = 'none';
    document.getElementById('dashboard-comp').style.display = 'block';
  }

  const attemptLogin = (u,p) => {
    
    // Date initializers
    var monthStringArr = new Array();
    monthStringArr[0] = "January";
    monthStringArr[1] = "February";
    monthStringArr[2] = "March";
    monthStringArr[3] = "April";
    monthStringArr[4] = "May";
    monthStringArr[5] = "June";
    monthStringArr[6] = "July";
    monthStringArr[7] = "August";
    monthStringArr[8] = "September";
    monthStringArr[9] = "October";
    monthStringArr[10] = "November";
    monthStringArr[11] = "December";

    let now = new Date();
    let currMonth = now.getMonth();
    let prevMonth = 0;
    let prevPrevMonth = 0;
    let currYear = now.getFullYear();
    let prevYear = currYear - 1;

    if(currMonth == 0){
      prevMonth = 11;
      prevPrevMonth = 10;
    }
    else if(currMonth == 1){
      prevMonth = 0;
      prevPrevMonth = 11;
    }
    else{
      prevMonth = currMonth - 1;
      prevPrevMonth = currMonth - 2;
    }

    for(let i in users){
      // find the right user
      if(users[i].username == u && users[i].password == p){
        let newUser = users[i];
        let allTransactions = newUser.transactions;
        let lastThreeMonths = [
          {
            id: 0,
            title: monthStringArr[currMonth],
            data: [],
            totalPoints: 0,
            expanded:false,
          },
          {
            id: 1,
            title: monthStringArr[prevMonth],
            data: [],
            totalPoints: 0,
            expanded:false,
          },
          {
            id: 2,
            title: monthStringArr[prevPrevMonth],
            data: [],
            totalPoints: 0,
            expanded:false,
          }
        ];
        // store the last three months of a user's transactions in an object
        for(let transaction in allTransactions){
          let theDate = new Date(allTransactions[transaction].datetime);
          let theMonth = theDate.getMonth();
          let theYear = theDate.getFullYear();
          if(theYear == currYear){
            if(theMonth == currMonth){
              lastThreeMonths[0].data.push(allTransactions[transaction]);
            }
            else if(theMonth == prevMonth){
              lastThreeMonths[1].data.push(allTransactions[transaction]);
            }
            else if(theMonth == prevPrevMonth){
              lastThreeMonths[2].data.push(allTransactions[transaction]);
            }
          }
          else if(theYear == prevYear){
            if(currMonth == 0){
              if(theMonth == 11){
                lastThreeMonths[1].data.push(allTransactions[transaction]);
              }
              else if(theMonth == 10){
                lastThreeMonths[2].data.push(allTransactions[transaction]);
              }
            }
            if(currMonth == 1){
              if(theMonth == 11){
                lastThreeMonths[2].data.push(allTransactions[transaction]);
              }
            }
          }
          else{
            // ignore transactions not made within the last three months
          }
        }
        // calculate points per transaction and total points per month
        for(let transaction in lastThreeMonths[0].data){
          let pay = lastThreeMonths[0].data[transaction];
          let newPoints = 0;
          if(pay.transactionTotal > 50 && pay.transactionTotal <= 100){
            let pointTransform = (pay.transactionTotal - 50);
            newPoints = pointTransform;
            lastThreeMonths[0].totalPoints += pointTransform;
          }
          else if(pay.transactionTotal > 100){
            let pointTransform = 50+((pay.transactionTotal - 100) * 2);
            newPoints = pointTransform;
            lastThreeMonths[0].totalPoints += pointTransform;
          }
        }
        for(let transaction in lastThreeMonths[1].data){
          let pay = lastThreeMonths[1].data[transaction];
          let newPoints = 0;
          if(pay.transactionTotal > 50 && pay.transactionTotal <= 100){
            let pointTransform = (pay.transactionTotal - 50);
            newPoints = pointTransform;
            lastThreeMonths[1].totalPoints += pointTransform;
          }
          else if(pay.transactionTotal > 100){
            let pointTransform = 50+((pay.transactionTotal - 100) * 2);
            newPoints = pointTransform;
            lastThreeMonths[1].totalPoints += pointTransform;
          }
        }
        for(let transaction in lastThreeMonths[2].data){
          let pay = lastThreeMonths[2].data[transaction];
          let newPoints = 0;
          if(pay.transactionTotal > 50 && pay.transactionTotal <= 100){
            let pointTransform = (pay.transactionTotal - 50);
            newPoints = pointTransform;
            lastThreeMonths[2].totalPoints += pointTransform;
          }
          else if(pay.transactionTotal > 100){
            let pointTransform = 50+((pay.transactionTotal - 100) * 2);
            newPoints = pointTransform;
            lastThreeMonths[2].totalPoints += pointTransform;
          }
        }
        newUser.transactions = lastThreeMonths;
        setCURR_USER(newUser);
        loadUser();
        document.getElementById('auth-fail-p').style.opacity = '0';
        return;
      }
    }
    document.getElementById('auth-fail-p').style.opacity = '1.0';
  }

  // error handling with fetch statements
  const handleErrors = (response) =>{
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  // load all users & transactions from db.json
  const loadDB = () =>{
    fetch('http://localhost:3000/users')
      .then(response => handleErrors(response))
      .then(response => response.json())
      .then(json => {
        // json = json.sort()
        setUsers(json)
      })
      .catch(error => console.log(error));
  };

  // on page load, access the DB pre-login
  useEffect(
    () =>{
      loadDB();
    },
    []
  );

  return (
    <div className="App">
      <Header></Header>
      <Login 
        attemptLogin={attemptLogin}
      ></Login>
      <Dashboard 
        user={CURR_USER} 
      ></Dashboard>
    </div>
  );
}

export default App;
