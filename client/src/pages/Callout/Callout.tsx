import React from 'react'
import './callout.css'

interface ICalloutProps {
    title: string
    body?: string
}

const Callout: React.FC<ICalloutProps> = ({ title , body }) => {
        return (
            <div className="callout">
                <h2>{title}</h2>
                <p>{body}</p>
            </div>
        );
}

export {
        Callout
}