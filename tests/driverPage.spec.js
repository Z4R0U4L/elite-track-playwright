import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { faker } from '@faker-js/faker';

test('Test driver dashboard access', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('http://localhost:3000/login');
    await loginPage.loginDriver('achraf1111@gmail.com', '123456789');
    await expect(page.getByRole('heading', { name: /Mes livraisons/ })).toBeVisible();
    await expect(page).toHaveURL('http://localhost:3000/driver');
});
test('gps toggle', async ({ page }) => { 
    const loginPage = new LoginPage(page);
    await page.goto('http://localhost:3000/login');
    await loginPage.loginDriver('achraf1111@gmail.com', '123456789');
    await expect(page.getByRole('heading', { name: /Mes livraisons/ })).toBeVisible();
    await page.getByTestId('gps-toggle').click();
    await expect(page.getByText('GPS activé — position partagée')).toBeVisible();
    await page.getByTestId('gps-toggle').click();
    await expect(page.getByText('GPS désactivé')).toBeVisible();
});
test('test user info are displayed and log out', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('http://localhost:3000/login');
    await loginPage.loginDriver('achraf1111@gmail.com', '123456789');
    await expect(page.getByRole('heading', { name: /Mes livraisons/ })).toBeVisible();
    await expect(page.locator('header').getByText('Noureddine zaroual')).toBeVisible();
    await page.getByRole('button', { name: 'Déconnexion' }).click();
    await expect(page.getByRole('heading', { name: 'Connexion' })).toBeVisible();
    await expect(page).toHaveURL('http://localhost:3000/login');
});
test('test verfying oreders are displayed correctly', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('http://localhost:3000/login');
    await loginPage.loginDriver('achraf1111@gmail.com', '123456789');
    await expect(page.getByRole('heading', { name: /Mes livraisons/ })).toBeVisible();
    const orderlist = page.getByTestId('orders-list');
    await expect(orderlist).toBeVisible();
    const cards = page.getByTestId('order-card');
    await expect(cards).not.toHaveCount(0);
});
test('test every pending order has a "demmareer la livraison" button', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('http://localhost:3000/login');
    await loginPage.loginDriver('achraf1111@gmail.com', '123456789');
    await expect(page.getByRole('heading', { name: /Mes livraisons/ })).toBeVisible();
    const orderlist = page.getByTestId('orders-list');
    await expect(orderlist).toBeVisible();
    const pendingOrders = orderlist.locator('div').filter({ has: page.getByText('En attente') });
    const count = await pendingOrders.count();
    for (let i = 0; i < count; i++) {
        const order = pendingOrders.nth(i);
        const startButton = order.getByRole('button', { name: 'Démarrer' });
        await expect(startButton).toBeVisible();
    }
});
test('test starting a delivery', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('http://localhost:3000/login');
    await loginPage.loginDriver('achraf1111@gmail.com', '123456789');
    await expect(page.getByRole('heading', { name: /Mes livraisons/ })).toBeVisible();
    const orderlist = page.getByTestId('orders-list');
    await expect(orderlist).toBeVisible();
    const order = page.getByTestId('order-card')
        .filter({ has: page.getByText('Assignée') })
        .first();
    const orderId = await order.getAttribute('data-order-id');
    const startButton = order.getByRole('button', { name: 'Démarrer' });
    await startButton.click();
    const updatedOrder = page.locator(`[data-order-id="${orderId}"]`);
    await expect(updatedOrder.getByTestId('order-status')).toHaveText('En cours');
    await expect(updatedOrder.getByRole('button', { name: 'Démarrer' })).toBeHidden();
    await expect(updatedOrder.getByRole('button', { name: 'Confirmer livraison' })).toBeVisible();
});
test('test confirming a delivery', async ({ page }) => {
const loginPage = new LoginPage(page);
    await page.goto('http://localhost:3000/login');
    await loginPage.loginDriver('achraf1111@gmail.com', '123456789');
    await expect(page.getByRole('heading', { name: /Mes livraisons/ })).toBeVisible();
    const orderlist = page.getByTestId('orders-list');
    await expect(orderlist).toBeVisible();
    const order = page.getByTestId('order-card')
        .filter({ has: page.getByText('En cours') })
        .first();
    const orderId = await order.getAttribute('data-order-id');
    const confirmButton = order.getByRole('button', { name: 'Confirmer livraison' });
    page.once('dialog', async dialog => {
        await dialog.accept();
    });
    await confirmButton.click();
    await expect(page.getByText('Livraison confirmée!')).toBeVisible();
    await expect(page.locator(`[data-order-id="${orderId}"]`)).not.toHaveText('En cours');
});
test('test opening map button', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('http://localhost:3000/login');
    await loginPage.loginDriver('achraf1111@gmail.com', '123456789');
    await expect(page.getByRole('heading', { name: /Mes livraisons/ })).toBeVisible();
    const orderlist = page.getByTestId('orders-list');
    await expect(orderlist).toBeVisible();
    const order = page.getByTestId('order-card')
        .filter({ has: page.getByText('Assignée') })
        .first();
    const mapButton = order.getByRole('link', { name: 'Voir sur Maps' });
    await expect(mapButton).toBeVisible();
    const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        mapButton.click(),
    ]);
    await expect(newPage).toHaveURL(/https:\/\/www\.google\.com\/maps/);
    await newPage.close();
});

    

    
    


