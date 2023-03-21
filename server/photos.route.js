const { Router } = require('express');
const { uploadFile } = require('./s3');
const router = Router();

router.get('/', (req, res) => {
  return res.send('Hello stranger');
});

router.post('/upload', async (req, res) => {
  try {
    if (!req?.files) throw new Error();

    const response = await uploadFile(req.files);
    res.send(response);
  } catch (error) {
    res.status(500);
    return res.json({ error: true });
  }
});

module.exports = router;
