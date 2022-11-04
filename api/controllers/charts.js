const db = require('../db');
const Charts = require('../models/charts');

const create = (req, res) => {    
    const body = req.body;
    if (!body) {
        console.log('Error: Creating chart - Requires request body');
        return res.status(400).json({ success: false, error: 'You must provide a chart' })
    }

    const charts = new Charts(body)
    if (!charts) {
        console.log('Error: Creating chart - Invalid Schema');
        return res.status(400).json({ success: false })
    }

    charts.save()
        .then(() => {
            console.log('Created chart - id:' + charts._id);
            return res.status(201).json({ success: true, message: 'Chart created.', data: { id: charts._id }  })
        })
        .catch(error => {
            console.log('Error: Creating chart - Unable to save to database');
            return res.status(400).json({ error, message: 'Chart not created.', })
        })
}

const find = async (req, res) => {
    console.log('route: charts/find');
    const query = [{ $limit : 10000 }];   

    const start = Date.now();
    await db.collection('charts3').aggregate(query).toArray()
    .then(charts => { 
        let delta = Date.now() - start;
        console.log('Found charts');
        res.json({ success: true, message: 'Retrieved ' +  charts.length + ' charts in ' + (delta / 1000) + ' seconds', data:charts });
    })
    .catch(err => res.status(400).json('Error: ' + err));
}

module.exports = {
    create,
    find
}