import { useDispatch, useSelector } from "react-redux"
import Button from "../Button"
import DividerWithText from "../DividerWithText"
import OrbitInput from "../OrbitInput"
import { type AppDispatch, type RootState } from "../../../redux/store"
import { hexToNumber, numberToHex } from "../../../utils/conversion"
import { setSettings } from "../../../redux/slices/settingsSlice"
import type { ChangeEvent } from "react"

interface SettingsTabProps {
  toggleWalkMode: () => void
  onUploadClick: () => void
}

const SettingsTab: React.FC<SettingsTabProps> = ({ toggleWalkMode, onUploadClick }) => {
  const settings = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch<AppDispatch>();

  const onWalkSpeedChange = (e : ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setSettings({speed : Number(value)}))
  }

  const onBackgroundColorChange = (e : ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setSettings({backgroundColor : hexToNumber(value)}))
  }

  const onSelectionColorChange = (e : ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setSettings({selectionColor : hexToNumber(value)}))
  }

  const onCameraPositionChange = (x: null | string, y: null | string, z: null | string) => {
    
    const camera = {
      position: { ...settings.camera.position },
      target: { ...settings.camera.target },
      near: settings.camera.near,
      far: settings.camera.far,
      fov: settings.camera.fov
    };

    if (x) camera.position.x = Number(x);
    if (y) camera.position.y = Number(y);
    if (z) camera.position.z = Number(z);

    dispatch(setSettings({ camera: camera }));
  }

  const onCameraTargetChange = (x: null | string, y: null | string, z: null | string) => {
    
    const camera = {
      position: { ...settings.camera.position },
      target: { ...settings.camera.target },
      near: settings.camera.near,
      far: settings.camera.far,
      fov: settings.camera.fov
    };

    if (x) camera.target.x = Number(x);
    if (y) camera.target.y = Number(y);
    if (z) camera.target.z = Number(z);

    dispatch(setSettings({ camera: camera }));
  }

  const onCameraNearFarChange = (near: null | string, far: null | string) => {
    const camera = {
      position: { ...settings.camera.position },
      target: { ...settings.camera.target },
      near: settings.camera.near,
      far: settings.camera.far,
      fov: settings.camera.fov
    };

    if (near) camera.near = Number(near);
    if (far) camera.far = Number(far);

    dispatch(setSettings({ camera: camera }));
  }

  const onCameraFOVChange = (fov : string) => {
    const camera = {
      position: { ...settings.camera.position },
      target: { ...settings.camera.target },
      near: settings.camera.near,
      far: settings.camera.far,
      fov: Number(fov)
    };

    dispatch(setSettings({ camera: camera }));
  }

  return (
    <div className=" max-w-full p-2">
      <div className="flex items-center justify-center gap-2 mt-3 mb-3">
        <Button text={"Upload Model"} width="100%" clickHandler={onUploadClick} />
        <Button text={"Walk"} width="100%" clickHandler={toggleWalkMode} />
      </div>
      <DividerWithText text={"General"} />
      <div className="mt-3 mb-3 flex flex-col gap-3">
        <div className="flex justify-start items-center gap-3">
          <div className="w-[70%]">
            <OrbitInput type="number" height="32px" width="100%" value={settings.speed.toString()} onChangeHandler={onWalkSpeedChange} />
          </div>
          <p>Walk Speed</p>
        </div>
        <div className="flex justify-start items-center gap-3">
          <div className="w-[70%]">
            <OrbitInput type="color" height="32px" width="100%" value={numberToHex(settings.backgroundColor)} onChangeHandler={onBackgroundColorChange} />
          </div>
          <p>Background</p>
        </div>
        <div className="flex justify-start items-center gap-3">
          <div className="w-[70%]">
            <OrbitInput type="color" height="32px" width="100%" value={numberToHex(settings.selectionColor)} onChangeHandler={onSelectionColorChange} />
          </div>
          <p>Selection</p>
        </div>
      </div>
      <DividerWithText text={"Camera"} />
      <div className="flex flex-col gap-3 mt-3 mb-3">
        <div className="flex items-start gap-3">
          <div className="w-[70%] flex gap-2">
            <OrbitInput type="number" height="32px" width="100%" value={settings.camera.position.x.toString()} onChangeHandler={(e) => onCameraPositionChange(e.target.value, null, null)} />
            <OrbitInput type="number" height="32px" width="100%" value={settings.camera.position.y.toString()} onChangeHandler={(e) => onCameraPositionChange(null, e.target.value, null)} />
            <OrbitInput type="number" height="32px" width="100%" value={settings.camera.position.z.toString()} onChangeHandler={(e) => onCameraPositionChange(null, null, e.target.value)} />
          </div>
          <p>Position</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-[70%] flex gap-2">
            <OrbitInput type="number" height="32px" width="100%" value={settings.camera.target.x.toString()} onChangeHandler={(e) => onCameraTargetChange(e.target.value, null, null)} />
            <OrbitInput type="number" height="32px" width="100%" value={settings.camera.target.y.toString()} onChangeHandler={(e) => onCameraTargetChange(null, e.target.value, null)} />
            <OrbitInput type="number" height="32px" width="100%" value={settings.camera.target.z.toString()} onChangeHandler={(e) => onCameraTargetChange(null, null, e.target.value)} />
          </div>
          <p>Target</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-[70%] flex gap-2">
            <OrbitInput type="number" height="32px" width="100%" value={settings.camera.near.toString()} onChangeHandler={(e) => onCameraNearFarChange(e.target.value, null)} />
            <OrbitInput type="number" height="32px" width="100%" value={settings.camera.far.toString()} onChangeHandler={(e) => onCameraNearFarChange(null, e.target.value)} />
          </div>
          <p>Near / Far</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-[70%] flex gap-2">
            <OrbitInput type="number" height="32px" width="100%" value={settings.camera.fov.toString()} onChangeHandler={(e) => onCameraFOVChange(e.target.value)} />
          </div>
          <p>FOV</p>
        </div>
      </div>
      
      {settings.selectedObject.id &&
        <>
          <DividerWithText text={"Selected Object"} />
          <div className="flex flex-col gap-3 mt-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-[70%] flex gap-2">
                <OrbitInput type="text" height="32px" width="100%" value={settings.selectedObject.id} />
              </div>
              <p>Id</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-[70%] flex gap-2">
                <OrbitInput type="number" height="32px" width="100%" value={settings.selectedObject.position.x.toString()} onChangeHandler={(e) => onCameraPositionChange(e.target.value, null, null)} />
                <OrbitInput type="number" height="32px" width="100%" value={settings.selectedObject.position.y.toString()} onChangeHandler={(e) => onCameraPositionChange(null, e.target.value, null)} />
                <OrbitInput type="number" height="32px" width="100%" value={settings.selectedObject.position.z.toString()} onChangeHandler={(e) => onCameraPositionChange(null, null, e.target.value)} />
              </div>
              <p>Position</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[70%] flex gap-2">
                <OrbitInput type="number" height="32px" width="100%" value={settings.selectedObject.rotation.x.toString()} onChangeHandler={(e) => onCameraTargetChange(e.target.value, null, null)} />
                <OrbitInput type="number" height="32px" width="100%" value={settings.selectedObject.rotation.y.toString()} onChangeHandler={(e) => onCameraTargetChange(null, e.target.value, null)} />
                <OrbitInput type="number" height="32px" width="100%" value={settings.selectedObject.rotation.z.toString()} onChangeHandler={(e) => onCameraTargetChange(null, null, e.target.value)} />
              </div>
              <p>Rotation</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[70%] flex gap-2">
                <OrbitInput type="number" height="32px" width="100%" value={settings.selectedObject.scale.x.toString()} onChangeHandler={(e) => onCameraTargetChange(e.target.value, null, null)} />
                <OrbitInput type="number" height="32px" width="100%" value={settings.selectedObject.scale.y.toString()} onChangeHandler={(e) => onCameraTargetChange(null, e.target.value, null)} />
                <OrbitInput type="number" height="32px" width="100%" value={settings.selectedObject.scale.z.toString()} onChangeHandler={(e) => onCameraTargetChange(null, null, e.target.value)} />
              </div>
              <p>Scale</p>
            </div>
          </div>
        </>}

    </div>
  )
}

export default SettingsTab