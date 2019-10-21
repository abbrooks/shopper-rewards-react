import React, {useState} from 'react';
import './Transactions.css';
import TransactionMonth from '../TransactionMonth';

function Transactions(props) {
    
    return props.transactions.map((month) => (
        <TransactionMonth 
            key={month.id}
            index={month.id} 
            title={month.title}
            data={month.data}
            totalPoints={month.totalPoints}
        ></TransactionMonth>
    ));
}

export default Transactions;
