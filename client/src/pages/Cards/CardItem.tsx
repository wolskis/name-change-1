import React from 'react'
import { Maybe } from '../../generated/graphql';
import './nameListItem.css'

interface ICardItemProps {
    name: string
    endDate?: Maybe<string>
    startDate?: Maybe<string>
    endDateType?: string
}

const CardItem: React.FC<ICardItemProps> = ({ name, startDate, endDate, endDateType }) => {
    return (
        <li className="names__list-item">
            <div className="names__header">
                <h1> {name}</h1>
            </div>
            {startDate && <div className="names__row-item">
                <h2>{new Date(startDate).toLocaleDateString()}</h2>
                <p>Start Date</p>
            </div>}
            {endDate && <div className="names__row-item">
                <h3>{new Date(endDate).toLocaleDateString()}</h3>
                {endDateType === 'expiring' ? <p>Expiring Date</p> :<p>End Date</p>}
            </div>}
        </li>
    );
}

export {
    CardItem
}