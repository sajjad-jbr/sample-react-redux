import React, {useRef, useState} from 'react';
import {projectAction} from "../StoreWithToolkit/project";
import StoreWithToolkit from '../StoreWithToolkit'
const store = StoreWithToolkit()
let unsubscribe = null
function ProjectList(props) {

    const [projectList, setProjectList] = useState(store.getState());
    const [nameProject, setNameProject] = useState("");
    const [isUpdate, setIsUpdate] = useState(false);
    const [currentProject, setCurrentProject] = useState({});
    const refInput = useRef();

    const handleAddBug = () => {
        if (nameProject.trim().length === 0){
            refInput.current.style.borderColor = "red"
            return
        }
        if (isUpdate) {
            store.dispatch(projectAction.updateProject({...currentProject, name: nameProject}))
        } else {
            store.dispatch(projectAction.addProject({name: nameProject}))
        }
        setIsUpdate(false)
        setCurrentProject({})
        setProjectList(store.getState())
        setNameProject("")
    }

    const handleRemoveBug = (project) => {
        store.dispatch(projectAction.removeProject(project))
        setProjectList(store.getState())
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

    return (
        <div>
            simple todo project
            <br/>
            <button onClick={handleAddBug}>
                {isUpdate ? "update " : "add "} project
            </button>

            <button onClick={handleSubscribe}>
                subscribe store
            </button>

            <button onClick={handleUnsubscribe}>
                unsubscribe store
            </button>

            <br/>

            <input type="text" value={nameProject} ref={refInput}
                   onChange={(e) => {
                       setNameProject(e.target.value)
                       if (nameProject.trim().length === 0) {
                           refInput.current.style.borderColor = "red"
                       }else{
                           refInput.current.style.borderColor = "black"
                       }
                   }}/>

            <br/>

            <ul>
                {projectList.map(project => {
                    return <li key={project.id}>
                        {`${project.id} - ${project.name} - `}
                        <button onClick={() => handleRemoveBug(project)} disabled={currentProject.id === project.id}>
                            remove project
                        </button>

                        <button onClick={() => {
                            setNameProject(project.name)
                            setCurrentProject(project)
                            setIsUpdate(true)
                        }} disabled={currentProject.id === project.id}>
                            update
                        </button>
                    </li>
                })}
            </ul>
        </div>
    );
}
export default ProjectList;
