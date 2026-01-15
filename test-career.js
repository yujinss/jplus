const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        viewport: { width: 516, height: 900 }
    });
    const page = await context.newPage();

    await page.goto('http://localhost:8080/index.html');
    await page.waitForLoadState('networkidle');

    // career 섹션으로 스크롤
    await page.evaluate(() => {
        document.querySelector('#career').scrollIntoView();
    });
    await page.waitForTimeout(500);

    // 각 요소의 위치 확인
    const info = await page.evaluate(() => {
        const ideal = document.querySelector('.talent_box.ideal');
        const common = document.querySelector('.talent_box.common');
        const always = document.querySelector('.talent_box.always');
        const joining = document.querySelector('.talent_box.joining');

        const getInfo = (el, name) => {
            const computed = window.getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            return {
                name: name,
                top: rect.top,
                order: computed.order
            };
        };

        return [
            getInfo(ideal, 'ideal'),
            getInfo(common, 'common'),
            getInfo(always, 'always'),
            getInfo(joining, 'joining')
        ].sort((a, b) => a.top - b.top);
    });

    console.log('Elements sorted by position:');
    info.forEach(el => {
        console.log(`${el.name}: top=${el.top.toFixed(0)}, order=${el.order}`);
    });

    // 스크린샷 찍기
    await page.screenshot({ path: 'career-screenshot.png', fullPage: false });
    console.log('\nScreenshot saved to career-screenshot.png');

    await browser.close();
})();
