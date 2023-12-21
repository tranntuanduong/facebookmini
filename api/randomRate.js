// import { keccak256, solidityKeccak256, toUtf8Bytes } from "ethers/lib/utils";
// import MerkleTree from "merkletreejs";

const { solidityKeccak256, keccak256, toUtf8Bytes } = require('ethers/lib/utils');
const { MerkleTree } = require('merkletreejs');

const startRandom = ({ ...pool }) => {
    const total = Object.values(pool).reduce((acc, cur) => acc + cur, 0);

    if (total === 0) return '';

    const randomIndex = Math.floor(Math.random() * total);

    let newObject = {};
    let runningTotal = 0;
    for (const key in pool) {
        runningTotal += pool[key];
        newObject[key] = runningTotal;
    }

    let randomItem;
    Object.keys(newObject).forEach((key) => {
        if (randomIndex < newObject[key] && !randomItem) {
            randomItem = key;
        }
    });

    return randomItem;
};

// const shuffleArray = (array) => {
//     const shuffledArray = [...array];
//     for (let i = shuffledArray.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
//     }
//     return shuffledArray;
// };

const makeMerkleTree = (data) => {
    const leaves = data.map((item) =>
        solidityKeccak256(['uint256', 'uint256'], [item.index, item.result])
    );

    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    // const root = tree.getRoot().toString('hex');
    const root = tree.getHexRoot();

    return {
        root,
        tree,
        
    };
};

module.exports = { startRandom, makeMerkleTree };
