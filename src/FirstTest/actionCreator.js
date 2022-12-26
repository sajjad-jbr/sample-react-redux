import * as actionTypes from "./actionTypes";

export function addBugAction (description){
    return {
        type: actionTypes.addBug,
        payload: {
            description: description
        }
    }
}

export const removeBugAction = (bug)=>({
    type: actionTypes.removeBug,
    payload: bug
})
