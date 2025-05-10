import { test, expect } from '@playwright/test';

test('cuando seleciono en especialidad pediatra tiene que salir ana rodriguez', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('lopez@gmail.com');
  await page.getByRole('textbox', { name: 'Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('jkhan13#');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('Tab');
  await page.getByRole('button', { name: 'Iniciar sesión' }).press('Enter');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.goto('http://localhost:3000/dashboard');
  await page.getByRole('button', { name: 'Reservar nuevo turno' }).click();
  await page.getByRole('combobox').selectOption('3');
  await page.locator('div').filter({ hasText: /^MédicoSeleccionarAna Rodríguez$/ }).getByRole('combobox').selectOption('3');
});