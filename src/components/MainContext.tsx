import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import AddNewTask from "./AddNewTask";
import SelectList from "./SelectList";
import Tasks from "./Tasks";

const MainContext: FC = () =>{
    const SelectedList = useSelector((state: RootState) => state.list.selectedList);
    return(
        <div className="column is-9">
            <div className="box">
                <SelectList/>
                {
                    SelectedList &&
                    <>
                        <AddNewTask list={SelectedList}/>
                        <hr/>
                        <Tasks tasks={SelectedList.tasks}/>
                    </>
                }
            </div>
        </div>
    )
}
export default MainContext;