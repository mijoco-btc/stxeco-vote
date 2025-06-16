import { test, expect } from 'vitest';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { PDFDocument } from 'pdf-lib';
import { bigmarketDao } from './links';

// List of GitBook URLs to export
const gitBookPages = bigmarketDao;

// Test suite
test('Export GitBook pages to PDF', async () => {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();

	// Ensure the exports directory exists
	const exportDir = path.resolve('./exports');
	if (!fs.existsSync(exportDir)) {
		fs.mkdirSync(exportDir, { recursive: true });
		console.log(`Created directory: ${exportDir}`);
	}

	const combinedPDFPath = path.join(exportDir, 'bigmarketDao.pdf');

	// Create a new PDF document
	const combinedPdfDoc = await PDFDocument.create();

	for (let i = 0; i < gitBookPages.length; i++) {
		const url = gitBookPages[i];
		console.log(`Navigating to: ${url}`);

		await page.goto(url, { waitUntil: 'networkidle2' });

		// Generate PDF buffer for current page
		const pdfBuffer = await page.pdf({
			format: 'A4',
			printBackground: true
		});

		// Load the buffer as a PDFDocument and copy its pages
		const currentPdfDoc = await PDFDocument.load(pdfBuffer);
		const copiedPages = await combinedPdfDoc.copyPages(currentPdfDoc, currentPdfDoc.getPageIndices());

		copiedPages.forEach((page) => combinedPdfDoc.addPage(page));
		console.log(`Page ${i + 1} added to combined PDF.`);
	}

	// Write the final combined PDF to a file
	const combinedPdfBytes = await combinedPdfDoc.save();
	fs.writeFileSync(combinedPDFPath, combinedPdfBytes);

	await browser.close();
	console.log(`Combined PDF saved to: ${combinedPDFPath}`);
	expect(fs.existsSync(combinedPDFPath)).toBeTruthy();
}, 120000);
