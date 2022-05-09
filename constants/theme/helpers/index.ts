/**
 * @function
 * @name px
 * @description returns convert pt to pixel
 * @param pt
 * @returns {function(*): string}
 */
export const ptToPx = (pt: number) => `${Math.round(pt * 0.95)}px`;
