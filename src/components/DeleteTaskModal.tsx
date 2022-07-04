import { FC } from "react"
import { useDispatch } from "react-redux"
import { deleteTask, setNotification, unsetTaskToDelete } from "../store/actions"
import { List, Task } from "../store/types"

interface DeleteTaskModalProps{
    taskToDelete: {
        task: Task,
        list: List
    }
}

const DeleteTaskModal: FC<DeleteTaskModalProps> = ({taskToDelete: {task, list}}) => {
    const dispatch = useDispatch();

    const deleteHandler = ()=>{
        dispatch(deleteTask(task, list));
        dispatch(setNotification(`Task "${task.name}" deleted!`, 'danger'))
    }
    const closeModalHandler = ()=> {
        dispatch(unsetTaskToDelete())
    }

    return(
        <div className="modal is-active">
            <div className="modal-background" onClick={closeModalHandler}></div>
            <div className="modal-card">
                <header className="modal-card-head has-text-centered">
                    <p className="modal-card-title">Areyou sure you want to delete this task?</p>
                </header>
                <footer className="modal-card-foot">
                    <button className="button is-danger" type='submit' onClick={deleteHandler}>Delete</button>
                    <button className="button" onClick={closeModalHandler}>Cancle</button>
                </footer>
            </div>
        </div>
    )
}
export default DeleteTaskModal;