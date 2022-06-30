const { profile , user} = require('../../models');

exports.getProfiles = async (req, res) => {
  try {
    const idUser = req.user.id;

    let data = await profile.findOne({
      where: {
        idUser,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idUser'],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = {
      ...data,
      image: data ? process.env.PATH_FILE + data.image : null,
    };

    res.send({
      status: 'success...',
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};
exports.getProfile = async (req, res) => {
  try {
      let profileData = await profile.findOne({
          where: {
              idUser: req.user.id
          },
          include: [
              {
                model: user,
                as: "user",
                attributes: {
                  exclude: ["createdAt", "updatedAt", "password"],
                },
              },
          ],
          attributes: {
              exclude: ['createdAt', 'updatedAt']
          }
      })

      profileData = JSON.parse(JSON.stringify(profileData));

      profileData = {
        ...profileData
      };

      res.send({
          status: 'success',
          data: profileData
      })
  } catch (error) {
      console.log(error)
      res.send({
          status: 'failed',
          message: 'Server Error'
      })
  }
}
// exports.getProfile = async (req, res) => {
//   try {

//     const { id } = req.params;

//     const data = await profile.findOne({
//       where: {
//           id,
//       },
//       attributes: {
//         exclude: ["password", "createdAt", "updatedAt"],
//       },
//     });

//     res.send({
//       status: "success",
//       data: {
//         data,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.send({
//       status: "failed",
//       message: "Server Error",
//     });
//   }
// };
exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(req.file)


    const data = {
      phone: req?.body?.phone,
      gender: req?.body?.gender,
      address: req?.body?.address,
      image: req?.file?.filename,
      idUser: req?.user?.id,
    };

    await profile.update(data, {
      where: {
        idUser:id,
      },
    });

    res.send({
      status: "success",
      data: {
        data,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};