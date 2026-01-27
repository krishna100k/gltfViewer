import { exampleModelData } from "../../../utils/exampleModelsData"
import OrbitCard from "../OrbitCard"

interface IDefaultModelsProps{
  loadModel : (url: string, ext: string, setLoadingModelState: (loading: boolean) => void) => void
  setLoadingModelState: (loading: boolean) => void
}

const DefaultModels : React.FC<IDefaultModelsProps> = ({loadModel, setLoadingModelState}) => {

  const handleCardClick = (url : string) => {
    const splittedFileName = url.split('.');
    const ext = splittedFileName[splittedFileName.length - 1];

    setLoadingModelState(true)
    loadModel(url, ext, setLoadingModelState);
  }

  return (
    <div className="p-2 flex flex-col justify-center gap-2">
      {
        exampleModelData.map((data, i) => {
          return <OrbitCard key={i} img={data.image} onCardClick = {() => handleCardClick(data.path)} />
        })
      }
    </div>
  )
}

export default DefaultModels