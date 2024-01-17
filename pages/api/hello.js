//Creating a simple API endpoint //

export default function handler(req, res) {
    res.status(200).json({ text: 'Hello', name: 'Brendan', nextThing: 'do not sleep where you hussle at' });
  }