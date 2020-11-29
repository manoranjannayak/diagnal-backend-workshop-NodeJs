/**
 * This files includes all the functions which controls the projects.
 * 
 * @since 1.0.0
 */

const axios = require('axios');
const cheerio = require('cheerio');

//Get the data from the metatag by the given URL.
exports.getMetaData = async ( req, res) => {
    try {
        let url = req.body.url;
        if(!url){
          return res.status(404).send("Please provide the URL")
        }
        await axios.get(url)
        .then(async (response) => {
            const $ = await cheerio.load(response.data);
              let obj = {}

              // Get Title
              if($('title').length > 0){
                obj.title = $('title').text().replace(/\s+/g, " ")
              }else if($('meta[name="title"]').length > 0){
                obj.title = $('meta[name="title"]').attr('content').replace(/\s+/g, " ")
              }else if($('meta[property="og:title"]').length > 0){
                obj.title = $('meta[property="og:title"]').attr('content').replace(/\s+/g, " ")
              }

              // Get Description
              if($('meta[name="description"]').length > 0){
                obj.description = $('meta[name="description"]').attr('content').replace(/\s+/g, " ")
              }else if($('meta[property="og:description"]').length > 0){
                obj.description = $('meta[property="og:description"]').attr('content').replace(/\s+/g, " ");
              }

              // Get Image
              if($('meta[property="og:image"]').length > 0){
                obj.image = $('meta[property="og:image"]').attr('content');
              }

              // Get Url
              if($('meta[property="og:url"]').length > 0){
                obj.url = $('meta[property="og:url"]').attr('content');
              }

              // Get Site name
              if($('meta[property="og:site_name"]').length > 0){
                obj.sitename = $('meta[property="og:site_name"]').attr('content').replace(/\s+/g, " ");
              }

              // Get Type
              if($('meta[property="og:type"]').length > 0){
                obj.type = $('meta[property="og:type"]').attr('content');
              }
          return res.status(200).send(obj);
        })
        .catch(function (error) {
          // Page not found error.
          if(error){
            res.status(404).send("Page Not Found");
          }
        })
    } catch (err){
      // Caching error.
      res.status(400).send(err);
    }
}