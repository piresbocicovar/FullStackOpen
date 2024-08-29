const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login, createBlog, assertBlogOrder } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await page.goto('http://localhost:5173')
        await request.post('http://localhost:3001/api/testing/reset')
        await request.post('http://localhost:3001/api/users', {
            data: {
                name: 'tester',
                username: 'testMaster',
                password: 'testpassword'
            }
        })
    })

    test('Login form is shown', async ({ page }) => {
        await expect(page.locator('input[name="Username"]')).toBeVisible()
        await expect(page.locator('input[name="Password"]')).toBeVisible()
        await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await login(page, 'testMaster', 'testpassword')
            await expect(page.getByText('Login successful')).toBeVisible()
            await expect(page.getByText('user: tester logout')).toBeVisible()
            await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
            await expect(page.getByRole('button', { name: 'New Blog' })).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await login(page, 'testMaster', 'wrongpassword')
            await expect(page.getByText('Wrong username or password')).toBeVisible()
            await expect(page.locator('input[name="Username"]')).toBeVisible()
            await expect(page.locator('input[name="Password"]')).toBeVisible()
            await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await login(page, 'testMaster', 'testpassword')
        })

        test('a new blog can be created', async ({ page }) => {
            await createBlog(page, 'test blog', 'test author', 'testURL.com')
            await expect(page.getByText('\'test blog\' was added to the')).toBeVisible()
            await expect(page.getByRole('heading', { name: 'test blog' })).toBeVisible()
            await expect(page.getByText('by test author')).toBeVisible()
        })

        test('a blog can be liked', async ({ page }) => {
            await createBlog(page, 'test blog', 'test author', 'testURL.com')
            await expect(page.getByPlaceholder('Enter blog title')).not.toBeVisible()
            await page.getByRole('button', { name: 'View' }).click()
            await expect(page.getByText('Likes: 0')).toBeVisible()
            await page.getByRole('button', { name: 'Like' }).click()
            await expect(page.getByText('Liked \'test blog\'')).toBeVisible()
            await expect(page.getByText('Likes: 1')).toBeVisible()
        })

        test('the user can delete their own blog', async ({ page }) => {
            await createBlog(page, 'test blog', 'test author', 'testURL.com')
            await expect(page.getByPlaceholder('Enter blog title')).not.toBeVisible()
            await page.getByRole('button', { name: 'View' }).click()
            page.on('dialog', async dialog => {
                expect(dialog.message()).toBe('delete \'test blog\'?')
                await dialog.accept()
              })
            await page.getByRole('button', { name: 'Delete' }).click()
            await expect(page.getByRole('heading', { name: 'test blog' })).not.toBeVisible()
            await expect(page.getByText('Successfully removed \'test blog\'')).not.toBeVisible()
        })

        test('the user can\'t delete someone else\'s post', async ({ page, request }) => {
            await request.post('http://localhost:3001/api/users', {
                data: {
                    name: 'someone else',
                    username: 'anotherUser',
                    password: 'pass123'
                }
            })
            await createBlog(page, 'test blog', 'test author', 'testURL.com')
            await expect(page.getByPlaceholder('Enter blog title')).not.toBeVisible()
            await page.getByRole('button', { name: 'logout' }).click()
            await expect(page.getByText('Logout successful')).toBeVisible()
            await login(page, 'anotherUser', 'pass123')
            await expect(page.getByText('Login successful')).toBeVisible()
            await page.getByRole('button', { name: 'View' }).click()
            await expect(page.getByText('Likes: 0')).toBeVisible()
            await expect(page.getByRole('button', { name: 'Delete' })).not.toBeVisible()
        })

        test('blogs are arranged in order according to likes', async ({ page }) => {
            await createBlog(page, 'Blog A', 'Author A', 'urlA.com')
            await createBlog(page, 'Blog B', 'Author B', 'urlB.com')
            await createBlog(page, 'Blog C', 'Author C', 'urlC.com')
    
            await page.getByRole('heading', { name: 'Blog A' }).locator('..').getByRole('button', { name: 'View' }).click()
            await page.getByRole('heading', { name: 'Blog B' }).locator('..').getByRole('button', { name: 'View' }).click()
            await page.getByRole('heading', { name: 'Blog C' }).locator('..').getByRole('button', { name: 'View' }).click()

            await page.getByRole('heading', { name: 'Blog C' }).locator('..').getByRole('button', { name: 'Like' }).click()
            await expect(page.getByRole('heading', { name: 'Blog C' }).locator('..').getByText('Likes: 1')).toBeVisible()

            await assertBlogOrder(page, ['Blog C', 'Blog A', 'Blog B'])
    
            await page.getByRole('heading', { name: 'Blog B' }).locator('..').getByRole('button', { name: 'Like' }).click()
            await expect(page.getByRole('heading', { name: 'Blog B' }).locator('..').getByText('Likes: 1')).toBeVisible()
            await page.getByRole('heading', { name: 'Blog B' }).locator('..').getByRole('button', { name: 'Like' }).click()
            await expect(page.getByText('Likes: 2')).toBeVisible()

            await assertBlogOrder(page, ['Blog B', 'Blog C', 'Blog A'])
        })
    })
})
