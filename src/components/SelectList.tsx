import { FC, FormEvent } from "react";

import { List } from "../store/types";
import { setSelectedList } from "../store/actions";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const SelectList: FC = ()=>{
    const dispatch = useDispatch();
    const lists = useSelector((state: RootState) => state.list.lists);

    const selectChangeHandler = (e: FormEvent<HTMLSelectElement>) => {
        dispatch(setSelectedList(e.currentTarget.value));
    }
    return(
        <section>
            <h2 className="is-size-4 has-text-centered mb-4">Choose a list</h2>
            <div className="field mb-5">
                <div className="contrl has-icons-left">
                    <div className="select fullwidth">
                        <select className="fullwidth" onChange={selectChangeHandler}>
                            <option value="">Select List</option>
                            { Object.keys(lists).length > 0 &&
                                Object.values(lists).map((list: List) => (
                                    <option value={list.id} key={list.id}>{list.name}</option>
                                ))

                            }
                        </select>
                    </div>
                    
                </div>
            </div>
        </section>
    )
}
export default SelectList;