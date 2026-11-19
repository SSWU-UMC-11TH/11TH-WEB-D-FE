import { useState } from 'react'
import { cn } from '../../utils/cn'

const Pagination = () => {
    const [currentPage, setCurrentPage] = useState(1)

    return (
        <div className="mt-[40px] flex items-center justify-center gap-[8px]">
            {[1, 2, 3, 4, 5].map((page) => (
                <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                        'flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-[8px] border-0 p-0 text-[14px] font-medium',
                        currentPage === page
                            ? 'bg-[#2563EB] text-white'
                            : 'bg-transparent text-[#969DA8]',
                    )}
                >
                    {page}
                </button>
            ))}
        </div>
    )
}

export default Pagination