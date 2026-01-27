interface IOrbitCardProps {
    width?: string;
    height?: string;
    img : string
    onCardClick : () => void
}

const OrbitCard: React.FC<IOrbitCardProps> = (props) => {
    const { width = "auto", height = "10rem", img, onCardClick } = props;

    return (
        <div
            style={{ 
                width: width,
                height : height
             }}
             className=" cursor-pointer relative"
             onClick={onCardClick}
             >
            <div className="hover:bg-black/10 absolute w-full h-full transition-all duration-200 hover:border border-[#24436C]"></div>
            
            <img
                src={img}
                alt="Example Model Image"
                style={{
                    height : height,
                    width : '100%',
                    objectFit : "cover",
                }}
            />
        </div>
    )
}

export default OrbitCard