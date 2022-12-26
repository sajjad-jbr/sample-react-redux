import React, {useState} from 'react';
import store from './FirstTest/store'

function App(props) {

    const unsubscribe = store.subscribe(()=>{
        console.log("sajjad: ", {store, getState: store.getState()});
    })

    const [listBug, setListBug] = useState(store.getState());
    return (
        <div>
            hello world!!!
            <button onClick={() => {
                store.dispatch({
                    type: "ADD_BUG",
                    payload: {
                        description: "bug 1"
                    }
                })
                setListBug(store.getState())
            }}>
                add bug
            </button>
            <button onClick={() => {
                store.dispatch({
                    type: "REMOVE_BUG",
                    payload: {
                        ...listBug[listBug.length - 1]
                    }
                })
                setListBug(store.getState())
            }}>
                remove bug
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

export default App;
