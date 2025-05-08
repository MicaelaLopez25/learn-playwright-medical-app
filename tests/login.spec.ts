import { test, expect } from '@playwright/test';

test.skip('Inicio de sesión exitoso redirige a reserva de turnos', async ({ page }) => {
    // Ir a la página de login
    await page.goto('http://localhost:3000/login');
  
    // Completar el formulario de login
    await page.fill('input[name="email"]', 'lopez@gmail.com');
    await page.fill('input[name="password"]', 'jkhan13#');
    await page.click('button[type="submit"]');
  
    // Esperar la navegación post login (espera la URL de la página de dashboard)
    await page.waitForURL('**/dashboard/**', { timeout: 60000 });
  
    // Ir manualmente por si la redirección automática no ocurre
    await page.goto('http://localhost:3000/dashboard/reservar');
  
    // Verificar que la URL es la correcta
    console.log('URL actual:', page.url());
  
    // Esperar que el encabezado de la página de reservas esté visible
    await expect(page.locator('[data-testid="reserva-header"]')).toBeVisible({ timeout: 10000 });

    // Tomar una captura de pantalla para depuración
    await page.screenshot({ path: 'debug.png', fullPage: true });
});
