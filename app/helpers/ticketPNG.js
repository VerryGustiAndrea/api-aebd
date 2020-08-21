const PDF2Pic = require("pdf2pic");

module.exports = {
  convertPNG: async (pdf) => {
    // console.log(pdf.toString());
    // console.log("ini" + `"${pdf}"`);
    const PDF2Pic = require("pdf2pic");
    const pdf2pic = new PDF2Pic({
      density: 100, // output pixels per inch
      savename: "ticket" + new Date(), // output file name
      savedir: "./images", // output file location
      format: "png", // output file format
      size: "600x600", // output size in pixels
    });

    await pdf2pic
      .convert(
        "/home/pita/verry/works/redrubby/app/controllers/ticket/pdf/ticket2020-08-12T06:24:24.668Z.pdf"
      )
      .then((resolve) => {
        console.log("image converter successfully!");

        // return pdf2pic.options.savedir + "/" + pdf2pic.options.savename;
      });
  },
};
