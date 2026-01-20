import Button from "../Button"

interface SettingsTabProps {
    toggleWalkMode: () => void
    onUploadClick : () => void
}

const SettingsTab : React.FC<SettingsTabProps> = ({toggleWalkMode, onUploadClick}) => {
  return (
    <div>
      <div className="flex items-center justify-center  gap-2">
        <Button text={"Upload Model"} width="100%" clickHandler={onUploadClick} />
        <Button text={"Walk"} width="100%" clickHandler={toggleWalkMode} />
      </div>
    </div>
  )
}

export default SettingsTab