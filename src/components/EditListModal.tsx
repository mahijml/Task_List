import { FC, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { setListToEdit, setNotification, updateList } from "../store/actions";
import { List } from "../store/types";

interface EditListModalProps {
    list: List;
}

const EditListModal: FC<EditListModalProps> = ({list}) =>{
    const dispatch = useDispatch();
    const [listName , setListName] = useState(list.name);
    const hideModalHandler = () =>{
        dispatch(setListToEdit(''))
    }
    const submitHandler = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if(listName.trim() === ''){
            return alert('list name is required!')
        }

        if(listName.trim() === list.name){
            return alert('list name as same as before')
        }

        dispatch(updateList(list.id, listName.trim()));
        dispatch(setNotification(`list"${list.name}" updated!`));
    }
    const changeHandler = (e:FormEvent<HTMLInputElement>) =>{
        setListName(e.currentTarget.value);
    }
    return(
        <div className="modal is-active">
            <div className="modal-background" onClick={hideModalHandler}></div>
            <form className="modal-card" onSubmit={submitHandler}>
                <header className="header modal-card-head">
                    <p className="modal-card-title">EditList</p>
                    <button className="delete" type="button"onClick={hideModalHandler}></button>
                </header>
                <div className="modal-card-body">
                    <div className="field">
                        <label className="label">
                            list Name
                        </label>
                        <div className="control">
                            <input 
                            type="text"
                            className="input"
                            value={listName}
                            placeholder="list name"
                            name="listName"
                            onChange={changeHandler}
                            />
                        </div>
                    </div>
                </div>
                <footer className="modal-card-foot">
                    <button type="submit" className="button is-success">Save Changes</button>
                    <button type="button" className="button" onClick={hideModalHandler}>Cancel</button>
                </footer>
            </form>
        </div>
    )
}

export default EditListModal;