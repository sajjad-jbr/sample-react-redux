import React, {useState} from 'react';
import store from "./store";
import * as actionCreator from './actionCreator'

let unsubscribe = null

function FirstAppRedux(props) {

    const handleAddBug = () => {
        store.dispatch(actionCreator.addBugAction("bug 1"))
        setListBug(store.getState())
    }

    const handleRemoveBug = () => {
        store.dispatch(actionCreator.removeBugAction(listBug[listBug.length - 1]))
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

    const [listBug, setListBug] = useState(store.getState());

    return (
        <div>
            simple todo bug
            <br/>
            <button onClick={handleAddBug}>
                add bug
            </button>
            <button onClick={handleRemoveBug}>
                remove bug
            </button>
            <button onClick={handleSubscribe}>
                subscribe store
            </button>
            <button onClick={handleUnsubscribe}>
                unsubscribe store
            </button>
            <br/>
            <ul>
                {listBug.map(bug => {
                    return <li key={bug.id}>
                        {`${bug.id} - ${bug.description} - ${bug.resolve}`}
                    </li>
                })}
            </ul>
        </div>
    );
}

export default FirstAppRedux;
