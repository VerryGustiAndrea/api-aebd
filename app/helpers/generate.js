const ticketPDF = require("../controllers/ticket/ticketPDF");
const ticketPNG = require("./ticketPNG");
const PDF2Pic = require("pdf2pic");
const svg = require("../controllers/ticket/createsvg.js");

//Sample Ticket Only
// let data = {
//   name_event: "DJ SODA",
//   date_event: "31 Augst 2020",
//   clock: "9 PM",
//   QR_image: "/home/pita/verry/works/redrubby/src/images/download.png",
//   name: "Khairina Efia Putri",
// };

//Sample Ticket Table
// let data = {
//   name_event: "DJ SODA",
//   date_event: "31 Augst 2020",
//   clock: "9 PM",
//   type: "TABLE 6",
//   QR_image: "/home/pita/verry/works/redrubby/src/images/download.png",
//   name: "Briyan Sitinjak",
// };

// ticketPDF.ticketTable(data);
// ticketPNG.convertPNG(data);

//svg data

svg.createTicket();
