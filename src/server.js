const express = require('express')
const ejs = require('ejs')
const path = require('path');
const pupperteer = require('puppeteer')

const passengers = [
  {
      name: "Joyce",
      flightNumber: 7859,
      time: "18h00",
  },
  {
      name: "Brock",
      flightNumber: 7859,
      time: "18h00",
  },
  {
      name: "Eve",
      flightNumber: 7859,
      time: "18h00",
  },
];

const app = express()

app.get('/pdf', async (request, response) => {
  const browser = await pupperteer.launch({headless: true})
  const page = await browser.newPage()

  await page.goto('http://localhost:3000/', {
    waitUntil: 'networkidle0'
  })

  const pdf = await page.pdf({
    printBackground: true,
    format: 'letter',
    margin: {
      top: '20px',
      bottom: '40px',
      left: '20px',
      right: '20px'
    }
  })

  await browser.close()

  response.contentType('application/pdf')

  return response.send(pdf)
})
app.get('/', (request, response) => {

  const filePath = path.join(__dirname, 'print.ejs')
  ejs.renderFile(filePath, { passengers }, (err, html) => {
    if(err) {
      return response.send('Erro na leitura do arquivo')
    }
      //enviando para o navegador
      return response.send(html)
  })
})

app.listen(3000)