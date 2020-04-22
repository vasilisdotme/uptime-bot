module.exports = (req, res) => {
    let status = req.key === process.env.RIGHT_KEY ? "UP" : "DOWN"

     res.json({
       status: status
     })
   //process.env.TEST_DOMAIN
}
