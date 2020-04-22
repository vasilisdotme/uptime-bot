module.exports = (req, res) => {
  const { key } = req.query
    let status = key === process.env.RIGHT_KEY ? "UP" : "DOWN"

     res.json({
       status: status
     })
   //process.env.TEST_DOMAIN
}
