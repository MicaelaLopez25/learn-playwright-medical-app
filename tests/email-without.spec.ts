import { test, expect } from '@playwright/test';

test('al iniciar sesion solamente con la contraseña devuelve error al no usar email', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('jkhan13#');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('Tab');
  await page.getByRole('button', { name: 'Iniciar sesión' }).press('Enter');
  await page.getByRole('button', { name: 'Iniciar sesión' }).press('Enter');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await expect(page.getByText('Ingrese un email válido')).toBeVisible(); 
});