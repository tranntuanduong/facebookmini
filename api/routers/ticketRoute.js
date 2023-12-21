var express = require('express');
var router = express.Router();
const TicketModel = require('../models/ticket.model');
const { makeMerkleTree, startRandom } = require('../randomRate');
const { solidityKeccak256 } = require('ethers/lib/utils');
const { chunk } = require('lodash');

const MapResult = {
    fail: 0,
    Terrastone: 1,
    Aqualore: 2,
    Pyraflame: 3,
    Metallion: 4,
    Woodlyn: 5,
    box: 6,
};

// get user by id || username: api/users
router.get('/', async (req, res) => {
    try {
        // const result: Record<string, any> = {};
        const tickets = {
            bronze: {
                type: 'bronze',
                fail: 45542,
                // fail: 4542,
                box: 83926,
                // box: 8006,
                horse: 650,
            },
            silver: {
                type: 'silver',
                fail: 8640,
                // fail: 640,
                box: 38400,
                // box: 400,
                horse: 960,
            },
            gold: {
                type: 'gold',
                fail: 0,
                box: 0,
                horse: 627,
            },
        };

        const horses = {
            Terrastone: 11,
            Aqualore: 22,
            Pyraflame: 67,
            Metallion: 234,
            Woodlyn: 1903,
        };

        const results = [];
        let index = 0;
        Object.keys(tickets).map((key) => {
            const ticket = tickets[key];
            const total = ticket.fail + ticket.box + ticket.horse;

            [...Array(total).keys()].forEach((_) => {
                let result = '';
                const randomLayer1 = startRandom({
                    box: ticket.box,
                    fail: ticket.fail,
                    horse: ticket.horse,
                });

                // decrease quantity
                tickets[key][randomLayer1] = tickets[key][randomLayer1] - 1;

                if (randomLayer1 === 'horse') {
                    result = startRandom(horses);
                    horses[result] = horses[result] - 1;
                } else {
                    result = randomLayer1;
                }
                index++;

                results.push({
                    index,
                    result: MapResult[result],
                    type: ticket.type,
                });
            });
        });

        console.log('results', results.length);

        const { root, tree } = makeMerkleTree(results);

        console.log('rootxxxxx', root);

        const dataWithLeafAndProof = results.map((item) => {
            const leaf = solidityKeccak256(['uint256', 'uint256'], [item.index, item.result]);

            const proof = tree.getHexProof(leaf);
            // }
            return {
                ...item,
                leaf,
                proof,
            };
        });

        const chuckData = chunk(dataWithLeafAndProof, 500);

        const promise = chuckData.map(async (chunkItem) => {
            return await TicketModel.insertMany(chunkItem, {
                lean: true,
            });
        });

        await Promise.all(promise);

        // // save data to db
        // await TicketModel.insertMany(dataWithLeafAndProof, {
        //     lean: true,
        // });

        res.status(200).json({
            root,
            // results
        });
    } catch (error) {
        console.log('error', error);
        res.status(httpStatus.BadRequest).send(error);
    }
});

module.exports = router;
