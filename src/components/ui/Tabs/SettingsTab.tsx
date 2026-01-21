import { useDispatch, useSelector } from "react-redux"
import Button from "../Button"
import DividerWithText from "../DividerWithText"
import OrbitInput from "../OrbitInput"
import { type AppDispatch, type RootState } from "../../../redux/store"
import { hexToNumber, numberToHex } from "../../../utils/conversion"
import type { ChangeEvent } from "react"
import { setSettings } from "../../../redux/slices/settingsSlice"

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

  return (
    <div className=" max-w-full p-2">
      <div className="flex items-center justify-center gap-2 mt-3 mb-3">
        <Button text={"Upload Model"} width="100%" clickHandler={onUploadClick} />
        <Button text={"Walk"} width="100%" clickHandler={toggleWalkMode} />
      </div>
      <DividerWithText text={"General"} />
      <div className="mt-3 flex flex-col gap-3">
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
    </div>
  )
}

export default SettingsTab