
export const validateStringLength = (label: string, value: string) => {
    if (value.trim().length === 0) {
        alert(`${label} cannot be empty`)
        return false
    }

    return true
}