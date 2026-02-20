import { test, expect } from '@playwright/test';

test.describe('Sections', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Surfaces' }).click();
    await page.getByRole('button', { name: 'Sections' }).click();
    await expect(page.getByRole('heading', { name: 'Sections', level: 2 })).toBeVisible();
  });

  test('page shows Sections heading and intro', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Sections', level: 2 })).toBeVisible();
    await expect(
      page.getByText('Sections are the main containers used throughout Arbor MIS', { exact: false })
    ).toBeVisible();
  });

  test('plain empty section shows title and empty message', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Plain (empty)', level: 3 })).toBeVisible();
    const plainSection = page
      .locator('.ds-section')
      .filter({ has: page.locator('.ds-section__title').getByText('Plain', { exact: true }) })
      .filter({ has: page.getByText('no data found') })
      .first();
    await expect(plainSection).toBeVisible();
    await expect(plainSection.getByText('no data found')).toBeVisible();
  });

  test('plain with child section has Lorem ipsum text', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Plain with a child', level: 3 })).toBeVisible();
    await expect(page.getByText('Lorem ipsum dolor sit amet', { exact: false })).toBeVisible();
  });

  test('section with subsections shows Sub Section and Sub Section 2', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Section with subsections', level: 3 })).toBeVisible();
    await expect(page.getByText('Sub Section', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Sub Section 2', { exact: true })).toBeVisible();
    await expect(page.getByText('Simple text.')).toBeVisible();
  });

  test('warning and important sections are visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Warning and important', level: 3 })).toBeVisible();
    const warning = page.locator('.ds-section--warning').filter({ hasText: 'Warning' });
    const important = page.locator('.ds-section--important').filter({ hasText: 'Important' });
    await expect(warning).toBeVisible();
    await expect(important).toBeVisible();
  });

  test('expandable section can be collapsed and expanded', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Expandable section', level: 3 })).toBeVisible();
    const expandedSection = page.locator('.ds-section--expandable').filter({ hasText: 'Expanded' });
    await expect(expandedSection).toBeVisible();
    const body = expandedSection.locator('.ds-section__body');
    await expect(body).toBeVisible();
    const toggle = expandedSection.locator('.ds-section__toggle');
    await toggle.click();
    await expect(body).toBeHidden();
    await toggle.click();
    await expect(body).toBeVisible();
  });

  test('create action section has Add button', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Create action', level: 3 })).toBeVisible();
    const createSection = page.locator('.ds-section').filter({ hasText: 'Create Action' });
    await expect(createSection.getByRole('button', { name: 'Add' })).toBeVisible();
  });

  test('section with rows shows collapsible rows', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Section with rows (collapsible)', level: 3 })).toBeVisible();
    await expect(page.getByText('Row 1 (collapsible item)')).toBeVisible();
    await expect(page.getByText('Row 3 (collapsible closed)')).toBeVisible();
  });

  test('section with property rows shows label-value rows', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Section with property rows', level: 3 })).toBeVisible();
    await expect(page.getByText('Row 1', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Field Place Action')).toBeVisible();
    await expect(page.getByText('Label with no value')).toBeVisible();
  });

  test('section header has reference styling (x-panel-header)', async ({ page }) => {
    const header = page.locator('.ds-section__header').first();
    await expect(header).toBeVisible();
    await expect(header).toHaveCSS('padding', '7px 10px');
    await expect(header).toHaveCSS('border-radius', '4px 4px 0px 0px');
    const bg = await header.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(bg).toBe('rgb(239, 238, 237)'); // #efeeed
  });
});
