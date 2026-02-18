
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
    // Schedule: 0=Sun, 1=Mon, ..., 6=Sat
    const schedule = {
        1: [ // Monday
            { start: 9.0, end: 10.0, name: 'GEC 103 (Lec 5)' },
            { start: 11.0, end: 14.0, name: 'ITEC 103 (Lab 3)' },
            { start: 14.0, end: 15.0, name: 'GEC 105 (Lec 9)' }
        ],
        2: [ // Tuesday
            { start: 7.0, end: 8.0, name: 'ITEC 103 (Lec 10)' },
            { start: 8.0, end: 10.0, name: 'GEC 103 (Lec 8 & 11)' },
            { start: 11.0, end: 12.0, name: 'CMSC 101 (Lec 11)' },
            { start: 12.5, end: 14.0, name: 'PE 2 (Gym)' },
            { start: 15.0, end: 16.0, name: 'GEC 104 (Lec 5)' }
        ],
        3: [ // Wednesday
            { start: 9.0, end: 10.0, name: 'FILDIS (Lec 11)' },
            { start: 11.0, end: 12.0, name: 'CMSC 101 (Lec 11)' },
            { start: 12.0, end: 14.0, name: 'GEC 105 (Lec 11)' },
            { start: 15.0, end: 17.0, name: 'GEC 104 (Lec 12)' }
        ],
        4: [ // Thursday
            { start: 11.0, end: 12.0, name: 'CMSC 101 (Lec 9)' },
            { start: 12.0, end: 14.0, name: 'FILDIS (Lec 11)' },
            { start: 15.0, end: 16.0, name: 'ITEC 103 (Lec 10)' }
        ]
    };

    const hour = date.getHours() + date.getMinutes() / 60;
    const day = date.getDay(); // 0 = Sunday, 6 = Saturday

    if (day === 0 || day === 6 || !schedule[day]) return 'Weekend / No Class';

    const todayClasses = schedule[day];
    const currentClass = todayClasses.find(c => hour >= c.start && hour < c.end);

    if (currentClass) return currentClass.name;

    // Check if it's during the school day (7am - 6pm) but no class
    if (hour >= 7 && hour < 18) return 'Free Cut / Break';

    return 'Dismissed';
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
