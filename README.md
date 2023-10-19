## Link
- test site
https://demo-bank.vercel.app/  


## Commands
- check `NodeJS` version    
`node -v`
- new project with Playwright:  
`npm init playwright@latest`
- record tests for given site  
`npx playwright codegen https://demo-bank.vercel.app/`
- run tests without browser GUI:  
`npx playwright test`
- run test with browser GUI:  
`npx playwright test --headed`
- viewing report  
`npx playwright show-report`


## Playwright Config modifications
- config file `playwright.config.ts`
- disabling browsers, i.e. Firefox:
    ```json
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },
    ```

## Usefull commands/methods
#### Methods
- .blur(); - usefull to leave an active locator, e.g.  
`await page.getByTestId('password-input').blur();`
- .fill(); - realize focus and fill at the same time, e.g.  
`await page.getByTestId('login-input').fill('testerLO');`  
 -runs "click" (focus) on "login-input" element and fill field with data "testerLO"  
- `page.waitForLoadState("domcontentloaded")` - waiting for loaded DOM state