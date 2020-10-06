const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const Bundler = require("parcel-bundler");
const cors = require("cors");
const { google } = require('googleapis');
const fs = require('fs');
const formidable = require('formidable');
const credentials = require('./credentials.json');
const { response, request } = require('express');
const { file } = require('googleapis/build/src/apis/file');

const clientId = credentials.web.client_id;
const clientSecret = credentials.web.client_secret;
const redirectURI = credentials.web.redirect_uris;
const oauthClient = new google.auth.OAuth2(clientId, clientSecret, redirectURI[0]);

const SCOPE = ['https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.file'];

const bundler = new Bundler('./src/index.html', {});
const Routes = require('./Routes');

server.use(cors());
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

server.get('/getAuthURL', (request, response) => {
    const authUrl = oauthClient.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPE
    });
    console.log(authUrl);
    return response.send(authUrl);
});

server.post('/getToken', (request, response) => {
    console.log(request.body);
    if(request.body.code == null) {
        return response.status(400).send('Invalid Request');
    }

    oauthClient.getToken(request.body.code, (err, token) => {
        if(err){
            console.error("Could not access token", err);
            return response.status(400).send("Error retrieving token");
        }
        response.send(token);
    });
});

server.post('/userProfile', (request, response) => {
    if(request.body.token == null){
        return response.status(400).send('Token not found');
    }

    oauthClient.setCredentials(request.body.token);
    const oauth2 = google.oauth2({version: 'v2', auth: oauthClient});

    oauth2.userinfo.get((err, res) => {
        if(err) {
            response.status(400).send(err);
        }
        console.log(res.data);
        response.status(200).send(res.data)
    })
});

server.post('/readDrive', (request, response) => {
    if(request.body.token == null){
        return response.status(400).send('Token not found');
    }

    oauthClient.setCredentials(request.body.token);
    const drive = google.drive({version: 'v3', auth: oauthClient});
    drive.files.list({
        pageSize: 10,
    }, (err, res) => {
        if(err) {
            console.log('The API returned an error: ' + err);
            return response.status(400).send(err);
        }
        const files = res.data.files;
        if(files.length){
            console.log('Files:');
            files.map((file) => {
                console.log(`${file.name} (${file.id})`);
            });
        } else {
            console.log('No files found.');
        }
        response.send(files);
    });
});

server.post('/uploadFiles', (request, response) => {
    var form = new formidable.IncomingForm();
    form.parse(request, (err, fields, files) => {
        if(err) {
            return response.status(400).send(err);
        }

        const token = JSON.parse(fields.token);
        console.log(token);

        if(token == null) {
            return response.status(400).send("Token not found!");
        }

        oauthClient.setCredentials(token);
        console.log(files.file);

        const drive = google.drive({version: 'v3', auth: oauthClient});
        const fileMetadata = {
            name: files.file.name
        }
        const media = {
            mimeType: files.file.type,
            body: fs.createReadStream(files.file.path)
        };

        drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: "id"
            },
            (err, file) => {
                oauthClient.setCredentials(null);
                if (err) {
                    console.error(err);
                    response.status(400).send(err);
                } else {
                    response.status(200).send('Successful');
                }
            }
        );
    })
});

server.use('/', Routes);
server.use(bundler.middleware());
server.use(express.static('./dist'));

server.listen(3000, err => {
    if (err) {
        console.error(err);
        process.exit(-1)
    }
    console.log('Application is running on port 3000');
});

