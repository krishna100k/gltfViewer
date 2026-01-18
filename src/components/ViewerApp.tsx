import { useEffect, useRef, useState, type ChangeEvent } from "react"
import { Viewer } from "../three/viewer";
import { Constants } from "../utils/constants";


const ViewerApp = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<Viewer>(null);
    const [speed, setSpeed] = useState<number>(Constants.speed);

    useEffect(() => {
        if (!viewerRef.current && containerRef.current) {
            viewerRef.current = new Viewer(containerRef.current);
        }
    }, [])

    const toggleWalkMode = () => {
        viewerRef.current?.toggleWalkMode();
    }

    const onInputSpeedChange = (e : ChangeEvent<HTMLInputElement>) => {
        const speed = Number(e.target.value)
        setSpeed(speed);
        viewerRef.current?.setInputSpeed(speed);
    }

    const onModelUpload = (e : ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(!files) return;

        const file = files[0];
        const url = URL.createObjectURL(file);
        const splittedFileName = file?.name.split('.')
        const ext = splittedFileName[splittedFileName.length - 1];

        viewerRef.current?.loadModel(url, ext);
    }

    return (
        <>
            <button style={{position : 'absolute'}} onClick={toggleWalkMode}>Walk</button>
            <input min={1} value={speed} onChange={onInputSpeedChange} type="number" style={{position : 'absolute', left : "4rem"}} />
            <input type="file" style={{position : 'absolute', left : "15rem"}} onChange={onModelUpload} />
            <div ref={containerRef} style={{ width: '100%', height: '100%' }}></div>
        </>
    )
}

export default ViewerApp