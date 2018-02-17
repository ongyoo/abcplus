var baseModel = require('./baseModel');
const uuidv4 = require('uuid/v4');

/*
SELECT image_feed.user_id, image_feed.image_approved, image_feed.image_is_active, image_feed.image_feed_id, image_feed.image_timestamp, image_feed.image_id, 
image.user_id, image.image_approved, image.image_is_active, image.image_thumbnail_url, image.image_count_viewer, image.image_create_date, image.image_des, image.image_muti_url,
 public.user.user_first_name, public.user.user_last_name, public.user.user_email, public.user.user_profile_image_url
  FROM public.image_feed FULL OUTER JOIN public.image ON image_feed.image_id = image.image_id
    JOIN public.user ON image.user_id = public.user.user_id ORDER BY RANDOM();
    */
    function getAllImageFeed(callback) {
      let sqlString = 'SELECT image_feed.user_id, image_feed.image_approved, image_feed.image_is_active, image_feed.image_feed_id, image_feed.image_timestamp, image_feed.image_id,'+'image.user_id, image.image_approved, image.image_is_active, image.image_thumbnail_url, image.image_count_viewer, image.image_create_date, image.image_des, image.image_muti_url,'
      +'public.user.user_first_name, public.user.user_last_name, public.user.user_email, public.user.user_profile_image_url'
      +' '+'FROM public.image_feed FULL OUTER JOIN public.image ON image_feed.image_id = image.image_id'
      +' '+'JOIN public.user ON image.user_id = public.user.user_id ORDER BY RANDOM()';
  //console.log(sqlString);
  console.log(baseModel);
  baseModel.db.any(sqlString)
  .then(function (data) {
    callback(baseModel.response(data, null, true));
  })
  .catch(function (err) {
    callback(baseModel.response(null, err, true));
  });
}

function checkDirectorySync(directory) {  
  try {
    fs.statSync(directory);
  } catch(e) {
    fs.mkdirSync(directory);
  }
}


/*
function getAllImageFeed(req, res, next) {
  db.any('select * from image_feed')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL image_feed'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
*/

function getSinglePuppy(req, res, next) {
  var pupID = parseInt(req.params.id);
  baseModel.db.one('select * from pups where id = $1', pupID)
  .then(function (data) {
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Retrieved ONE puppy'
    });
  })
  .catch(function (err) {
    return next(err);
  });
}

function createPuppy(req, res, next) {
  req.body.age = parseInt(req.body.age);
  baseModel.db.none('insert into pups(name, breed, age, sex)' +
    'values(${name}, ${breed}, ${age}, ${sex})',
    req.body)
  .then(function () {
    res.status(200)
    .json({
      status: 'success',
      message: 'Inserted one puppy'
    });
  })
  .catch(function (err) {
    return next(err);
  });
}

function updatePuppy(req, res, next) {
  baseModel.db.none('update pups set name=$1, breed=$2, age=$3, sex=$4 where id=$5',
    [req.body.name, req.body.breed, parseInt(req.body.age),
    req.body.sex, parseInt(req.params.id)])
  .then(function () {
    res.status(200)
    .json({
      status: 'success',
      message: 'Updated puppy'
    });
  })
  .catch(function (err) {
    return next(err);
  });
}

function removePuppy(req, res, next) {
  var pupID = parseInt(req.params.id);
  baseModel.db.result('delete from pups where id = $1', pupID)
  .then(function (result) {
    /* jshint ignore:start */
    res.status(200)
    .json({
      status: 'success',
      message: `Removed ${result.rowCount} puppy`
    });
    /* jshint ignore:end */
  })
  .catch(function (err) {
    return next(err);
  });
}

module.exports = {
  getAllImageFeed: getAllImageFeed,
  checkDirectorySync: checkDirectorySync,
  authenError: baseModel.authenError
};
