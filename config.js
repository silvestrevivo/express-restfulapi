module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGODB || 'mongodb://localhost:27017/shop'
  //localhost:27017 => by default the url to access to the data bases
}
