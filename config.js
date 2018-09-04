module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGODB || 'mongodb://localhost:27017/shop',
  //localhost:27017 => by default the url to access to the data bases
  SECRET_TOKEN: '1234567890'
  // This has to be more complicated.For each application we create handmade one
}
