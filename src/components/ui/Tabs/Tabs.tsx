import { useDispatch, useSelector } from "react-redux";
import { tabList } from "../../../utils/tabsConfig";
import type { AppDispatch, RootState } from "../../../redux/store";
import { setSettings } from "../../../redux/slices/settingsSlice";


const Tabs = () => {
    const settings = useSelector((state : RootState) => state.settings);
    const dispatch = useDispatch<AppDispatch>();

    const onTabClick = (tabName: string) => {
        dispatch(setSettings({selectedTab : tabName}));
    }

    return (
        <div style={{
            display: "flex",
            gap: "7px",
            background: "#0A0A0A",
            padding: "7px"
        }}>
            {
                tabList.map((tabName: string) => {
                    return (
                        <div
                            key={tabName}
                            onClick={() => onTabClick(tabName)}
                            style={{background : settings.selectedTab == tabName ? "#24436C" : "#111A25"}}
                            className="pt-1 pb-1 pl-2 pr-2 cursor-pointer rounded-s hover:bg-[#24436C] transition-all duration-200">
                            <p>{tabName}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Tabs