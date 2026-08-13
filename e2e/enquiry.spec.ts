import { expect, test, type Page } from '@playwright/test';

async function completeToReview(page: Page, lang: 'ja' | 'en') {
  await page.goto(`/${lang}/contact`);

  await page.getByLabel(lang === 'ja' ? '利用者区分' : 'Your role').selectOption('Host Office / Faculty');
  await page.getByLabel(lang === 'ja' ? '受入機関・所属' : 'Host institution').selectOption('Ritsumeikan University');
  await page.getByLabel(lang === 'ja' ? '氏名' : 'Full name').fill('E2E Test User');
  await page.getByLabel(lang === 'ja' ? 'メールアドレス' : 'Email address').fill('e2e@example.com');
  await page.getByRole('button', { name: lang === 'ja' ? '次へ' : 'Next' }).click();

  await expect(page.getByRole('heading', { name: lang === 'ja' ? '来日・受入予定' : 'Visit and hosting details' })).toBeVisible();
  await page.getByLabel(lang === 'ja' ? '同行家族人数' : 'Number of accompanying family members').fill('2');
  await page.getByRole('button', { name: lang === 'ja' ? '次へ' : 'Next' }).click();

  const serviceName = lang === 'ja' ? 'COE・ビザ関連支援' : 'COE and visa guidance';
  await page.getByLabel(serviceName).check();
  await page.getByRole('button', { name: lang === 'ja' ? '次へ' : 'Next' }).click();

  await expect(page.getByRole('heading', { name: lang === 'ja' ? '確認・送信' : 'Review and submit' })).toBeVisible();
}

test('Japanese enquiry reaches review screen and preserves entered data', async ({ page }) => {
  await completeToReview(page, 'ja');
  await expect(page.getByText('E2E Test User')).toBeVisible();
  await expect(page.getByText('e2e@example.com')).toBeVisible();
  await expect(page.locator('.review-services').getByText('COE・ビザ関連支援')).toBeVisible();
});

test('English enquiry reaches review screen and preserves entered data', async ({ page }) => {
  await completeToReview(page, 'en');
  await expect(page.getByText('E2E Test User')).toBeVisible();
  await expect(page.getByText('e2e@example.com')).toBeVisible();
  await expect(page.locator('.review-services').getByText('COE and visa guidance')).toBeVisible();
});

test('browser validation prevents advancing without required fields', async ({ page }) => {
  await page.goto('/en/contact');
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByRole('heading', { name: 'About you' })).toBeVisible();
  await expect(page.getByLabel('Your role')).toBeFocused();
});

test('Other institution requires an institution name', async ({ page }) => {
  await page.goto('/en/contact');
  await page.getByLabel('Your role').selectOption('Host Office / Faculty');
  await page.getByLabel('Host institution').selectOption('Other');
  await page.getByLabel('Full name').fill('E2E Test User');
  await page.getByLabel('Email address').fill('e2e@example.com');
  await page.getByRole('button', { name: 'Next' }).click();

  const otherInstitution = page.getByLabel('Other institution and host department');
  await expect(otherInstitution).toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(otherInstitution).toBeFocused();
});

test('honeypot is excluded from normal interaction and kept off-screen', async ({ page }) => {
  await page.goto('/en/contact');
  const honeypot = page.locator('input[name="company_website"]');
  await expect(honeypot).toHaveCount(1);
  await expect(honeypot).toHaveAttribute('tabindex', '-1');
  await expect(honeypot.locator('xpath=..')).toHaveAttribute('aria-hidden', 'true');
  const box = await honeypot.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeLessThan(-1000);
});
