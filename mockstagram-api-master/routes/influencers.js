import {influencerService} from "../src/influencer/influencer.service";
import {suspiciousInfluencerClassifier} from "../src/classifier/suspicious-influencer";
import {Influencer, InfluencerModel, randn} from "../src/influencer/influencer.model";

const express = require('express');
const router = express.Router();

/* GET user  */
router.get('/:pk', function(req, res, next) {
    res.json(influencerService.get(+req.params.pk));
});

router.post('/is_suspicious', function(req, res, next) {
    const influencer = req.body;
    setTimeout(() => {
        res.json({
            pk: influencer.pk,
            suspicious: suspiciousInfluencerClassifier.classify(influencer)
        })
    }, randomDelay())
});

function randomDelay() {
    return 1000 + 1000 * randn();
}

module.exports = router;
