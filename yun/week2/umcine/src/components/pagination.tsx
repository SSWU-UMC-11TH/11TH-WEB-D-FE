import { useState } from 'react'
import '../styles/pagination.css'

const Pagination = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const pages = [1, 2, 3, 4, 5]

    return (
        <nav className="pagination" aria-label="페이지 이동">
            {pages.map((page) => (
                <button
                    key={page}
                    type="button"
                    className={`page_button ${currentPage === page ? 'page_active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </button>
            ))}
        </nav>
    )
}

export default Pagination
