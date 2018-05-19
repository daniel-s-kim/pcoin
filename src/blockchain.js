//install crypto-js with >yarn add crypto-js
const CryptoJS = require('crypto-js');

//Block
class Block {
    constructor(index,hash,previousHash,timestamp,data) {
        this.index = index;
        this.hash = hash;
        this.previousHash=previousHash;
        this.timestamp=timestamp;
        this.data=data;

    }
}

//hard coding genesis block
const genesisBlock = new Block(
    0,
    '021014BF1BAC6039B90F7FDD941B46D70E4D17953F366E682C5445F061A919CD',
    null,
    1526745462.303,
    'This is the genesis!'
);

//define blockchain
let blockchain = [genesisBlock];

//get last block
const getLastBlock = () => blockchain[blockchain.length -1]
/*Same as
function getLastBlock() {
    return blockchain[blockchain.length -1];
}
*/

//get time stamp
const getTimestamp = () => new Date().getTime() / 1000;

//create hash
const createHash = (index, previousHash, timestamp, data ) => 
    CryptoJS.SHA256(index+previousHash+timestamp+data).toString();


//create new block

const createNewBlock = data => {
    const previousBlock = getLastBlock();
    const newBlockIndex = previousBlock.index +1;
    const newTimestamp = getTimestamp();
    const newHash = createHash(newBlockIndex,previousBlock.hash,newTimestamp,data);
    const newBlock = new Block(
        newBlockIndex,
        newHash,
        previousBlock.hash
        newTimestamp,
        data
    );
    return newBlock;
};

//validating system