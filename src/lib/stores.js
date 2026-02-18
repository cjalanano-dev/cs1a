import { writable } from 'svelte/store';
import Papa from 'papaparse';

export const announcements = writable([]);
export const financeLedger = writable([]);
export const academics = writable([]);

const SHEET_URLS = {
    announcements: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQj24k7rOeyup-ojTJbIz51LHpIfgaMqscrzbh0KVEM53tuvpyf2MDsSZGpnMLW74IOvTldKQRSvOPq/pub?gid=0&single=true&output=csv',
    finances: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQj24k7rOeyup-ojTJbIz51LHpIfgaMqscrzbh0KVEM53tuvpyf2MDsSZGpnMLW74IOvTldKQRSvOPq/pub?gid=1253685575&single=true&output=csv',
    academics: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQj24k7rOeyup-ojTJbIz51LHpIfgaMqscrzbh0KVEM53tuvpyf2MDsSZGpnMLW74IOvTldKQRSvOPq/pub?gid=1081493318&single=true&output=csv'
};

async function fetchSheetData(url) {
    if (!url || url.includes('PASTE_YOUR')) return [];

    return new Promise((resolve) => {
        Papa.parse(url, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                resolve(results.data);
            },
            error: (err) => {
                console.error('CSV Parse Error:', err);
                resolve([]);
            }
        });
    });
}

export async function fetchAllData() {
    console.log('Fetching class data...');

    try {
        const [announcementsData, financeData, academicsData] = await Promise.all([
            fetchSheetData(SHEET_URLS.announcements),
            fetchSheetData(SHEET_URLS.finances),
            fetchSheetData(SHEET_URLS.academics)
        ]);

        announcements.set(announcementsData);

        const cleanFinance = financeData.map(item => ({
            ...item,
            amount: parseFloat(item.amount.replace(/,/g, '')) || 0 // Handle "1,000" string format
        }));
        financeLedger.set(cleanFinance);

        academics.set(academicsData);

        console.log('Data updated successfully');

    } catch (error) {
        console.error('Failed to sync with Google Sheets:', error);
    }
}