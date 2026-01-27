import { Drawer } from "@mui/material"
import Tabs from "./Tabs/Tabs"
import { TabsEnum } from "../../utils/tabsConfig"
import { useSelector } from "react-redux"
import type { RootState } from "../../redux/store"
import SettingsTab from "./Tabs/SettingsTab"
import DefaultModels from "./Tabs/DefaultModels"

interface SideNavProps {
    toggleWalkMode: () => void
    onUploadClick : () => void
    loadModel : (url: string, ext: string, setLoadingModelState: (loading: boolean) => void) => void
    setLoadingModelState: (loading: boolean) => void
}

const Sidenav: React.FC<SideNavProps> = ({ toggleWalkMode, onUploadClick, loadModel, setLoadingModelState }) => {
    const settings = useSelector((state: RootState) => state.settings)
    return (
        <>
            <Drawer
                open={settings.sidenavOpen}
                hideBackdrop
                variant="persistent"
                anchor="right"
                slotProps={{
                    paper: {
                        sx: {
                            backgroundColor: "#0F0F0F",
                            color: "white",
                            width: "350px",
                            maxWidth : "350px"
                        }
                    }
                }}
            >
                <div>
                    <Tabs />
                    {
                        settings.selectedTab == TabsEnum.Settings ? <SettingsTab toggleWalkMode={toggleWalkMode} onUploadClick = {onUploadClick} />
                            :
                        settings.selectedTab == TabsEnum.DefaultModels && <DefaultModels loadModel = {loadModel} setLoadingModelState = {setLoadingModelState} />
                    }
                </div>
            </Drawer>
        </>
    )
}

export default Sidenav