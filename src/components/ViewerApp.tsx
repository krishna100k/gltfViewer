import { useEffect, useRef, useState, type ChangeEvent } from "react"
import { Viewer } from "../three/viewer";
import { configStore } from "../utils/configStore";
import Loader from "./ui/Loader";
import Sidenav from "./ui/Sidenav";


const ViewerApp = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<Viewer>(null);
    const [config, setConfig] = useState({...configStore});
    const [loadingModel, setLoadingModel] = useState<boolean>(false);

    const uploadFileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!viewerRef.current && containerRef.current) {
            viewerRef.current = new Viewer(containerRef.current);
        }
    }, [])

    useEffect(() => {
        if(!loadingModel){
            if(viewerRef.current){
                setConfig(() => {
                    return {...configStore}
                })
            } 
        }
    }, [loadingModel])

    const toggleWalkMode = () => {
        viewerRef.current?.toggleWalkMode();
    }

    const onInputSpeedChange = (e : ChangeEvent<HTMLInputElement>) => {
        const speed = Number(e.target.value);
        setConfig((prev) => {
            return {...prev, speed : speed}
        });
        configStore.speed = speed;
        viewerRef.current?.setInputSpeed(speed);
    }

    const onModelUpload = (e : ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(!files) return;

        const file = files[0];
        const url = URL.createObjectURL(file);
        const splittedFileName = file?.name.split('.');
        const ext = splittedFileName[splittedFileName.length - 1];

        setLoadingModel(true);
        viewerRef.current?.loadModel(url, ext, setLoadingModelState);
    }

    const setLoadingModelState = (loading : boolean) => {
        setLoadingModel(loading);
    }

    const onUploadClick = () => {
        uploadFileInputRef.current?.click();
    }

    return (
        <>
            {loadingModel && <Loader />} 
            <input min={1} value={configStore.speed} onChange={onInputSpeedChange} type="number" style={{position : 'absolute', left : "4rem"}} />
            <input ref={uploadFileInputRef} type="file" style={{position : 'absolute', left : "15rem", display : 'none'}} onChange={onModelUpload} />
            <Sidenav toggleWalkMode={toggleWalkMode} onUploadClick = {onUploadClick} />
            <div ref={containerRef} style={{
                width: "100%",
                height: "100%",
            }}>
            </div>
        </>
    )
}

export default ViewerApp