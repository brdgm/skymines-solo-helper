import { test, expect } from '@playwright/test'

test('smoke test', async ({ page }) => {
  await page.goto('/')

  // app home
  await expect(page.locator('h1')).toHaveText('Skymines Solo Helper')
  await page.getByRole('link', { name: 'Play Game' }).click()

  // setup game
  await page.getByRole('link', { name: 'Setup Luna' }).click()
  await page.getByRole('button', { name: 'Start Game' }).click()

  // play a few turns
  await page.getByRole('button', { name: 'Next' }).click()
  await page.getByRole('button', { name: 'Next' }).click()
  await page.getByRole('button', { name: 'Next' }).click()
  await page.getByRole('button', { name: 'Pass' }).click()
  await page.locator('#modalPassInfo').getByRole('button', { name: 'Pass' }).click()

  // abort game
  await page.getByRole('button', { name: 'Abort Game' }).click()
  await page.locator('#endGameModal').getByRole('button', { name: 'Abort Game' }).click()

  // app home
  await expect(page.locator('h1')).toHaveText('Skymines Solo Helper')
})
