import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getList, setListIdToDelete, setListToEdit } from "../store/actions";
import { RootState } from "../store/store";
import { List } from "../store/types";

export const Lists: FC = () =>{
    const dispatch = useDispatch();
    const lists = useSelector((state: RootState)=>  state.list.lists);

    const setListToEditHandler = (id: string)=>{
        dispatch(setListToEdit(id))
    }

    const setListIdToDeleteHandler = (id: string) =>{
        dispatch(setListIdToDelete(id))
    }
    useEffect(()=>{
        dispatch(getList());
    },[dispatch])
    return (
        <div className="panel is-primary">
            <div className="panel-heading">
                {Object.keys(lists).length === 0
                ?
                <p className="py-4 has-text-centered">No Lists</p>
                :
                <div>
                    {Object.values(lists).map((list: List) =>{
                        return <div className="panel-block py-3" key={list.id}>
                            <p onClick={()=> setListToEditHandler(list.id)}>{list.name}</p>
                            <span className="panel-icon has-text-danger ml-auto"onClick={()=> setListIdToDeleteHandler(list.id)}>
                                <i className="fas fa-times-circle "></i>
                            </span>
                            </div>
                    })}
                </div>
                }
            </div>
        </div>
    )
}