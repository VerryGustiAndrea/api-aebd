module.exports = {
  point: (name, payment_date, pointGet, total_price, totalPoint) => {
    let pointInfo =
      `<!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Simple Transactional Email</title>
        <style>
          @font-face {
            font-family: "Montserrat";
            font-style: normal;
            font-weight: 100;
            font-display: swap;
            src: local("Montserrat Thin"), local("Montserrat-Thin"),
              url(https://fonts.gstatic.com/s/montserrat/v14/JTUQjIg1_i6t8kCHKm45_QpRxC7mw9c.woff2)
                format("woff2");
            unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF,
              U+A640-A69F, U+FE2E-FE2F;
          }
          @font-face {
            font-family: "Montserrat";
            font-style: normal;
            font-weight: 100;
            font-display: swap;
            src: local("Montserrat Thin"), local("Montserrat-Thin"),
              url(https://fonts.gstatic.com/s/montserrat/v14/JTUQjIg1_i6t8kCHKm45_QpRzS7mw9c.woff2)
                format("woff2");
            unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
          }
          @font-face {
            font-family: "Montserrat";
            font-style: normal;
            font-weight: 100;
            font-display: swap;
            src: local("Montserrat Thin"), local("Montserrat-Thin"),
              url(https://fonts.gstatic.com/s/montserrat/v14/JTUQjIg1_i6t8kCHKm45_QpRxi7mw9c.woff2)
                format("woff2");
            unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169,
              U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
          }
          @font-face {
            font-family: "Montserrat";
            font-style: normal;
            font-weight: 100;
            font-display: swap;
            src: local("Montserrat Thin"), local("Montserrat-Thin"),
              url(https://fonts.gstatic.com/s/montserrat/v14/JTUQjIg1_i6t8kCHKm45_QpRxy7mw9c.woff2)
                format("woff2");
            unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
              U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
          }
          @font-face {
            font-family: "Montserrat";
            font-style: normal;
            font-weight: 100;
            font-display: swap;
            src: local("Montserrat Thin"), local("Montserrat-Thin"),
              url(https://fonts.gstatic.com/s/montserrat/v14/JTUQjIg1_i6t8kCHKm45_QpRyS7m.woff2)
                format("woff2");
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
              U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
              U+2212, U+2215, U+FEFF, U+FFFD;
          }
          @font-face {
            font-family: "Montserrat";
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: local("Montserrat Regular"), local("Montserrat-Regular"),
              url(https://fonts.gstatic.com/s/montserrat/v14/JTUSjIg1_i6t8kCHKm459WRhyzbi.woff2)
                format("woff2");
            unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF,
              U+A640-A69F, U+FE2E-FE2F;
          }
          @font-face {
            font-family: "Montserrat";
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: local("Montserrat Regular"), local("Montserrat-Regular"),
              url(https://fonts.gstatic.com/s/montserrat/v14/JTUSjIg1_i6t8kCHKm459W1hyzbi.woff2)
                format("woff2");
            unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
          }
          @font-face {
            font-family: "Montserrat";
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: local("Montserrat Regular"), local("Montserrat-Regular"),
              url(https://fonts.gstatic.com/s/montserrat/v14/JTUSjIg1_i6t8kCHKm459WZhyzbi.woff2)
                format("woff2");
            unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169,
              U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
          }
          @font-face {
            font-family: "Montserrat";
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: local("Montserrat Regular"), local("Montserrat-Regular"),
              url(https://fonts.gstatic.com/s/montserrat/v14/JTUSjIg1_i6t8kCHKm459Wdhyzbi.woff2)
                format("woff2");
            unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
              U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
          }
          @font-face {
            font-family: "Montserrat";
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: local("Montserrat Regular"), local("Montserrat-Regular"),
              url(https://fonts.gstatic.com/s/montserrat/v14/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2)
                format("woff2");
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
              U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
              U+2212, U+2215, U+FEFF, U+FFFD;
          }
          @font-face {
            font-family: "Montserrat";
            font-style: normal;
            font-weight: 800;
            font-display: swap;
            src: local("Montserrat ExtraBold"), local("Montserrat-ExtraBold"),
              url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_c5H3gTD_u50.woff2)
                format("woff2");
            unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF,
              U+A640-A69F, U+FE2E-FE2F;
          }
          @font-face {
            font-family: "Montserrat";
            font-style: normal;
            font-weight: 800;
            font-display: swap;
            src: local("Montserrat ExtraBold"), local("Montserrat-ExtraBold"),
              url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_c5H3g3D_u50.woff2)
                format("woff2");
            unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
          }
          @font-face {
            font-family: "Montserrat";
            font-style: normal;
            font-weight: 800;
            font-display: swap;
            src: local("Montserrat ExtraBold"), local("Montserrat-ExtraBold"),
              url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_c5H3gbD_u50.woff2)
                format("woff2");
            unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169,
              U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
          }
          @font-face {
            font-family: "Montserrat";
            font-style: normal;
            font-weight: 800;
            font-display: swap;
            src: local("Montserrat ExtraBold"), local("Montserrat-ExtraBold"),
              url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_c5H3gfD_u50.woff2)
                format("woff2");
            unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
              U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
          }
          @font-face {
            font-family: "Montserrat";
            font-style: normal;
            font-weight: 800;
            font-display: swap;
            src: local("Montserrat ExtraBold"), local("Montserrat-ExtraBold"),
              url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_c5H3gnD_g.woff2)
                format("woff2");
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
              U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
              U+2212, U+2215, U+FEFF, U+FFFD;
          }
        </style>
        <style>
          @media only screen and (max-width: 620px) {
            table[class="body"] h1 {
              font-size: 28px !important;
              margin-bottom: 10px !important;
            }
            table[class="body"] p,
            table[class="body"] ul,
            table[class="body"] ol,
            table[class="body"] td,
            table[class="body"] span,
            table[class="body"] a {
              font-size: 16px !important;
            }
            table[class="body"] .wrapper,
            table[class="body"] .article {
              padding: 10px !important;
            }
            table[class="body"] .content {
              padding: 0 !important;
            }
            table[class="body"] .container {
              padding: 0 !important;
              width: 100% !important;
            }
            table[class="body"] .main {
              border-left-width: 0 !important;
              border-radius: 0 !important;
              border-right-width: 0 !important;
            }
            table[class="body"] .btn table {
              width: 100% !important;
            }
            table[class="body"] .btn a {
              width: 100% !important;
            }
            table[class="body"] .img-responsive {
              height: auto !important;
              max-width: 100% !important;
              width: auto !important;
            }
          }
    
          @media all {
            .ExternalClass {
              width: 100%;
            }
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td,
            .ExternalClass div {
              line-height: 100%;
            }
            .apple-link a {
              color: inherit !important;
              font-family: inherit !important;
              font-size: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
              text-decoration: none !important;
            }
            #MessageViewBody a {
              color: inherit;
              text-decoration: none;
              font-size: inherit;
              font-family: inherit;
              font-weight: inherit;
              line-height: inherit;
            }
          }
        </style>
      </head>
      <body
        class=""
        style="
          font-family: 'Montserrat', sans-serif;
          -webkit-font-smoothing: antialiased;
          font-size: 14px;
          line-height: 1.4;
          margin: 0;
          padding: 0;
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
        "
      >
        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          class="body"
          style="
            border-collapse: separate;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            width: 100%;
          "
        >
          <tr>
            <td
              style="
                font-family: 'Montserrat', sans-serif;
                font-size: 14px;
                vertical-align: top;
              "
            >
              &nbsp;
            </td>
            <td
              class="container"
              style="
                font-family: 'Montserrat', sans-serif;
                font-size: 14px;
                vertical-align: top;
                display: block;
                margin: 0 auto;
                max-width: 580px;
                padding: 10px;
                width: 580px;
              "
            >
              <div
                class="content"
                style="
                  box-sizing: border-box;
                  display: block;
                  margin: 0 auto;
                  max-width: 580px;
                  padding: 10px;
                "
              >
                <div
                  style="
                    display: block;
                    width: 80%;
                    max-width: 140px;
                    margin: 0 auto;
                    padding-top: 40px;
                  "
                  class="image-container"
                >
                  <img
                    style="width: 100%;"
                    src="https://redruby.club/wp-content/uploads/2020/08/logo-red-ruby.png"
                    alt=""
                  />
                </div>
              </div>
              <div
                class="content"
                style="
                  box-sizing: border-box;
                  display: block;
                  margin: 0 auto;
                  max-width: 580px;
                  padding: 10px;
                "
              >
                <span
                  class="preheader"
                  style="
                    color: transparent;
                    display: none;
                    height: 0;
                    max-height: 0;
                    max-width: 0;
                    opacity: 0;
                    overflow: hidden;
                    mso-hide: all;
                    visibility: hidden;
                    width: 0;
                  "
                  >This is preheader text. Some clients will show this text as a
                  preview.</span
                >
                <table
                  class="main"
                  style="
                    border-collapse: separate;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    width: 100%;
                    border-radius: 3px;
                  "
                >
                  <tr>
                    <td
                      class="wrapper"
                      style="
                        font-family: 'Montserrat', sans-serif;
                        font-size: 14px;
                        vertical-align: top;
                        box-sizing: border-box;
                        padding: 20px;
                      "
                    >
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        style="
                          border-collapse: separate;
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          width: 100%;
                        "
                      >
                        <tr>
                          <td
                            style="
                              font-family: 'Montserrat', sans-serif;
                              font-size: 14px;
                              vertical-align: top;
                            "
                          >
                            <p
                              style="
                                font-family: 'Montserrat', sans-serif;
                                font-size: 14px;
                                font-weight: normal;
                                margin: 0;
                                margin-bottom: 15px;
                                line-height: 2em;
                              "
                            >
                              Hi <span style="color: #be1e2d;">` +
      name +
      `</span>,
      Thank you for spending your day at our group. 
      Congratulations, you earn
      ` +
      pointGet +
      `points from your last purchase of IDR` +
      total_price +
      `Your total points:` +
      totalPoint +
      `(as of (` +
      payment_date +
      `)).
      
                            </p>
                            <p
                              style="
                                font-family: 'Montserrat', sans-serif;
                                font-size: 14px;
                                font-weight: normal;
                                margin: 0;
                                margin-bottom: 15px;
                                line-height: 2em;
                              "
                            >
                            Earn more points, something special awaits you! 
                            </p>


                            <p
                              style="
                                font-family: 'Montserrat', sans-serif;
                                font-size: 14px;
                                font-weight: normal;
                                margin: 0;
                                margin-bottom: 15px;
                                line-height: 2em;
                              "
                            >
                            Warm Regards,

Red Ruby Group.

                            </p>
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="btn btn-primary"
                              style="
                                border-collapse: separate;
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                width: 100%;
                                box-sizing: border-box;
                              "
                            >
                              <tbody>
                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      font-family: 'Montserrat', sans-serif;
                                      font-size: 14px;
                                      vertical-align: top;
                                      padding-bottom: 15px;
                                    "
                                  >
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      style="
                                        border-collapse: separate;
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        width: auto;
                                      "
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            style="
                                              font-family: 'Montserrat', sans-serif;
                                              font-size: 14px;
                                              vertical-align: top;
                                              border-radius: 5px;
                                              text-align: center;
                                            "
                                          ></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <p
                              style="
                                font-family: 'Montserrat', sans-serif;
                                font-size: 14px;
                                font-weight: normal;
                                margin: 0;
                                margin-bottom: 15px;
                                line-height: 2em;
                              "
                            >
                              Separated they live in Bookmarksgrove right at the
                              coast of the Semantics, a large language ocean. A
                              small river named Duden flows by their place and
                              supplies it with the necessary regelialia. It is a
                              paradisematic country, in which roasted parts of
                              sentences fly into your mouth.
                            </p>
                            <p
                              style="
                                font-family: 'Montserrat', sans-serif;
                                font-size: 14px;
                                font-weight: normal;
                                margin: 0;
                                margin-bottom: 15px;
                                line-height: 2em;
                              "
                            >
                              Good luck! Hope this is works.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="wrapper"
                      style="
                        font-family: 'Montserrat', sans-serif;
                        font-size: 14px;
                        vertical-align: top;
                        box-sizing: border-box;
                        padding: 20px;
                      "
                    >
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        style="
                          border-collapse: separate;
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          width: 200px;
                          margin: auto;
                        "
                      >
                        <tr>
                          <td>
                            <div style="width: 40px; margin: auto;">
                              <a
                                href="#"
                                style="
                                  width: 100%;
                                  text-align: center;
                                  display: block;
                                  margin-right: -10px;
                                "
                              >
                              <img
                                style="display: inline-block; width: 100%;"
                                src="https://redruby.club/wp-content/uploads/2020/08/logo-facebook.png"
                                alt=""
                              />
                              </a>
                            </div>
                          </td>
                          <td>
                            <div style="width: 40px; margin: auto;">
                              <a
                                href="#"
                                style="
                                  width: 100%;
                                  text-align: center;
                                  display: block;
                                "
                              >
                                <img
                                  style="display: inline-block; width: 100%;"
                                  src="https://redruby.club/wp-content/uploads/2020/08/logo-instagram.png"
                                  alt=""
                                />
                              </a>
                            </div>
                          </td>
                          <td>
                            <div style="width: 40px; margin: auto;">
                              <a
                                href="#"
                                style="
                                  width: 100%;
                                  text-align: center;
                                  display: block;
                                "
                              >
                                <img
                                  style="display: inline-block; width: 100%;"
                                  src="https://redruby.club/wp-content/uploads/2020/08/logo-twitter.png"
                                  alt=""
                                />
                              </a>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <div
                  class="footer"
                  style="
                    clear: both;
                    margin-top: 10px;
                    text-align: center;
                    width: 100%;
                  "
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      border-collapse: separate;
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      width: 100%;
                    "
                  >
                    <tr>
                      <td
                        class="content-block"
                        style="
                          font-family: 'Montserrat', sans-serif;
                          vertical-align: top;
                          padding-bottom: 10px;
                          padding-top: 10px;
                          font-size: 12px;
                          text-align: center;
                        "
                      >
                        <span
                          class="apple-link"
                          style="font-size: 12px; text-align: center;"
                          >Jl. Petitenget No. 919, Seminyak, Badung, Bali
                          80361</span
                        >
                        <br />
                        Don't like these emails?
                        <a
                          href="http://i.imgur.com/CScmqnj.gif"
                          style="
                            text-decoration: underline;
                            font-size: 12px;
                            text-align: center;
                          "
                          >Unsubscribe</a
                        >.
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </td>
            <td
              style="
                font-family: 'Montserrat', sans-serif;
                font-size: 14px;
                vertical-align: top;
              "
            >
              &nbsp;
            </td>
          </tr>
        </table>
      </body>
    </html>
    `;
    return pointInfo;
  },
};
