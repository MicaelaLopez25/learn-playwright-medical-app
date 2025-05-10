import { test, expect } from '@playwright/test';

test('cuando queremos reservar turno en traumatologia, tiene que aparecer Carlos Perez', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('lopez@gmail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('jkhan13#');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('button', { name: 'Reservar nuevo turno' }).click();
  await page.getByRole('combobox').selectOption('4');
  await page.locator('div').filter({ hasText: /^MédicoSeleccionarCarlos López$/ }).getByRole('combobox').selectOption('4');
});