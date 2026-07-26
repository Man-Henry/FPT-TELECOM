const https = require('https');
const fs = require('fs');

const url = 'https://code.highcharts.com/mapdata/countries/vn/vn-all.geo.json';
const path = 'assets/vn-all.geo.json';

https.get(url, (res) => {
    if (res.statusCode !== 200) {
        console.error(`Failed to get map data. Status Code: ${res.statusCode}`);
        return;
    }
    const file = fs.createWriteStream(path);
    res.pipe(file);
    file.on('finish', () => {
        file.close();
        console.log(`Successfully downloaded Vietnam map data to ${path}`);
    });
}).on('error', (err) => {
    console.error('Error downloading map data:', err.message);
});
