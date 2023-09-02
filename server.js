import express from 'express';
import {v4 as uuidv4} from 'uuid';

const app = express();
const port = 5050;

// Enable parsing of JSON requests
app.use(express.json());

// In-memory data storage to hold receipt information
const receipts = {};

app.get('/', (req, res) => {
    res.json("hello world JavaScript!");
});

app.post('/receipts/process', (req, res) => {
    const data = req.body;

    // Generate a unique ID for the receipt
    const receipt_id = uuidv4();

    // Calculate the points for the receipt
    const points = calculatePoints(data);
    // Store the calculated points against the receipt ID
    receipts[receipt_id] = points;

    res.json({ id: receipt_id });
});

app.get('/receipts/:id/points', (req, res) => {
    const id = req.params.id;
    const points = receipts[id];

    if (!points) {
        return res.status(404).json({ error: "Receipt not found" });
    }

    res.json({ points: points });
});

function calculatePoints(data) {
    let points = 0;

    const retailerName = data.retailer || "";
    points += [...retailerName].filter(char => /[a-zA-Z0-9]/.test(char)).length;

    const total = parseFloat(data.total || 0.0);
    if (total === Math.round(total)) {
        points += 50;
    }
    
    if (total % 0.25 === 0) {
        points += 25;
    }

    const items = data.items || [];
    points += Math.floor(items.length / 2) * 5;

    items.forEach(item => {
        const description = (item.shortDescription || "").trim();
        const price = parseFloat(item.price || 0.0);
        if (description.length % 3 === 0) {
            points += Math.ceil(price * 0.2);
        }
    });

    const purchaseDate = data.purchaseDate || "";
    const day = new Date(purchaseDate).getDate();
    if (day % 2 === 1) {
        points += 6;
    }

    const purchaseTime = data.purchaseTime || "";
    const hour = parseInt(purchaseTime.split(":")[0]);
    if (hour >= 14 && hour < 16) {
        points += 10;
    }

    return points;
}

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
