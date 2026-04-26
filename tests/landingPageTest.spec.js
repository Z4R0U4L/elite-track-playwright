import { test, expect } from '@playwright/test';

test.describe('Landing Page Buttons Tests', () => {
    test('Test "Démarrer gratuitement →" button', async ({ page }) => {
        await page.goto('http://localhost:3000/');
        await expect(page.getByRole('button', { name: 'Démarrer gratuitement →' })).toBeVisible();
        await page.getByRole('button', { name: 'Démarrer gratuitement →' }).click();
        await expect(page).toHaveURL('http://localhost:3000/register');
    });

    test('Test "Se connecter" button', async ({ page }) => {
        await page.goto('http://localhost:3000/');
        await expect(page.getByRole('button', { name: 'Se connecter' })).toBeVisible();
        await page.getByRole('button', { name: 'Se connecter' }).click();
        await expect(page).toHaveURL('http://localhost:3000/login');
    });

    test('Test "Connexion" button', async ({ page }) => {
        await page.goto('http://localhost:3000/');
        await expect(page.getByRole('button', { name: 'Connexion' })).toBeVisible();
        await page.getByRole('button', { name: 'Connexion' }).click();
        await expect(page).toHaveURL('http://localhost:3000/login');
    });
    
    test('Test "Commencer gratuitement" button', async ({ page }) => {
        await page.goto('http://localhost:3000/');
        await expect(page.getByRole('button', { name: 'Commencer gratuitement' })).toBeVisible();
        await page.getByRole('button', { name: 'Commencer gratuitement' }).click();
        await expect(page).toHaveURL('http://localhost:3000/register');
    });
});

test.describe('Test Anchors links', () => {
    test('Test "Fonctionnalités" anchor link', async ({ page }) => {
        await page.goto('http://localhost:3000/');
        await expect(page.getByRole('link', { name: 'Fonctionnalités' })).toBeVisible();
        await page.getByRole('link', { name: 'Fonctionnalités' }).click();
        await expect(page).toHaveURL('http://localhost:3000/#features');
    });

    test('Test "Comment ça marche" anchor link', async ({ page }) => {
        await page.goto('http://localhost:3000/');
        await expect(page.getByRole('link', { name: 'Comment ça marche' })).toBeVisible();
        await page.getByRole('link', { name: 'Comment ça marche' }).click();
        await expect(page).toHaveURL('http://localhost:3000/#how');
    });
});

test('test features features are displayed', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page.getByRole('link', { name: 'Fonctionnalités' })).toBeVisible();
    await page.getByRole('link', { name: 'Fonctionnalités' }).click();
    await expect(page).toHaveURL('http://localhost:3000/#features');
    await expect(page.getByText('Carte GPS temps réel')).toBeVisible();
    await expect(page.getByText('Gestion des commandes')).toBeVisible();
    await expect(page.getByText('App livreur')).toBeVisible();
    await expect(page.getByText('Notifications automatiques')).toBeVisible();
    await expect(page.getByText('Lien de suivi client')).toBeVisible();
    await expect(page.getByText('Tableau de bord')).toBeVisible();
});
test('test how it works section is displayed', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page.getByRole('heading', { name: 'Comment ça marche' })).toBeVisible();
    await page.getByRole('link', { name: 'Comment ça marche' }).click();
    await expect(page).toHaveURL('http://localhost:3000/#how');
    await expect(page.getByText('Créez votre compte')).toBeVisible();
    await expect(page.getByText('Créez une commande')).toBeVisible();
    await expect(page.getByText('Suivez en temps réel')).toBeVisible();
});
test('test that dashboard is not accessible from landing page', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeHidden();
    await page.goto('http://localhost:3000/dashboard');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeHidden();
});

