import { test, expect } from '@playwright/test';

/**
 * Filter Panel: cross-reference with design screenshots.
 * - Collapsed: filter icon, preview text (e.g. "Should Reload No Date 20th Feb 2026. Students who are Female."), "Change" (green, with pencil icon).
 * - Expanded: Details (optional), "Editing filter...", "Display settings...", Cancel, Apply (green, with pencil icon).
 */
test.describe('Filter Panel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Filter Panel' }).click();
    await expect(page.getByTestId('filter-panel-preview')).toBeVisible();
  });

  test('collapsed state shows preview and Change action', async ({ page }) => {
    const preview = page.getByTestId('filter-panel-preview');
    await expect(preview).toBeVisible();
    await expect(preview).toContainText('Should Reload No');
    await expect(preview).toContainText('Date 20th Feb 2026');
    await expect(preview).toContainText('Students who are Female');
    await expect(preview.getByText('Change')).toBeVisible();
    await expect(page.getByTestId('filter-panel-expanded')).not.toBeVisible();
  });

  test('clicking preview expands to show filter and display fields', async ({ page }) => {
    await page.getByTestId('filter-panel-preview').click();
    await expect(page.getByTestId('filter-panel-expanded')).toBeVisible();
    await expect(page.getByText('Editing filter...')).toBeVisible();
    await expect(page.getByText('Display settings...')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Apply' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Apply' }).locator('svg')).toBeVisible();
  });

  test('expanded state has Apply button with pencil icon and form fields', async ({ page }) => {
    await page.getByTestId('filter-panel-preview').click();
    const applyBtn = page.getByRole('button', { name: 'Apply' });
    await expect(applyBtn).toBeVisible();
    await expect(applyBtn).toHaveAttribute('type', 'button');
    await expect(page.locator('.ds-filter-panel__filter-fields')).toBeVisible();
    await expect(page.getByLabel('Date')).toBeVisible();
    await expect(page.getByLabel('Students who are...')).toBeVisible();
    await expect(page.getByText('Should Reload')).toBeVisible();
    await expect(page.getByText('First letter')).toBeVisible();
  });

  test('Cancel collapses the panel', async ({ page }) => {
    await page.getByTestId('filter-panel-preview').click();
    await expect(page.getByTestId('filter-panel-expanded')).toBeVisible();
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.getByTestId('filter-panel-preview')).toBeVisible();
    await expect(page.getByTestId('filter-panel-expanded')).not.toBeVisible();
  });

  test('Apply collapses the panel', async ({ page }) => {
    await page.getByTestId('filter-panel-preview').click();
    await expect(page.getByTestId('filter-panel-expanded')).toBeVisible();
    await page.getByRole('button', { name: 'Apply' }).click();
    await expect(page.getByTestId('filter-panel-preview')).toBeVisible();
    await expect(page.getByTestId('filter-panel-expanded')).not.toBeVisible();
  });

  test('visual: collapsed state matches design', async ({ page }) => {
    await expect(page.getByTestId('filter-panel-preview')).toHaveScreenshot('filter-panel-collapsed.png');
  });

  test('visual: expanded state matches design', async ({ page }) => {
    await page.getByTestId('filter-panel-preview').click();
    await expect(page.getByTestId('filter-panel-expanded')).toBeVisible();
    await expect(page.getByTestId('filter-panel-expanded')).toHaveScreenshot('filter-panel-expanded.png');
  });
});
