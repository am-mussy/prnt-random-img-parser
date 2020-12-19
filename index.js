
const puppeteer = require('puppeteer')
const fs = require('fs');
let link
const removeIMG = 'iVBORw0KGgoAAAANSUhEUgAAAaYAAABsCAYAAAAhdRZlAAAgAElEQVR4Xu2dddRVxRbABxVbsQPBbkUURcVOBPGpYCs2JuqzO7AQ'

fs.mkdir('./img', { recursive: true }, (err) => {
    if (err) throw err;
});

function makeid(length) {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


const parser = async (x) => {
    try {

        let browser = await puppeteer.launch({ headless: true, slowMo: 100, devtools: false })

        for (let i = 0; i < x; i++) {

            link = `https://prnt.sc/${makeid(6)}`
            console.log(link)
            let page = await browser.newPage()
            await page.setViewport({ width: 1400, height: 900 })
            await page.goto(link, { waitUntill: 'domcontentloaded ' })

            try {
                const imageURL = await page.$eval('.under-image img', img => img.src)
                const image64 = imageURL.split(',')


                if (image64.slice(0, 100) === removeIMG) {
                    console.log('remove img')
                    page.close()
                } else {

                    require("fs").writeFile(`./img/${makeid(5)}.png`, image64[1], 'base64', function (err) {
                        console.log(err);
                    });
                }

                page.close()




            } catch (error) {
                page.close()
            }

        }

    } catch (e) {
        console.log(e)
    }
}

parser(1000)
