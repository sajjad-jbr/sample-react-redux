import React, {useRef, useState} from 'react';
import configureStore from "../StoreWithToolkit";
import * as actionToolkit from "../StoreWithToolkit/bug";

let unsubscribe = null
const store = configureStore()

function FirstAppReduxToolkit(props) {

    const [listBug, setListBug] = useState(store.getState());
    const [descriptionBug, setDescriptionBug] = useState("");
    const [isUpdate, setIsUpdate] = useState(false);
    const [currentBug, setCurrentBug] = useState({});
    const inputDescription = useRef();

    const handleAddBug = () => {
        if (descriptionBug.trim().length === 0){
            inputDescription.current.style.borderColor = "red"
            return
        }
        if (isUpdate) {
            store.dispatch(actionToolkit.updateBug({...currentBug, description: descriptionBug}))
        } else {
            store.dispatch(actionToolkit.addBug({description: descriptionBug}))
        }
        setIsUpdate(false)
        setCurrentBug({})
        setListBug(store.getState())
        setDescriptionBug("")
    }

    const handleRemoveBug = (bug) => {
        store.dispatch(actionToolkit.removeBug(bug))
        setListBug(store.getState())
    }

    const handleSubscribe = () => {
        unsubscribe = store.subscribe(() => {
            console.log("sajjad: ", {store, getState: store.getState()});
        })
    }

    const handleUnsubscribe = () => {
        if (unsubscribe !== null)
            unsubscribe()
    }

    const resolveBug = (bug) => {
        store.dispatch(actionToolkit.resolveBug(bug))
        setListBug(store.getState())
    }

    return (
        <div>
            simple todo bug
            <br/>
            <button onClick={handleAddBug}>
                {isUpdate ? "update " : "add "} bug
            </button>

            <button onClick={handleSubscribe}>
                subscribe store
            </button>

            <button onClick={handleUnsubscribe}>
                unsubscribe store
            </button>

            <br/>

            <input type="text" value={descriptionBug} ref={inputDescription}
                   onChange={(e) => {
                       setDescriptionBug(e.target.value)
                       if (descriptionBug.trim().length === 0) {
                           inputDescription.current.style.borderColor = "red"
                       }else{
                           inputDescription.current.style.borderColor = "black"
                       }
                   }}/>

            <br/>

            <ul>
                {listBug.map(bug => {
                    return <li key={bug.id}>
                        {`${bug.id} - ${bug.description} - ${bug.resolve} - `}
                        <button onClick={() => handleRemoveBug(bug)} disabled={currentBug.id === bug.id}>
                            remove bug
                        </button>
                        {!bug.resolve && <button onClick={() => resolveBug(bug)} disabled={currentBug.id === bug.id}>
                            resolve
                        </button>}
                        <button onClick={() => {
                            setDescriptionBug(bug.description)
                            setCurrentBug(bug)
                            setIsUpdate(true)
                        }} disabled={currentBug.id === bug.id}>
                            update
                        </button>
                    </li>
                })}
            </ul>
        </div>
    );
}

export default FirstAppReduxToolkit;
