import * as cron from 'cron';
import * as https from 'https';

const backendUrl = 'https://pratinha-manager-api.onrender.com/ping';

const job = new cron.CronJob('*/1 * * * *', function () {
    console.log('Restarting Server...');
    https.
        get(backendUrl, (res:any) => {
            if (res.statusCode == 200) {
                console.log('Server restarted !');
            } else {
                console.error(`Failed to restart server - ${res.statusCode}`);
            }
        })
        .on('error', (err:any) => {
            console.log('Error during restart:', err.message);
        });
});

export default job;