
const MainCard = ({img, onHeartClick, alreadyFavorite}) => {
    const heartIcon = alreadyFavorite ? "💖" : "🤍"
    return (
        <div className="main-card" /*onClick={sayHi}*/ > {/* class => className으로 변경해줘야 react에서 인식 */}
        <img src={img} alt="고양이" width="400" />
        <button
            onClick={onHeartClick}
        >{heartIcon}</button>
        </div>
    );
};

export default MainCard;