const User = require('../../../models/User');
const Story = require('../../../models/Story');
const AWS = require('aws-sdk');
require('dotenv').config();

exports.getLoggedInUser = (req, res, next) => {
  try {
    res.json({
      message: 'User found successfully',
      user: res.locals.userData
    });
  } catch(err) {
    console.log(err);
    next(new Error(err));
  }
};

exports.create = async(req, res, next) => {
  try {
    const userId = req.params.user_id;
    const { title, texts, audioUrls, date } = req.body;
    const locations = [];

    const cover = req.files.cover[0];
    const pages = req.files['pages[]'];

    const s3 = new AWS.S3({
      accessKeyId:  process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });

    await pages.map(page => {
      const pageParams = {
        Bucket: process.env.AWS_BUCKET,
        Key: `pages/${userId}_${date}_${page.originalname}`,
        Body: page.buffer,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: page.mimetype
      };

      s3.upload(pageParams, (err, data) => {
        if (err) {
          throw new Error('s3 upload failed');
        }

        locations.push(data.Location);

        if (locations.length === pages.length + 1) {
          console.log(locations, 'there');
          saveStory(locations);
        }
      });
    });

    const coverParams = {
      Bucket: process.env.AWS_BUCKET,
      Key: `book-cover/${userId}_${date}_${cover.originalname}`,
      Body: cover.buffer,
      ACL: 'public-read',
      ContentEncoding: 'base64',
      ContentType: cover.mimetype
    };

    await s3.upload(coverParams, (err, data) => {
      if (err) {
        throw new Error('s3 upload failed');
      }

      locations.push(data.Location);

      if (locations.length === pages.length + 1) {
        console.log(locations, 'here');
        saveStory(locations);
      }
    });

    const saveStory = async(locations) => {
      const newStory = await new Story({
        created_by: userId,
        title: title,
        cover: locations[0],
        pages: texts.map((text, i) => ({
          page_number: i + 1,
          text: text,
          audio: audioUrls[i],
          content: locations[i + 1]
        }))
      }).save();

      await User.updateOne(
        { _id: userId },
        { $addToSet: { my_stories : newStory._id }
      });

      res.json({
        message: 'Story created successfully'
      });
    };

  } catch(err) {
    console.log(err);
    next(new Error(err));
  }
};

exports.getMyStories = async(req, res, next) => {
  try {
    const userId = req.params.user_id;

    console.log(userId);
    res.json({
      message: 'My stories found successfully'
    });
  } catch(err) {
    console.log(err);
    next(new Error(err));
  }
};
