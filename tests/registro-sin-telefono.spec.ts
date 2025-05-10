import { test, expect } from '@playwright/test';

test('no nos deja registrarnos si falta el telefono', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Registrarse' }).click();
  await page.getByRole('textbox', { name: 'Nombre completo' }).click();
  await page.getByRole('textbox', { name: 'Nombre completo' }).fill('pedro sanchez');
  await page.getByRole('textbox', { name: 'Nombre completo' }).press('Tab');
  await page.getByRole('textbox', { name: 'Email' }).fill('pedro@gmail.com');
  await page.getByRole('textbox', { name: 'Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Teléfono' }).press('Tab');
  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).fill('jkhan13#');
  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).press('Tab');
  await page.getByRole('textbox', { name: 'Confirmar contraseña' }).fill('jkhan13#');
  await page.getByRole('textbox', { name: 'Confirmar contraseña' }).press('Tab');
  await page.getByRole('button', { name: 'Registrarse' }).press('Enter');
  await page.getByRole('button', { name: 'Registrarse' }).click();
  await page.getByText('Ingrese un número de teléfono').click();
});