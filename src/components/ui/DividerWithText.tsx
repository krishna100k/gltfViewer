interface DividerWithTextProps{
    text : string
}

const DividerWithText : React.FC<DividerWithTextProps> = ({text}) => {
    return (
        <div className="w-full flex justify-center items-center gap-3">
            <div className="bg-[#38383F] w-25 h-[2.5px]"></div>
            <p>{text}</p>
            <div className="bg-[#38383F] w-100 h-[2.5px]"></div>
        </div>
    )
}

export default DividerWithText