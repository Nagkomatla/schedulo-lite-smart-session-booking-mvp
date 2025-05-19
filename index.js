
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let slots = [
  { time: "10:00 AM", name: null },
  { time: "11:00 AM", name: null },
  { time: "12:00 PM", name: null },
  { time: "1:00 PM", name: null },
  { time: "2:00 PM", name: null },
  { time: "3:00 PM", name: null },
  { time: "4:00 PM", name: null },
  { time: "5:00 PM", name: null }
];

app.get('/slots', (req, res) => res.json(slots));
app.post('/book', (req, res) => {
  const { time, name } = req.body;
  const slot = slots.find(s => s.time === time);
  if (slot && !slot.name) {
    slot.name = name;
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "Already booked." });
  }
});
app.post('/cancel', (req, res) => {
  const { time } = req.body;
  const slot = slots.find(s => s.time === time);
  if (slot && slot.name) {
    slot.name = null;
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "Not booked yet." });
  }
});
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
