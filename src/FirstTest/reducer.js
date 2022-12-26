let lastId = 0;

export default function reducer(store = [], action) {
    if (action.type === "ADD_BUG") {
        return [
            ...store,
            {
                id: ++lastId,
                description: action.payload.description,
                resolve: false
            }
        ]
    } else if (action.type === "REMOVE_BUG") {
        return store.filter(item => item.id !== action.payload.id)
    } else {
        return store
    }

/*    switch (action.type) {
        case "ADD_BUG":
            return [
                ...store,
                {
                    id: ++lastId,
                    description: action.payload.description,
                    resolve: false
                }
            ]
        case "REMOVE_BUG":
            return store.filter(item => item.id !== action.payload)
        default:
            return store;
    }*/
}
