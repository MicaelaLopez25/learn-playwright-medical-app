import { test, expect } from '@playwright/test';

test('registro sin nombre, error', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Registrarse' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('pedro@gmail.com');
  await page.getByRole('textbox', { name: 'Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Teléfono' }).fill('123456666');
  await page.getByRole('textbox', { name: 'Teléfono' }).press('Tab');
  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).fill('jkhan13#');
  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).press('Tab');
  await page.getByRole('textbox', { name: 'Confirmar contraseña' }).fill('jkhan13#');
  await page.getByRole('button', { name: 'Registrarse' }).click();
  await page.getByText('El nombre debe tener al menos').click();
  await expect(page.getByText('El nombre debe tener al menos 2 caracteres')).toBeVisible();
  
});