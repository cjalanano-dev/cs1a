
/**
 * Formats a number as Philippine Peso currency.
 * @param {number} amount
 * @returns {string}
 */
export function formatCurrency(amount) {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 2
    }).format(amount);
}

/**
 * Returns the current class status based on the time and day.
 * @param {Date} date
 * @returns {string}
 */
export function getClassStatus(date) {
    const hour = date.getHours();
    const day = date.getDay(); // 0 = Sunday, 6 = Saturday

    if (day === 0 || day === 6) return 'Weekend Break';

    if (hour >= 12 && hour < 13) return 'Lunch Break';
    if (hour >= 7 && hour < 17) return 'Class in Session';
    return 'Free Cut / Off-Hours';
}

/**
 * Checks if a date string is in the past.
 * @param {string} dateStr - YYYY-MM-DD
 * @returns {boolean}
 */
export function isExpired(dateStr) {
    const safeDate = dateStr ? new Date(dateStr) : new Date(8640000000000000); // Far future if null
    return safeDate < new Date();
}

/**
 * Returns a relative time string (e.g., "in 2 days", "tomorrow").
 * @param {string} dateStr
 * @returns {string}
 */
export function timeUntil(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Past due';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `in ${diffDays} days`;
}
