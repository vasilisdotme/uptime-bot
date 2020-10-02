module.exports = (req, res) => {
  const axios = require('axios')
  const { key, url } = req.query

  if(typeof key === undefined || typeof url === undefined){
    return res.json({
      errorMessage: "both key and url required to complete authentication",
    })
  }

  const authenticated = key === process.env.RIGHT_KEY
  axios.defaults.validateStatus = function () {
    return true;
  };

  if(authenticated){
    axios.get(url).then((response) => {
      let status = response.status
      if(status !== 200){
        let payload = {
          text: url + " respond with status code: " + status
        }
        axios.post(process.env.SLACK_HOOK, payload).then((res2) => {
          return res.json({
            status: status,
          })
        })
      }else{
        return res.json({
          status: status
        })
      }  
    })
  }  
}
