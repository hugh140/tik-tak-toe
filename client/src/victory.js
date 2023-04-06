const victoryPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

export default function victory(symbol, matrix) {
    for (const pattern of victoryPatterns) {
        const [a,b,c] = pattern
        if (matrix[a] === symbol &&
            matrix[b] === symbol &&
            matrix[c] === symbol) 
            return true
    }
    const undefinedCells = matrix.filter(cell => {
        return cell === null
    })
    if (undefinedCells.length === 0) return null

    return false
}