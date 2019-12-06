const User = require('../../../models/User');

exports.getLoggedInUser = (req, res, next) => {
  try {
    res.json({
      message: 'User Found successfully',
      user: res.locals.userData
    });
  } catch(err) {
    console.log(err);
    next(new Error(err));
  }
};
