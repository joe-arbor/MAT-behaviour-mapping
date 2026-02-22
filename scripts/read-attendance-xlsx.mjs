import * as XLSX from 'xlsx';
import { readFileSync } from 'fs';

const path = process.argv[2] || '/Users/joecarter/Downloads/2026-02-21 Daily Attendance.xlsx';
const buf = readFileSync(path);
const wb = XLSX.read(buf, { type: 'buffer' });
const firstSheet = wb.SheetNames[0];
const ws = wb.Sheets[firstSheet];
const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
console.log(JSON.stringify(data, null, 2));
