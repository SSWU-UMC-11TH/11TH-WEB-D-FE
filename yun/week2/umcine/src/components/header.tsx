import '../styles/header.css'

const header = () => {
    return (
        <div className="header_wrap">
            <div className="header_left">
                <div className="movie_box">
                    <img src="/icons/movie-icons/movie.svg" alt="" />
                </div>
                <p className='header_l_txt1'>UMCine</p>
                <p className='header_l_txt2'>영화</p>
                <p className='header_l_txt3'>검색</p>
                <p className='header_l_txt3'>내 정보</p>
            </div>
            <div className="header_right">
                <div className="search_icon">
                    <img src="/icons/movie-icons/search.svg" alt="" />
                </div>
                <p className='header_r_txt'>마이페이지</p>
            </div>
        </div>
    )
}

export default header
