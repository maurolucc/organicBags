var Api = (function() {
    var requestPayload;
    var responsePayload;
    
  
    return {
      sendRequest: sendRequest,
 
      getRequestPayload: function() {
        return requestPayload;
      },
      setRequestPayload: function(newPayloadStr) {
        requestPayload = JSON.parse(newPayloadStr);
      },
      getResponsePayload: function() {
        return responsePayload;
      },
      setResponsePayload: function(newPayloadStr) {
        responsePayload = JSON.parse(newPayloadStr);
      }
    };
  
    function sendRequest(endpoint,messageReceived,callback) {
      var payloadToServer = messageReceived;
      var http            = new XMLHttpRequest();
      
      http.open('POST', endpoint, true);
      http.setRequestHeader('Content-type', 'application/json');
      http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200 && http.responseText) {
          Api.setResponsePayload(http.responseText);
        }
      };
  
      var params = JSON.stringify(payloadToServer);
      if (Object.getOwnPropertyNames(payloadToServer).length !== 0) {
          Api.setRequestPayload(params);
      }
      console.log("sendRequest public/api.js ")
      console.log(params)
      http.send(params);
    }
  }());
  