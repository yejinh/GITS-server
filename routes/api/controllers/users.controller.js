const User = require('../../../models/User');
const Story = require('../../../models/Story');

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

exports.create = (req, res, next) => {
  try {
    const { title, cover, pages, date } = req.body;

    const type = 'jpg';
    const buffer = req.files.cover[0].buffer;

    console.log(buffer);
    res.json({
      message: 'Story created successfully'
    });

  } catch(err) {
    console.log(err);
    next(new Error(err));
  }
};
