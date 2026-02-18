import { writable } from 'svelte/store';
import Papa from 'papaparse';

export const announcements = writable([]);
export const financeLedger = writable([]);
export const academics = writable([]);

// Mock Data
const MOCK_ANNOUNCEMENTS = [
    {
        id: '1',
        title: 'FILDIS Performance Task',
        message: 'Be ready to sing your respective songs.',
        urgency_level: 'Medium',
        expiry_date: '2026-02-19'
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
        professor: 'Mr. Anthony Dorado',
        drive_link_reviewers: 'https://drive.google.com/drive/u/0/my-drive', // Placeholder
        next_quiz_date: null
    },
    {
        subject_code: 'CMSC101',
        professor: 'Ms. Kristine Arida',
        drive_link_reviewers: 'https://drive.google.com/drive/u/0/my-drive', // Placeholder
        next_quiz_date: null
    },
    {
        subject_code: 'GEC103',
        professor: 'Mr. Eugene Lopez',
        drive_link_reviewers: 'https://drive.google.com/drive/u/0/my-drive', // Placeholder
        next_quiz_date: null
    },
    {
        subject_code: 'GEC104',
        professor: 'Ms. Arlene Madrio',
        drive_link_reviewers: 'https://drive.google.com/drive/u/0/my-drive', // Placeholder
        next_quiz_date: null
    },
    {
        subject_code: 'GEC105',
        professor: 'Ms. Grace Suarez',
        drive_link_reviewers: 'https://drive.google.com/drive/u/0/my-drive', // Placeholder
        next_quiz_date: null
    },
    {
        subject_code: 'FILDIS',
        professor: 'Ms. Janine Balinsayo',
        drive_link_reviewers: 'https://drive.google.com/drive/u/0/my-drive', 
        next_quiz_date: null
    },
    {
        subject_code: 'PATHFIT2',
        professor: 'Mr. Renan Sael', 
        drive_link_reviewers: 'https://drive.google.com/drive/u/0/my-drive',
        next_quiz_date: null
    },
    {
        subject_code: 'NSTP2',
        professor: 'Prof. XYZ', 
        drive_link_reviewers: 'https://drive.google.com/drive/u/0/my-drive',
        next_quiz_date: null
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
