export default (content) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Template</title>
    <script src="/static/client.js" type="application/javascript"></script>
  </head>
  <body>
    <div id="app">${content}</div>
  </body>
  </html>
`