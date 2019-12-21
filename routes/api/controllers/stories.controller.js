const Story = require('../../../models/Story');

exports.create = (req, res, next) => {
  try {
    console.log(req);
    res.json({
      message: 'Story created successfully'
    });

  } catch(err) {
    console.log(err);
    next(new Error(err));
  }
};
