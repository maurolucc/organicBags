var Accions = (function(){
    return {
        init: init,
        throwBag: throwBag,
        evaluate: evaluate,
        getAwards: getAwards,
    };

    function init(){
        frontUpdateSetup();
    }

    function frontUpdateSetup() {
        var currentRequestPayloadSetter = Api.setRequestPayload;
        Api.setRequestPayload = function(newPayloadStr) {
          currentRequestPayloadSetter.call(Api, newPayloadStr);
        };
        var currentResponsePayloadSetter = Api.setResponsePayload;
        Api.setResponsePayload = function(newPayloadStr) {
          currentResponsePayloadSetter.call(Api, newPayloadStr);
        };
    }

    function throwBag(){
        console.log("HELLO WORLD!");
        var account = document.getElementById("account").value;
        var pk = document.getElementById("pk").value;
        var qrcode = document.getElementById("qrcode").value;
        var body = {'account':account,'privateKey':pk,'qrCode':qrcode};
        var endpoint = '/api/bagToOwner';
        console.log(body);
        Api.sendRequest(endpoint,body);
    }

    function evaluate(){
        var account = document.getElementById("account").value;
        var pk = document.getElementById("pk").value;
        var address = document.getElementById("address").value;
        var body = {'account':account,'privateKey':pk,'shopAddress':address};
        var endpoint = '/api/evaluateBag';
        Api.sendRequest(endpoint,body);
    }
    
    function getAwards(){
        var account = document.getElementById("account").value;
        var pk = document.getElementById("pk").value;
        var qrcode = document.getElementById("qrcode").value;
        var grade = document.getElementById("grade").value;
        var body = {'account':account,'privateKey':pk,'qrCode':qrcode, 'grade': grade};
        var endpoint = '/api/tokens';
        Api.sendRequest(endpoint,body);
    }
}());