import { FC, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask, unsetTaskToEdit, setNotification , } from "../store/actions";
import { List, Task } from "../store/types";

interface EditTaskMOdalProps{
    taskToEdit:{
        list: List,
        task: Task
    }
}

const EditTaskModal: FC<EditTaskMOdalProps> = ({ taskToEdit: { list, task}}) => {
    const [taskName , setTaskName] = useState(task.name);
    const [taskState , setTaskState] = useState(task.completed);

    const dispatch = useDispatch();

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(taskName.trim() === ''){
            return alert('Task Name is Required!')
        }
        if(taskName === task.name && taskState === task.completed){
            return alert('Task Name and state are the same as before!')
        }
        dispatch(updateTask(task.id,taskName,taskState,list));
        dispatch(setNotification(`Task"${task.name}" updated!`));
    }
    const nameChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    setTaskName(e.currentTarget.value);
    }
    const stateChangeHandler = (e: FormEvent<HTMLInputElement>) => {
        setTaskState(e.currentTarget.checked);
    }
    const closeModalHandler = () => {
        dispatch(unsetTaskToEdit());
    }
    return(
        <div className="modal is-active">
            <div className="modal-background" onClick={closeModalHandler}></div>
            <form className="modal-card" onSubmit={submitHandler}>
                <header className="modal-card-head">
                    <p className="modal-card-title">Edit Task</p>
                    <button className="delete" type="button" onClick={closeModalHandler}></button>
                </header>
                <div className="modal-card-body">
                    <div className="field">
                        <label className="label">Task Name</label>
                        <div className="control">
                            <input type="text" className="input" placeholder="Task Name" value={taskName} onChange={nameChangeHandler} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Complete Task</label>
                        <label className="checkbox">
                        <input type="checkbox" checked={taskState} onChange={stateChangeHandler}/>
                            {' '} Complete
                        </label>
                    </div>
                </div>
                <footer className="modal-card-foot">
                    <button className="button is-success" type="submit">Save Changes</button>
                    <button className="button" type="button" onClick={closeModalHandler}>Cancle</button>
                </footer>
            </form>
        </div>
    )
}
export default EditTaskModal;