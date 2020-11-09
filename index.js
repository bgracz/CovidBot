const app = require('express')();
const PORT = process.env.PORT || 3000;

app.get ("", (req, res) => {
  res.sendFile( __dirname + "/bot.js" );
});

app.listen(PORT, () => {
  console.log('${PORT}');
});
