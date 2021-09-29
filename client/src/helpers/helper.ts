
export const validateStringLength = (label: string, value: string) => {
    if (value.trim().length === 0) {
        return false
    }

    return true
}