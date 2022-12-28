import reducer from './reducer'

function createStore(reducer) {
    let state
    let isSubscribed = false
    let subscribeHandler = () => {}

    function getState() {
        return state;
    }

    function dispatch(action) {
        state = reducer(state, action)
        if (isSubscribed)
            subscribeHandler()
    }

    function subscribe(func) {
        isSubscribed = true
        subscribeHandler = func
    }

    function unsubscribe() {
        isSubscribed = false
        subscribeHandler = ()=>{}
    }

    return {
        getState,
        dispatch,
        subscribe,
        unsubscribe
    }
}

export default createStore(reducer)
