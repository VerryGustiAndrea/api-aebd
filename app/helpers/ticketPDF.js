const PDFDocument = require("pdfkit");
const ticketPNG = require("./ticketPNG");

const fs = require("fs");

// Create a document
const doc = new PDFDocument({
  size: [475, 221],
  margins: {
    // by default, all are 72
    top: 5,
    bottom: 5,
    left: 5,
    right: 5,
  },
});

module.exports = {
  tickenOnly: async (data) => {
    let filename =
      "/home/pita/verry/works/redrubby/app/controllers/ticket/pdf" +
      "ticket" +
      new Date().toISOString() +
      ".pdf";

    doc.pipe(fs.createWriteStream(filename));

    doc
      .image("/home/pita/verry/works/redrubby/src/images/ticketbase-01.png", {
        fit: [465, 362],
        align: "center",
        // valign: "center",
      })
      //Event  "maks 12 character"
      .font(
        "/home/pita/verry/works/redrubby/app/helpers/fonts/Montserrat-ExtraBold.ttf"
      )
      .fontSize(22)
      .fill("#fff")
      .text(data.name_event, -245, 80, { align: "center", fit: [50, 50] })

      //Date Event
      .font(
        "/home/pita/verry/works/redrubby/app/helpers/fonts/Montserrat-Medium.ttf"
      )
      .fontSize(13)
      .fill("#fff")
      .text(data.date_event, -245, 115, { align: "center" })

      //Door Open
      .font(
        "/home/pita/verry/works/redrubby/app/helpers/fonts/Montserrat-Medium.ttf"
      )
      .fontSize(13)
      .fill("#fff")
      .text("Door Open ", 55, 135)

      //Clock
      .font(
        "/home/pita/verry/works/redrubby/app/helpers/fonts/Montserrat-ExtraBold.ttf"
      )
      .fontSize(13)
      .fill("#fff")
      .text(data.clock, 132, 135)

      //QR Image
      .image(data.QR_image, 300, 105, {
        fit: [70, 70],
        align: "center",
        valign: "center",
      })
      //   .rect(365, 245, 70, 70)
      //   .fillAndStroke("orange", "black")
      .link(300, 105, 70, 70, "http://google.com/")

      //Name
      .font(
        "/home/pita/verry/works/redrubby/app/helpers/fonts/Montserrat-Medium.ttf"
      )
      .fontSize(12)
      .fill("#000")
      .text(data.name, 200, 185, { align: "center" });

    doc.end();
    // return filename;
  },

  ticketTable: (data) => {
    let filename =
      "/home/pita/verry/works/redrubby/app/controllers/ticket/pdf" +
      "ticket" +
      new Date().toISOString() +
      ".pdf";
    doc.pipe(fs.createWriteStream(filename));

    doc
      .image(
        "/home/pita/verry/works/redrubby/src/images/tableticket-base-01.png",
        {
          fit: [465, 362],
          align: "center",
          // valign: "center",
        }
      )
      //Event  "maks 12 character"
      .font(
        "/home/pita/verry/works/redrubby/app/helpers/fonts/Montserrat-ExtraBold.ttf"
      )
      .fontSize(22)
      .fill("#fff")
      .text(data.name_event, -245, 80, { align: "center", fit: [50, 50] })

      //Date Event
      .font(
        "/home/pita/verry/works/redrubby/app/helpers/fonts/Montserrat-Medium.ttf"
      )
      .fontSize(13)
      .fill("#fff")
      .text(data.date_event, -245, 115, { align: "center" })

      //Door Open
      .font(
        "/home/pita/verry/works/redrubby/app/helpers/fonts/Montserrat-Medium.ttf"
      )
      .fontSize(13)
      .fill("#fff")
      .text("Door Open ", 55, 135)

      //Clock
      .font(
        "/home/pita/verry/works/redrubby/app/helpers/fonts/Montserrat-ExtraBold.ttf"
      )
      .fontSize(13)
      .fill("#fff")
      .text(data.clock, 132, 135)

      // Table No
      .font(
        "/home/pita/verry/works/redrubby/app/helpers/fonts/Montserrat-Medium.ttf"
      )
      .fontSize(16)
      .fill("#1c75bc")
      .text(data.type, 195, 55, { align: "center" })

      //QR Image
      .image(data.QR_image, 300, 105, {
        fit: [70, 70],
        align: "center",
        valign: "center",
      })
      .link(300, 105, 70, 70, "http://google.com/")

      //Name
      .font(
        "/home/pita/verry/works/redrubby/app/helpers/fonts/Montserrat-Medium.ttf"
      )
      .fontSize(12)
      .fill("#000")
      .text(data.name, 200, 185, { align: "center" });

    doc.end();
    return filename;
  },
};
