import * as cheerio from 'cheerio'
import express from 'express'
import cors from 'cors'
import { got } from 'got'

const app = express()
app.use(cors())

app.get('/', async (req, res) => {
  got('https://kynguyenso.plo.vn/')
    .then((response) => {
      const html = response.body
      const $ = cheerio.load(html)
      const articles = []
      $('.story', html).each(function () {
        // const title = $(this).text().trim()
        const title = $(this).find('a').attr('title')
        const link = $(this).find('a').attr('href')
        const imageTop = $(this).find('a').find('img').attr('src')
        const image =
          $(this).find('a').find('img').attr('data-src') ||
          'https://photo-cms-plo.zadn.vn/600x360/Uploaded/2022/pwvotwiv/2022_05_30/4-dad4-451.jpg'
        const time = $(this).find('.story__time').text().trim() || ' '
        articles.push({
          title,
          link,
          imageTop,
          image,
          time,
        })
      })
      res.json(articles)
    })
    .catch((err) => {
      console.log('Error: ', err.message)
    })
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`server ${port}`)
})
