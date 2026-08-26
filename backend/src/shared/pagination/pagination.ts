
export interface PaginationInput {
    page: number,
    limit: number,
}

export interface PaginationMeta {
    page: number, 
    limit: number, 
    totalItems: number, 
    totalPages: number
}

export const getPagination = ({
    page, 
    limit,
}: PaginationInput ) => {
    return {
        skip: (page -1) * limit,
        limit
    }
}

export const buildPaginationMeta = (
    page: number,
    limit: number, 
    totalItems: number
): PaginationMeta => {
    return {
        page, 
        limit, 
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
    }
}