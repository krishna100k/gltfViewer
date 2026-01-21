import { useEffect, useRef, useState, type ChangeEvent } from "react"
import { Viewer } from "../three/viewer";
import Loader from "./ui/Loader";
import Sidenav from "./ui/Sidenav";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { setSettings } from "../redux/slices/settingsSlice";


const ViewerApp = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<Viewer>(null);
    const [loadingModel, setLoadingModel] = useState<boolean>(false);
    const uploadFileInputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (!viewerRef.current && containerRef.current) {
            viewerRef.current = new Viewer(containerRef.current);
        }
        return () => viewerRef.current?.dispose();
    }, [])


    const toggleWalkMode = () => {
        dispatch(setSettings({ sidenavOpen: false }));
        viewerRef.current?.toggleWalkMode();
    }

    const onModelUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const file = files[0];
        const url = URL.createObjectURL(file);
        const splittedFileName = file?.name.split('.');
        const ext = splittedFileName[splittedFileName.length - 1];

        setLoadingModel(true);
        viewerRef.current?.loadModel(url, ext, setLoadingModelState);
    }

    const setLoadingModelState = (loading: boolean) => {
        setLoadingModel(loading);
    }

    const onUploadClick = () => {
        uploadFileInputRef.current?.click();
    }

    return (
        <>
            {loadingModel && <Loader />}
            <input ref={uploadFileInputRef} type="file" style={{ position: 'absolute', left: "15rem", display: 'none' }} onChange={onModelUpload} />
            <Sidenav toggleWalkMode={toggleWalkMode} onUploadClick={onUploadClick} />
            <div ref={containerRef} style={{
                width: "100%",
                height: "100%",
            }}>
            </div>
        </>
    )
}

export default ViewerApp