module.exports={
	sslOptions: {
  key: fs.readFileSync('../../../../../../../../../../etc/letsencrypt/live/meetapp.us/privkey.pem'),
  cert: fs.readFileSync('../../../../../etc/letsencrypt/live/meetapp.us/fullchain.pem')
};
}