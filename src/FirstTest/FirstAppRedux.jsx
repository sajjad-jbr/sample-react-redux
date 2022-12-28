import React, {useState} from 'react';
import store from "./store";
import * as actionCreator from './actionCreator'

let unsubscribe = null

function FirstAppRedux(props) {

    const handleAddBug = () => {
        store.dispatch(actionCreator.addBugAction(descriptionBug))
        setListBug(store.getState())
        setDescriptionBug("")
    }

    const handleRemoveBug = (bug) => {
        store.dispatch(actionCreator.removeBugAction(bug))
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
        store.dispatch(actionCreator.resolveBugAction(bug))
        setListBug(store.getState())
    }

    const [listBug, setListBug] = useState(store.getState());
    const [descriptionBug, setDescriptionBug] = useState("");

    return (
        <div>
            simple todo bug
            <br/>
            <button onClick={handleAddBug}>
                add bug
            </button>

            <button onClick={handleSubscribe}>
                subscribe store
            </button>

            <button onClick={handleUnsubscribe}>
                unsubscribe store
            </button>

            <br/>

            <input type="text" value={descriptionBug} onChange={(e) => setDescriptionBug(e.target.value)}/>

            <br/>

            <ul>
                {listBug.map(bug => {
                    return <li key={bug.id}>
                        {`${bug.id} - ${bug.description} - ${bug.resolve} - `}
                        <button onClick={() => handleRemoveBug(bug)}>
                            remove bug
                        </button>
                        {!bug.resolve && <button onClick={() => resolveBug(bug)}>
                            resolve
                        </button>}
                    </li>
                })}
            </ul>
        </div>
    );
}

export default FirstAppRedux;
