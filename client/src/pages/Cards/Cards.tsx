import React from 'react'
import { Maybe } from '../../generated/graphql';
import { CardItem } from './CardItem';
import './nameList.css'

interface ICardsProps {
    names?: {
        id: string
        name: string
        endDate?: Maybe<string> 
        startDate?: Maybe<string> 
    }[]
    endDateType?: string
}

const Cards: React.FC<ICardsProps> = ({ names, endDateType }) => {
    const list = names?.map(name => {
        return (
            <CardItem 
                key={name.id}
                name={name.name}
                startDate={name.startDate}
                endDate={name.endDate}
                endDateType={endDateType}
            />
        )
    })
        return (
            <ul className="names__list">
                {list}
            </ul>
        );
}

export {
        Cards
}