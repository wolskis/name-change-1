import React from 'react'
import { Maybe } from '../../generated/graphql';
import { Callout } from '../Callout/Callout';
import { Cards } from '../Cards/Cards';

interface IPastNamesProps {
       pastNames?: {
            id: string
            name: string
            endDate?: Maybe<string>
        }[]
}

const PastNames: React.FC<IPastNamesProps> = ({pastNames}) => {

    if (pastNames?.length === 0) {
        return (
            <Callout 
                title="You do not have any past names."
            />
        )
    }
        return (
            <Cards names={pastNames}
            />
        );
}

export {
    PastNames
}