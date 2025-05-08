import { test, expect } from '@playwright/test';

test('inicio sesion y con un usuario ya regristrado, me aparece en el header', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('lopez@gmail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('jkhan13#');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('Tab');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByText('Hola, juan lopez').click();
});