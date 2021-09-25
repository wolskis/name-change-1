import React, { useContext, useState } from 'react'
import { RouteComponentProps } from 'react-router';
import Backdrop from '../../Backdrop/Backdrop';
import { useCreateNameMutation, useGetCitizenQuery } from '../../generated/graphql';
import Modal from '../../Modal/Modal';
import Spinner from '../../Spinner/Spinner';
import { NameOverview } from './NameOverview';
import { PastNames } from './PastNames';


const Name: React.FC<RouteComponentProps> = ({ history }) => {
    const [name, setName] = useState('');
    const [createNameForm, setCreateNameForm] = useState(false)

    const [createName] = useCreateNameMutation()

    const { data, loading, error } = useGetCitizenQuery({variables : {
        id: '614e8efce09be6803c4a8f84'
    }})
    
    if (!data && loading) {
        return <Spinner />
    }

    if (error) {
        return null
    }


    const onModalCancel = () => {
        setCreateNameForm(false)
    }

    const onModalConfirm = async () => {
        const response = await createName({
            variables: {
                nameInput: {
                    name
                }
            }
        })

        setCreateNameForm(false)
        history.push('/my-name')
    }



    return (
        <>
        {createNameForm && (
            <>
            <Backdrop />
            <Modal
                title='Add Name'
                canCancel
                canConfirm
                onCancel={onModalCancel}
                onConfirm={onModalConfirm}
                buttonText='Confirm'
            >
                <div className="form-control">
                    <input
                        value={name}
                        type="text"
                        placeholder="name"
                        onChange={e => {
                            setName(e.target.value)
                        }}
                    />
                </div>
            </Modal>
        </>
        )}

        <NameOverview 
            currentName={data?.getCitizen.currentName} 
            setCreateNameForm={setCreateNameForm} 
            pastNamesLength={data?.getCitizen.pastNames.length}
        />
        <PastNames pastNames={data?.getCitizen.pastNames}/>
    </>   
    );
}

export {
    Name
}