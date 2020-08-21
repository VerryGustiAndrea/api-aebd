// // const pointModels = require("../../models/transaction/point");
// const redeemModels = require("../../models/member/redeem");
// const MiscHelper = require("../../helpers/helpers");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// module.exports = {
//   checkMemberCard: (req, res) => {
//     //Check Valid QR
//     //time input
//     // console.log(req.body.OTQR.slice(0, 20));
//     let time = req.body.OTQR.slice(0, 24);
//     // console.log(24);
//     var now = new Date(time);
//     var minutes = 1;
//     let data = now.setTime(now.getTime() + minutes * 60 * 1000);

//     //   console.log("expired at ", new Date(data));
//     //   console.log("now ", new Date());

//     if (new Date() < new Date(data)) {
//       //Valid
//       let id_user = req.body.OTQR.slice(24);
//       // console.log(id_user);
//       redeemModels
//         .checkMemberRedeemSession(id_user)
//         .then((result) => {
//           // console.log(result);

//           let token = result[0].OTQR;
//           //check verify
//           let decoded = jwt.verify(token, "GenerasiOptimis");
//           // let id_user = decoded.id;

//           console.log(decoded);

//           //check OTQR in db
//           redeemModels
//             .checkOTQR(id_user)
//             .then((result) => {
//               // check OTQR
//               if ((result === undefined) | (result.length === 0)) {
//                 console.log("QR empty");
//                 MiscHelper.sessionExpried(res, err);
//               } else if (result[0].OTQR == token) {
//                 console.log("QR Valid");
//                 // let member_idQR = decoded.data.slice(0, 8);

//                 //check info Member
//                 redeemModels
//                   .checkMemberCard(id_user)
//                   .then((result) => {
//                     let dataCheck = result[0];
//                     if (result.length === 0) {
//                       return MiscHelper.responsesNull(res);
//                     } else {
//                       ///check member_id point
//                       pointModels
//                         .checkPoint(dataCheck.id_user)
//                         .then((e) => {
//                           if (e.length === 0) {
//                             let data = {
//                               id_user: dataCheck.id_user,
//                               name: dataCheck.name,
//                               email: dataCheck.email,
//                               type: dataCheck.type,
//                               phone: dataCheck.phone,
//                               member_id: dataCheck.member_id,
//                               total_point: 0,
//                             };
//                             return MiscHelper.responses(res, data);
//                           } else {
//                             let data = {
//                               id_user: dataCheck.id_user,
//                               name: dataCheck.name,
//                               email: dataCheck.email,
//                               type: dataCheck.type,
//                               phone: dataCheck.phone,
//                               member_id: dataCheck.member_id,
//                               total_point: e[0].total_point,
//                             };
//                             return MiscHelper.responses(res, data);
//                           }
//                         })
//                         .catch((err) => MiscHelper.badRequest(res, err));
//                     }
//                   })
//                   .catch((err) => MiscHelper.badRequest(res, err));
//               } else {
//                 console.log("QR Not Valid");
//                 MiscHelper.sessionExpried(res, err);
//               }
//             })
//             .catch((err) => MiscHelper.badRequest(res, err));
//         })
//         .catch((err) => MiscHelper.badRequest(res, err));
//     } else {
//       res.json({
//         message: "QR Expired",
//         status: false,
//         code: 200,
//       });
//     }
//   },

//   redeem: (req, res) => {
//     let id_user = req.body.id_user;
//     let itemPrice = req.body.itemPrice;
//     let total_point = req.body.total_point;
//     if (id_user.length > 0) {
//       if (parseInt(total_point) < parseInt(itemPrice)) {
//         console.log("ga cukup");
//         let data = {
//           total_point_member: total_point,
//           itemPrice: itemPrice,
//           needs: itemPrice - total_point + " points",
//         };
//         console.log("point ga cukup");
//         return MiscHelper.responsesCustom(
//           res,
//           data,
//           "member point is not enough",
//           false
//         );
//       } else {
//         console.log("cukup");
//         redeemModels
//           .redeem(id_user, itemPrice)
//           .then((result) => {
//             if (result.length === 0) {
//               return MiscHelper.responsesNull(res);
//             } else {
//               let data = {
//                 item_price: itemPrice,
//                 current_point: total_point - itemPrice,
//               };
//               return MiscHelper.responsesCustom(
//                 res,
//                 data,
//                 "Success Redeem item",
//                 true
//               );
//             }
//           })
//           .catch((err) => MiscHelper.badRequest(res, err));
//       }
//     } else {
//       return MiscHelper.responsesCustom(
//         res,
//         null,
//         "id_user cannot be empty",
//         false
//       );
//     }
//   },
// };
