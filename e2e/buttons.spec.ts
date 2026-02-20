import { test, expect } from '@playwright/test';

// Reference CSS / design tokens (mapped to computed rgb)
const REF = {
  // arbor-btn base
  display: 'inline-flex',
  cursor: 'pointer',
  maxWidth: '270px',
  borderRadius: '4px',
  pointerEvents: 'auto',
  // grey_lightest / grey-100
  greyBg: 'rgb(239, 239, 239)',
  // grey_darkest / grey-800
  greyText: 'rgb(59, 59, 59)',
  // green / brand-600
  greenBg: 'rgb(14, 138, 14)',
  // red / destructive-500
  redBg: 'rgb(201, 50, 50)',
  // orange / warning-500
  orangeBg: 'rgb(228, 114, 13)',
  white: 'rgb(255, 255, 255)',
  // disabled
  disabledOpacity: '0.5',
  disabledCursor: 'not-allowed',
} as const;

test.describe('Buttons', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Buttons' }).click();
    await expect(page.getByTestId('buttons-active-primary-row')).toBeVisible();
  });

  test('first row (Active primary) matches reference CSS', async ({ page }) => {
    const row = page.getByTestId('buttons-active-primary-row');
    const btnGrey = row.getByRole('button', { name: 'Button grey' });
    const btnOrange = row.getByRole('button', { name: 'Button orange (confirmation)' });
    const btnGreen = row.getByRole('button', { name: 'Button green' });
    const btnRed = row.getByRole('button', { name: 'Button red (confirmation)' });

    // Base .arbor-btn: cursor, display (inline-flex can compute as flex in some envs), max-width, border-radius, pointer-events
    const display = await btnGrey.evaluate((el) => getComputedStyle(el).display);
    expect(display === 'inline-flex' || display === 'flex').toBeTruthy();
    await expect(btnGrey).toHaveCSS('cursor', REF.cursor);
    await expect(btnGrey).toHaveCSS('max-width', REF.maxWidth);
    await expect(btnGrey).toHaveCSS('border-radius', REF.borderRadius);
    await expect(btnGrey).toHaveCSS('pointer-events', REF.pointerEvents);

    // .arbor-btn default (grey): grey_lightest bg, grey_darkest text
    await expect(btnGrey).toHaveCSS('background-color', REF.greyBg);
    await expect(btnGrey).toHaveCSS('color', REF.greyText);

    // .arbor-btn-orange: orange bg, white text
    await expect(btnOrange).toHaveCSS('background-color', REF.orangeBg);
    await expect(btnOrange).toHaveCSS('color', REF.white);

    // .arbor-btn-green: green bg, white text
    await expect(btnGreen).toHaveCSS('background-color', REF.greenBg);
    await expect(btnGreen).toHaveCSS('color', REF.white);

    // .arbor-btn-red: red bg, white text
    await expect(btnRed).toHaveCSS('background-color', REF.redBg);
    await expect(btnRed).toHaveCSS('color', REF.white);
  });

  test('buttons have 4px rounded corners', async ({ page }) => {
    const row = page.getByTestId('buttons-active-primary-row');
    const btnGrey = row.getByRole('button', { name: 'Button grey' });
    await expect(btnGrey).toHaveCSS('border-radius', REF.borderRadius);
  });

  test('disabled buttons match reference (opacity 0.5, cursor not-allowed)', async ({ page }) => {
    const row = page.getByTestId('buttons-disabled-row');
    const disabledGrey = row.getByRole('button', { name: 'Button grey' });
    await expect(disabledGrey).toHaveCSS('opacity', REF.disabledOpacity);
    await expect(disabledGrey).toHaveCSS('cursor', REF.disabledCursor);
  });

  test('first row of primary buttons matches screenshot', async ({ page }) => {
    const row = page.getByTestId('buttons-active-primary-row');
    await expect(row).toHaveScreenshot('buttons-active-primary-row.png');
  });
});
