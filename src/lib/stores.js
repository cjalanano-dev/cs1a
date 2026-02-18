import { writable } from 'svelte/store';
import Papa from 'papaparse';

export const announcements = writable([]);
export const financeLedger = writable([]);
export const academics = writable([]);

// Mock Data
const MOCK_ANNOUNCEMENTS = [
    {
        id: '1',
        title: 'CMSC101 Payment Due',
        message: 'Please pay ₱7 for the photocopying of handouts.',
        urgency_level: 'High',
        expiry_date: '2026-02-20'
    },
    {
        id: '2',
        title: 'No Class - ITEC103',
        message: 'Prof. Smith is attending a conference. Free cut!',
        urgency_level: 'Medium',
        expiry_date: '2026-02-19'
    },
    {
        id: '3',
        title: 'Welcome Party',
        message: 'CS Dept welcome party this Friday at the gym.',
        urgency_level: 'Low',
        expiry_date: '2026-02-25'
    }
];

const MOCK_FINANCE = [
    {
        date: '2026-02-15',
        transaction_name: 'Photocopying - CMSC101',
        category: 'Expense',
        amount: 150,
        receipt_url: '#'
    },
    {
        date: '2026-02-10',
        transaction_name: 'Class Funds Collection',
        category: 'Collection',
        amount: 5000,
        receipt_url: '#'
    },
    {
        date: '2026-02-18',
        transaction_name: 'Marker Pens for Whiteboard',
        category: 'Expense',
        amount: 230,
        receipt_url: '#'
    }
];

const MOCK_ACADEMICS = [
    {
        subject_code: 'ITEC103',
        professor: 'Prof. Ada Lovelace',
        drive_link_reviewers: 'https://drive.google.com/drive/u/0/my-drive', // Placeholder
        next_quiz_date: '2026-02-22'
    },
    {
        subject_code: 'CMSC101',
        professor: 'Prof. Alan Turing',
        drive_link_reviewers: 'https://drive.google.com/drive/u/0/my-drive', // Placeholder
        next_quiz_date: '2026-02-28'
    },
    {
        subject_code: 'MATH014',
        professor: 'Prof. Katherine Johnson',
        drive_link_reviewers: 'https://drive.google.com/drive/u/0/my-drive', // Placeholder
        next_quiz_date: '2026-03-05'
    }
];

/**
 * Fetches data from Google Sheets (or Mock Data for now).
 */
export async function fetchAllData() {
    // Simulate improved fetch time
    await new Promise(resolve => setTimeout(resolve, 500));

    announcements.set(MOCK_ANNOUNCEMENTS);
    financeLedger.set(MOCK_FINANCE);
    academics.set(MOCK_ACADEMICS);

    // TODO: Replace with real CSV fetching when URL is provided
    /*
    Papa.parse(sheetUrl, {
        download: true,
        header: true,
        complete: (results) => {
            store.set(results.data);
        }
    });
    */
}
