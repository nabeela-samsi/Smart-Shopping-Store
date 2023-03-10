import { useState } from "react"
import { IProduct } from "../type/Product"

export const usePagination = (data: IProduct[], perPageLimit: number) => {
    const [currentPage, setCurrentPage] = useState(1)
    const maxPages = Math.ceil(data.length / perPageLimit)
    const currentPageData = (): IProduct[] => {
        const start = (currentPage - 1) * perPageLimit
        const end = start + perPageLimit
        return data.slice(start, end)
    }
    const moveNextPage = () => {
        setCurrentPage(currentPage => Math.min(currentPage + 1, maxPages))
    }
    const movePreviousPage = () => {
        setCurrentPage(currentPage => Math.max(currentPage - 1, 1))
    }
    const jumpToPage = (page: number) => {
        const pageNumber = Math.max(1, page)
        setCurrentPage(_ => Math.min(pageNumber, maxPages))
    }
    return {
        moveNextPage,
        movePreviousPage,
        jumpToPage,
        currentPageData,
        currentPage,
        maxPages
    }
}