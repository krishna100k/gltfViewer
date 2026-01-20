import { CircularProgress } from "@mui/material"

const Loader = () => {
    return (
        <>
            <div style={{
                width : "100%",
                height : "100%",
                position : "absolute",
                zIndex : "100",
                display : "flex",
                justifyContent : "center",
                alignItems : "center"
            }}>
                <CircularProgress sx={{color : "#24436C"}} />
            </div>
        </>
    )
}

export default Loader