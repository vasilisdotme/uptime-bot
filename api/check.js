module.exports = (req, res) => {
  const axios = require('axios')
  const { key, url } = req.query

  if(key === undefined || url === undefined){
    return res.json({
      errorMessage: "both key and url required",
    })
  }

  const authenticated = key === process.env.RIGHT_KEY
  

  if(authenticated){
    axios.get(url).then((response) => {
      let status = response.status
  
      if(status !== 200){
        axios.post(process.env.SLACK_HOOK, {
            text: url + " respond with status code: " + status
        })
      }

      res.json({
        authenticated: authenticated,
        status: status
      })
    })
  }  
  //process.env.TEST_DOMAIN
}
