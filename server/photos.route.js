const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  return res.send('Hello stranger');
});

router.post('/upload', (req, res) => {
  console.log(req.files);

  return res.send('File uploaded');
});

module.exports = router;
