import { test, expect } from '@playwright/test';

test('al querer registrarme sin email me sale error', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Registrarse' }).click();
  await page.getByRole('textbox', { name: 'Nombre completo' }).click();
  await page.getByRole('textbox', { name: 'Nombre completo' }).fill('pedro');
  await page.getByRole('textbox', { name: 'Nombre completo' }).press('Tab');
  await page.getByRole('textbox', { name: 'Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Teléfono' }).fill('123456777');
  await page.getByRole('textbox', { name: 'Teléfono' }).press('Tab');
  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).fill('jkhan13#');
  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).press('Tab');
  await page.getByRole('textbox', { name: 'Confirmar contraseña' }).fill('jkhan13#');
  await page.getByRole('button', { name: 'Registrarse' }).click();
  await page.getByText('EmailIngrese un email válido').click();
  await page.getByText('Ingrese un email válido').click();
});