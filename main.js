import puppeteer from 'puppeteer';
import { addPrice} from './addEnter.js';

(async () => {

  const browser = await puppeteer.launch({ headless: "new" }); // Notez que j'ai ajouté { headless: true } pour activer le nouveau mode headless
  
  const page = await browser.newPage();

  await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15");

  // Accéder à une page web
  await page.goto('https://www.tesla.com/fr_fr/model3/design#overview', { timeout: 6000 });
  

  

  // Attendre que l'élément que vous souhaitez extraire apparaisse
  //await page.waitForSelector('#main-content > section > div > div > div:nth-child(1) > div > div.tds--vertical_padding--6x.option-widget--container > div.group--child-container > fieldset > div:nth-child(1) > div > div > div > div > div > div > label > div > span.tds-form-input-trailing.tds-o-label-descriptor > p');
  
  
  await page.waitForSelector('#main-content > section > div > div > div:nth-child(1) > div > div.tds--vertical_padding--6x.option-widget--container > div.group--child-container > fieldset > div:nth-child(1) > div > div > div > div > div > div > label > div > span.tds-form-input-trailing.tds-o-label-descriptor > p');


  // Extraire des données
  
  const data = await page.evaluate(() => {
    const resultElement = document.querySelector('#main-content > section > div > div > div:nth-child(1) > div > div.tds--vertical_padding--6x.option-widget--container > div.group--child-container > fieldset > div:nth-child(1) > div > div > div > div > div > div > label > div > span.tds-form-input-trailing.tds-o-label-descriptor > p');
    return resultElement.innerText;
  });

  // Traiter la donée
  const price = parseInt(data.trim().replace('€', '').replace(' ', ''));

  console.log(price);
  addPrice(price);
  
  await browser.close();

})();

