const URL = require("../models/url.model")

const generateNewShortURL = async (req,res)=>{
    const {nanoid} = await import("nanoid");
    if (!req.body.url) return res.status(400).json({error:"url is required"})
    const redirectURL = req.body.url;
    const shortID = nanoid(10);
    try{
    const newURL = new URL({shortID, redirectURL, visits:[]});
    newURL.save();
    res.status(201).json({message: "Short URL created", shorturl: newURL});
    } catch (error){
        console.error('error in creating short url', error);
        res.status(500).json({error: 'failed to create short url'});
    }
}

const geturl = async (req,res)=>{
    const shortID = req.params.shortID;
    const originalurl = await URL.findOneAndUpdate({shortID}, {$push: {visits: {timestamp: Date.now()}}})
    // res.status(201).json({originalurl:originalurl.toJSON()});
    res.redirect(originalurl.redirectURL);
}


module.exports = {generateNewShortURL, geturl};