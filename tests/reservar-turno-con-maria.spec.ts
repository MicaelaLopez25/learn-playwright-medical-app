import { test, expect } from '@playwright/test';

test.skip('cuando queremos reservar turno en dermatologia tiene que salir Maria Garcia', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('lopez@gmail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('jkhan13#');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('button', { name: 'Reservar nuevo turno' }).click();
  await page.getByRole('combobox').selectOption('1');
  await page.locator('div').filter({ hasText: /^MédicoSeleccionarMaría García$/ }).getByRole('combobox').selectOption('1');
});