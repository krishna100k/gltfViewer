import { Drawer } from "@mui/material"

const Sidenav = () => {
    return (
        <>
            <Drawer
                open={true}
                hideBackdrop
                variant="persistent"
                slotProps={{
                    paper: {
                        sx: {
                            backgroundColor: "#0F0F0F",
                            color : "white",
                            width : "350px"
                        }
                    }
                }}
            >
                Hello
            </Drawer>
        </>
    )
}

export default Sidenav