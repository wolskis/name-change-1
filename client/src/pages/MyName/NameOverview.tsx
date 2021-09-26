import React from 'react'
import './nameOverview.css'

interface INameOverviewProps {
    currentName?: string,
    setCreateNameForm: (value: boolean) => void
    pastNamesLength?: number
}

const NameOverview: React.FC<INameOverviewProps> = ({ currentName, setCreateNameForm, pastNamesLength }) => {
    return (
        <div className="names-control">
            <div className="text">
               <h4>Your current name is : {currentName}</h4>  
               { (pastNamesLength ?? 0) > 0 && <p>Following are your past names</p> }
            </div>
            <div className="form-actions sx">
                <button onClick={() => setCreateNameForm(true)}>Create Name</button>
            </div>
        </div>
    );
}

export {
    NameOverview
}