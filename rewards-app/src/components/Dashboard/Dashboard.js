import React from 'react';
import './Dashboard.css';
import Transactions from '../Transactions';

function Dashboard(props) {

  const getTotalPoints = () =>{
    var currMonth = props.user.transactions[0].totalPoints;
    var prevMonth = props.user.transactions[1].totalPoints;
    var prevPrevMonth = props.user.transactions[2].totalPoints;
    return currMonth+prevMonth+prevPrevMonth;
  };
  return (
    <div id="dashboard-comp" className="dashboardContainer">
        <p id="welcome">Welcome, {props.user.username}!</p>
        <h2>Your Rewards</h2>
        <div className="totalPointsContainer">
          <p>You have earned a total of</p>
          <h3>{getTotalPoints()} points</h3>
          <p>over the past three months!</p>
        </div>
        <h2>Your Transactions</h2>
        <div id="transactions-comp" className="transactionsContainer">
            <Transactions 
              transactions={props.user.transactions} 
            ></Transactions>
        </div>
    </div>
  );
}

export default Dashboard;
