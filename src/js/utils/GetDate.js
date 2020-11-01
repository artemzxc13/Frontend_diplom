
export const getDate = (numOfDays) => {
    const rawDate = new Date(Date.now() - 24 * 3600 * 1000 * numOfDays);

    const stringCuttedDate = `${rawDate.getFullYear()}-${rawDate.getMonth() + 1}-${rawDate.getDate()}`;
    return stringCuttedDate;
};
