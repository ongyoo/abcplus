var baseModel = require('./baseModel');
const uuidv4 = require('uuid/v4');

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
    callback(baseModel.responseJSON(null, err, true));
  });
}

// -- SignIn --//
function signin(email, password, callback) {
  let sqlString = 'SELECT user_id, user_name, user_lastname  FROM public."user" where public."user".user_email = '+"'"+email+"'"+' AND public."user".user_password = '+"'"+baseModel.sha256.x2(password)+"'"+'';
  //console.log(sqlString);
  //console.log(sqlString);
  baseModel.db.any(sqlString)
  .then(function (data) {
    var _data = data;
    _data[0].user_id = baseModel.cryptoEncode(data[0].user_id);
    console.log("signin Encode :" + _data);
    console.log("responsexxx : "+ JSON.stringify(_data));
    callback(baseModel.response(_data, null, false));
  })
  .catch(function (err) {
    //console.log(err);
    callback(baseModel.responseJSON(null, err, false));
  });
}

// -- SignUp --//
/*
INSERT INTO public."user"(user_name, user_password, user_email, user_lastname, user_tel) VALUES ('', '', '', '', '');
*/
function signup(body, callback) {
  verifyEmail(body.user_email,function(dataVerifyEmail) {
    console.log("dataVerifyEmail : "+ JSON.stringify(dataVerifyEmail));
    console.log("dataVerifyEmail xxxx: "+ dataVerifyEmail.data.isVerifyEmail);
    if (dataVerifyEmail.data.isVerifyEmail === false) {
      let sqlString = 'INSERT INTO public."user"(user_name, user_password, user_email, user_lastname, user_tel) VALUES ('+"'"+body.user_name+"'"+', '+"'"+baseModel.sha256.x2(body.user_password)+"'"+', '+"'"+body.user_email+"'"+', '+"'"+body.user_lastname+"'"+', '+"'"+body.user_tel+"'"+')';
      baseModel.db.any(sqlString)
      .then(function (data) {
        console.log(baseModel.defaultRespone('สมัครสำเร็จ กรุณาเช็คอีเมลเพื่อยืนยันตน'));
        callback(baseModel.responseJSON(baseModel.defaultRespone('สมัครสำเร็จ กรุณาเช็คอีเมลเพื่อยืนยันตน'), null));
      })
      .catch(function (err) {
        callback(baseModel.responseJSON(null, err, false));
      });
    } else {
      // To do 
      callback(baseModel.customResponseJSON(null, false, 401, "อีเมลนี้ถูกใช้งานไปแล้ว"));
    }
  })
  
}

// -- Get User Detail -- //
/*
select public."user".user_create_date, public."user".user_name, public."user".user_lastname, public."user".user_tel, public."user".user_is_active, public.role.role_id, public.role.role_name FROM public."user"
  JOIN public.role ON public."user".user_role_id = public.role.role_id WHERE public."user".user_id = '{f869cdc7-c726-da73-46f8-7c9002642d08}'
  */

  function userDetail(token, callback) {
    console.log("userDetail : " + baseModel.cryptoDecode(token));
    let sqlString = 'select public.user.user_create_date, public.user.user_name, public.user.user_lastname, public.user.user_tel, public.user.user_is_active, public.role.role_id, public.role.role_name FROM public.user'
    +' '+'JOIN public.role ON public."user".user_role_id = public.role.role_id WHERE public.user.user_id = '+"'{"+baseModel.cryptoDecode(token).toString()+"}'";
  //console.log(sqlString);
  baseModel.db.any(sqlString)
  .then(function (data) {
    callback(baseModel.response(data, null, false));
  })
  .catch(function (err) {
    callback(baseModel.responseJSON(null, err, false));
  });
}

function verifyEmail(email, callback) {
  let sqlString = 'SELECT public.user.user_id FROM public.user WHERE public.user.user_email = '+"'"+email+"'"+'';
  //console.log(sqlString);
  baseModel.db.any(sqlString)
  .then(function (data) {
    callback(baseModel.responseJSON(baseModel.customDefaultBoolRespone('isVerifyEmail',!baseModel.empty(data)), null));
  })
  .catch(function (err) {
    console.log(err);
    callback(baseModel.responseJSON(null, err));
  });

}

function checkDirectorySync(directory) {  
  try {
    fs.statSync(directory);
  } catch(e) {
    fs.mkdirSync(directory);
  }
}

module.exports = {
  getAllImageFeed: getAllImageFeed,
  checkDirectorySync: checkDirectorySync,
  signin: signin,
  signup: signup,
  userDetail: userDetail,
  authenError: baseModel.authenError
};
