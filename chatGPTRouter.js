const express = require('express');
const router = express.Router();

// // Dynamic import for fetch
// let fetch;

// import('node-fetch').then(mod => {
//     fetch = mod.default;
// }).catch(err => console.error('Failed to load node-fetch', err));

// router.post('/process-text', async (req, res) => {
//     const { text } = req.body;
//     if (!fetch) {
//         return res.status(500).json({ error: 'Fetch is not initialized' });
//     }

//     try {
//         const response = await fetch('https://api.openai.com/v1/engines/text-davinci-002/completions', {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 prompt: `Given text: ${text}. [Your hardcoded prompt here]`,
//                 max_tokens: 150,
//             }),
//         });
//         const data = await response.json();
//         res.json({ response: data.choices[0].text });
//     } catch (error) {
//         console.error('Error calling ChatGPT:', error);
//         res.status(500).json({ error: 'Failed to process text' });
//     }
// });

module.exports = router;