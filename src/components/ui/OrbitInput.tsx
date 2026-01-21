import type { ChangeEvent } from "react"

interface InputProps {
    type ?: string,
    width ?: string,
    height ?: string,
    placeholder ?: string
    value ?: string
    onChangeHandler ?: (e: ChangeEvent<HTMLInputElement>) => void 
}

const OrbitInput: React.FC<InputProps> = ({ type = "text", width = "auto", height = "auto", placeholder = "", value = "", onChangeHandler }) => {
    return (
        <input
            type={type}
            value={type == "number" ? Number(value) : value}
            style={{
                width : width,
                height : height,
            }}
            className="bg-[#1D3049] border-0 rounded-xs"
            placeholder={placeholder}
            onChange={onChangeHandler && onChangeHandler}
        />
    )
}

export default OrbitInput