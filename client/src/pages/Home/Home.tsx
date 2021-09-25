import React from 'react'
import { useExpiringNamesQuery } from '../../generated/graphql'
import Spinner from '../../Spinner/Spinner'
import { Callout } from '../Callout/Callout'
import { Cards } from '../Cards/Cards'

interface IHomeProps {

}

const Home: React.FC<IHomeProps> = ({ }) => {

    const { data, loading, error } = useExpiringNamesQuery()

    if (loading || !data) {
        return <Spinner />
    }

    if (error) {
        return null
    }

    if (data.expiringNames.length === 0) {
        return (
            <Callout
                title="Currently there are no names available"
            />
        )
    }

    return (
        <>
            <Callout 
                title='Upcoming free names'
                body="These names will be available to use after 28 days"
            />
            <Cards names={data.expiringNames} endDateType='expiring'/>
        </>
    )
}

export {
    Home
}