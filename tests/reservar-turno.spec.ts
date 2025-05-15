import { test, expect } from '@playwright/test';

test.skip('al reservar un turno para el 17 de mayo, este debe aparecer para el 17', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('lopez@gmail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('jkhan13#');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('Enter');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('Enter');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('button', { name: 'Reservar nuevo turno' }).click();
  await page.getByRole('combobox').selectOption('1');
  await page.locator('div').filter({ hasText: /^MédicoSeleccionarMaría García$/ }).getByRole('combobox').selectOption('1');
  await page.getByRole('textbox').fill('2025-05-17');
  await page.locator('div').filter({ hasText: /^HorarioSeleccionar09:0009:3010:0010:3011:0011:3014:0014:3015:0015:3016:0016:30$/ }).getByRole('combobox').selectOption('15:00');
  await page.getByRole('button', { name: 'Confirmar Turno' }).click();
  await page.getByRole('link', { name: 'Mis Turnos' }).click();
  await page.getByText('sábado, 17 de mayo de').click();
  await page.getByText('sábado, 17 de mayo de 202515:').click();
});