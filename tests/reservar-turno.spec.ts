import { test, expect } from '@playwright/test';

test('al reservar un turno para el 30 de mayo, este debe aparecer para el 29', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('lopez@gmail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('jkhan13#');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('Tab');
  await page.getByRole('button', { name: 'Iniciar sesión' }).press('Enter');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('button', { name: 'Reservar nuevo turno' }).click();
  await page.getByRole('combobox').selectOption('2');
  await page.locator('div').filter({ hasText: /^MédicoSeleccionarJuan Pérez$/ }).getByRole('combobox').selectOption('2');
  await page.getByRole('textbox').fill('2025-05-30');
  await page.locator('div').filter({ hasText: /^HorarioSeleccionar09:0009:3010:0010:3011:0011:3014:0014:3015:0015:3016:0016:30$/ }).getByRole('combobox').selectOption('11:00');
  await page.getByRole('button', { name: 'Confirmar Turno' }).click();
  await page.getByRole('link', { name: 'Mis Turnos' }).click();
  await expect(page.getByRole('main')).toContainText('jueves, 29 de mayo de 2025');
  await expect(page.getByRole('main')).toContainText('11:00');
});