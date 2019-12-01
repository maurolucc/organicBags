pragma solidity 0.5.13;

import "./organicToken.sol";

contract organicBags {

    address council = 0xc6659CA6c5Ab58ec95B61E5Fb9d1749aB4d808d2;
    OrganicToken public tokenContract;
    // Tipus de comerç
    mapping (address => uint) commerceType; // 1 -> Gran; 2 -> Mitjà; 3 -> Petit
    // De qui es aquesta bossa? (codiQR - usuari)
    mapping (string => address) bagToOwner;
    // Número de bosses per usuari
    mapping (address => uint) ownerBagsCount;
    // Puntuació per bossa
    mapping (string => uint) bagScores;
    
    function addToken(address _contract) public {
        tokenContract = OrganicToken(_contract);
    }
    // Ajuntament
    function registerShop(address _shop, uint _shopType) public {
        require(council==msg.sender);
        commerceType[_shop] = _shopType;
    }

    // Treballador del comerç
    // Associem bossa de basura al comerç
    function associateBagToOwner(string memory _qrCode) public {
        require(commerceType[msg.sender]!=0);
        bagToOwner[_qrCode] = msg.sender;
        ownerBagsCount[msg.sender]++;
    }
 
    // Operari de la planta de reciclatge
    // Evaluar la basura 
    function evaluateBag(string memory _qrCode, uint _rating) public {
        // Falta controlar que nomes ho criden adreces de plantes de reciclatge
        bagScores[_qrCode] = _rating;
        address shop = bagToOwner[_qrCode];
        uint typeOfShop = commerceType[shop];
        uint tokens;
        if (_rating == 5){
            tokens = 4;
        } else if (_rating>4){
            tokens = 2;
        } else if (_rating>3){
            tokens = 1;
        }
        
        if (tokens!=0){
            // Igualar possibilitat entre negocis (ajuda al comerç local) - Equiparable a la quantitat de producció
            uint256 reward=tokens*typeOfShop;
            tokenContract.transferFrom(council, shop, reward);
        }
    }

    function getCommerceType(address _shop) public view returns(uint){
        return commerceType[_shop];
    }
    function getBagToOwner(string memory _qrCode) public view returns(address){
        return bagToOwner[_qrCode];
    }
    function getOwnerBagsCount(address _shop) public view returns(uint){
        return ownerBagsCount[_shop];
    }
    function getBagScores(string memory _qrCode) public view returns(uint){
        return bagScores[_qrCode];
    }
    
    function getTokens(address _shop) public view returns(uint256){
        return tokenContract.getBalance(_shop);
    }
    
}