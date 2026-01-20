interface ButtonProps {
    text: string
    width ?: string
    height ?: string
    padding ?: string
    clickHandler : () => void
}

const Button: React.FC<ButtonProps> = ({ text, width = "auto", height = "auto", padding = "5px 7px 5px 7px", clickHandler}) => {
    
    return (
        <button style={{
            width : width,
            height : height,
            padding : padding,
        }}
        className="bg-[#1D3049] hover:bg-[#24436C] cursor-pointer transition-all duration-150"
        onClick={clickHandler}
        >
            {text}
        </button>
    )
}

export default Button