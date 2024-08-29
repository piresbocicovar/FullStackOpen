const { expect } = require('@playwright/test')

const login = async (page, username, password) => {
    await page.locator('input[name="Username"]').fill(username)
    await page.locator('input[name="Password"]').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'New Blog' }).click()
    await page.getByPlaceholder('Enter blog title').fill(title)
    await page.getByPlaceholder('Enter author name').fill(author)
    await page.getByPlaceholder('Enter blog URL').fill(url)
    await page.getByRole('button', { name: 'add' }).click()
}

const assertBlogOrder = async (page, expectedOrder) => {
    const headings = await page.locator('h2:visible').all()
    const headingTexts = await Promise.all(headings.map(heading => heading.textContent()))
    
    expect(headingTexts).toEqual(expectedOrder)
}

export { login, createBlog, assertBlogOrder }