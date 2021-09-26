import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router';
import Backdrop from '../../Backdrop/Backdrop';
import { getAccessToken, getCitizenId } from '../../context';
import { GetCitizenDocument, GetCitizenQuery, useCreateNameMutation, useGetCitizenQuery } from '../../generated/graphql';
import Modal from '../../Modal/Modal';
import Spinner from '../../Spinner/Spinner';
import { NameOverview } from './NameOverview';
import { PastNames } from './PastNames';


const Name: React.FC<RouteComponentProps<{ id: string }>> = ({ 
    match: {
        params: {
            id
        }
    }
}) => {

    const [name, setName] = useState('');
    const [createNameForm, setCreateNameForm] = useState(false)

    const [createName, { loading: loadingMutation }] = useCreateNameMutation()

    const { data, loading: loadingCitizen, error } = useGetCitizenQuery({
        variables: {
            id: id
        }
    })

    if (error) {
        return <p>error</p>
    }

    if (!data && loadingCitizen) {
        <Spinner />
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
            },
            update: (store, { data }) => {
                if (!data) {
                    return null
                }
                store.writeQuery<GetCitizenQuery>({
                    query: GetCitizenDocument,
                    data: {
                        __typename: 'RootQuery',
                        getCitizen: data.createName.citizen
                    }
                })
            }
        })

        console.log(response)

        setCreateNameForm(false)
    }

    if (loadingMutation) {
        return <Spinner />
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
                        loading={loadingMutation}
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
                currentName={data?.getCitizen.currentName.name}
                setCreateNameForm={setCreateNameForm}
                pastNamesLength={data?.getCitizen.pastNames.length}
            />
            <PastNames pastNames={data?.getCitizen.pastNames} />
        </>
    );
}

export {
    Name
}