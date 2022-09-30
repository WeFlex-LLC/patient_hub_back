const nodemailer = require("nodemailer");

const orderMl=(host,items,orderId,amount,date,email)=>{
    let elems="";
    for(i=0;i<items.length;i++){
        elems+=`
            <div style="display:grid;width:200px; min-width:200px; border:1px solid gray; marfin-left:20px;margin-bottom:15px; border-radius:5px;">
                <img src="${host}/public/uploads/product/${items[i].product_name}/${items[i].id}/${items[i].img}" style="max-width:100%" />
                <p style="width:100%;text-align:center"><a style="color:#1b4538;" href="${host}/en/${items[i].product_name}/${items[i].url}">${items[i].title_en}</a></p>
                <p style="width:100%;text-align:center">${items[i].price} AMD</p>
            </div>
        `;
    }
    let transporter = nodemailer.createTransport({
        host: "smtp.beget.com",
        port: 2525,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'no-reply@ustian.com',
            pass: '%*1tgZ9G'
        }
    });
    
    transporter.sendMail({
        from: 'The House  <no-reply@ustian.com>',
        to: email,
        subject: 'Order Info',
        replyTo:'no-reply@ustian.com',
        html: 
        `<!doctype html>
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
          <head>
            <title>
              
            </title>
            <!--[if !mso]><!-- -->
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <!--<![endif]-->
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style type="text/css">
              #outlook a { padding:0; }
              .ReadMsgBody { width:100%; }
              .ExternalClass { width:100%; }
              .ExternalClass * { line-height:100%; }
              body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
              table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
              img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
              p { display:block;margin:13px 0; }
            </style>
            <!--[if !mso]><!-->
            <style type="text/css">
              @media only screen and (max-width:480px) {
                @-ms-viewport { width:320px; }
                @viewport { width:320px; }
              }
            </style>
            <!--<![endif]-->
            <!--[if mso]>
            <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
            <!--[if lte mso 11]>
            <style type="text/css">
              .outlook-group-fix { width:100% !important; }
            </style>
            <![endif]-->
            
          <!--[if !mso]><!-->
            <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
            <style type="text/css">
              @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
    @import url(https://fonts.googleapis.com/css?family=Cabin:400,700);
            </style>
          <!--<![endif]-->
    
        
            
        <style type="text/css">
          @media only screen and (min-width:480px) {
            .mj-column-per-100 { width:100% !important; max-width: 100%; }
          }
        </style>
        
      
            <style type="text/css">
            
            
    
        @media only screen and (max-width:480px) {
          table.full-width-mobile { width: 100% !important; }
          td.full-width-mobile { width: auto !important; }
        }
      
            </style>
            <style type="text/css">.hide_on_mobile { display: none !important;} 
            @media only screen and (min-width: 480px) { .hide_on_mobile { display: block !important;} }
            .hide_section_on_mobile { display: none !important;} 
            @media only screen and (min-width: 480px) { .hide_section_on_mobile { display: table !important;} }
            .hide_on_desktop { display: block !important;} 
            @media only screen and (min-width: 480px) { .hide_on_desktop { display: none !important;} }
            .hide_section_on_desktop { display: table !important;} 
            @media only screen and (min-width: 480px) { .hide_section_on_desktop { display: none !important;} }
            [owa] .mj-column-per-100 {
                width: 100%!important;
              }
              [owa] .mj-column-per-50 {
                width: 50%!important;
              }
              [owa] .mj-column-per-33 {
                width: 33.333333333333336%!important;
              }
              p {
                  margin: 0px;
              }
              @media only print and (min-width:480px) {
                .mj-column-per-100 { width:100%!important; }
                .mj-column-per-40 { width:40%!important; }
                .mj-column-per-60 { width:60%!important; }
                .mj-column-per-50 { width: 50%!important; }
                mj-column-per-33 { width: 33.333333333333336%!important; }
                }</style>
            
          </head>
          <body style="background-color:#F0F0F0;">
            
            
          <div style="background-color:#F0F0F0;">
            
          
          <!--[if mso | IE]>
          <table
             align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
          >
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
          <![endif]-->
        
          
          <div style="background:#FFFFFF;background-color:#FFFFFF;Margin:0px auto;max-width:600px;">
            
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#FFFFFF;background-color:#FFFFFF;width:100%;">
              <tbody>
                <tr>
                  <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
                    <!--[if mso | IE]>
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                    
            <tr>
          
                <td
                   class="" style="vertical-align:top;width:600px;"
                >
              <![endif]-->
                
          <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
            
          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
            
                <tr>
                  <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
                    
          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
            <tbody>
              <tr>
                <td style="width:600px;">
                  
          <img height="auto" src="https://cme.am/admin/uploads/email_logo.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;max-width: 200px;font-size:13px;" width="600">
        
                </td>
              </tr>
            </tbody>
          </table>
        
                  </td>
                </tr>
              
                <tr>
                  <td align="left" style="background:#FFFFFF;font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">
                    
          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:left;color:#000000;">
            <h2><span style="font-family: 'book antiqua', palatino, serif; font-size: 24px;">Dear customer thank you for shopping.</span></h2>
    <p><span style="font-family: 'book antiqua', palatino, serif; font-size: 18px;">You Can see order details below, and will receive additional emails about delivery in few minutes.</span></p>
    <p> </p>
    <p><span style="font-size: 16px; font-family: 'book antiqua', palatino, serif;">Order Details</span></p>
    <div> </div>
    <table style="height: 59px;" border="1" width="573">
    <tbody>
    <tr>
    <th style="text-align: center;">Order Id</th>
    <th style="text-align: center;">Total Amount</th>
    <th style="text-align: center;">Order Date</th>
    </tr>
    <tr>
    <td style="text-align: center;">${orderId}</td>
    <td style="text-align: center;">${amount} AMD</td>
    <td style="text-align: center;">${date}</td>
    </tr>
    </tbody>
    </table>
          </div>
        
                  </td>
                </tr>
              
                <tr>
                  <td style="font-size:0px;word-break:break-word;">
                    
          
        <!--[if mso | IE]>
        
            <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td height="50" style="vertical-align:top;height:50px;">
          
        <![endif]-->
      
          <div style="height:50px;">
            &nbsp;
          </div>
          
        <!--[if mso | IE]>
        
            </td></tr></table>
          
        <![endif]-->
      
        
                  </td>
                </tr>
              
                <tr>
                  <td align="center" vertical-align="middle" style="font-size:0px;padding:20px 20px 20px 20px;word-break:break-word;">
                    
          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
            <tr>
              <td align="center" bgcolor="#1b4538" role="presentation" style="border:0px solid #000;border-radius:4px;cursor:auto;mso-padding-alt:11px 32px 11px 32px;background:#1b4538;" valign="middle">
                <a href="${host}" style="display:inline-block;background:#1b4538;color:#ffffff;font-family:Ubuntu, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif;font-size:16px;font-weight:normal;line-height:100%;Margin:0;text-decoration:none;text-transform:none;padding:11px 32px 11px 32px;mso-padding-alt:0px;border-radius:4px;" target="_blank">
                  <div>Continue Shopping</div>
                </a>
              </td>
            </tr>
          </table>
        
                  </td>
                </tr>
              
                <tr>
                  <td style="font-size:0px;padding:10px 25px;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;word-break:break-word;">
                    
          <p style="border-top:solid 2px #b5813e;font-size:1;margin:0px auto;width:100%;">
          </p>
          
          <!--[if mso | IE]>
            <table
               align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 2px #b5813e;font-size:1;margin:0px auto;width:580px;" role="presentation" width="580px"
            >
              <tr>
                <td style="height:0;line-height:0;">
                  &nbsp;
                </td>
              </tr>
            </table>
          <![endif]-->
        
        
                  </td>
                </tr>
                    <div style="display:inline-block">
                        ${elems}
                    </div>
                <tr>
                  <td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">
                    
          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:left;color:#000000;">
            <h2><span style="font-family: 'book antiqua', palatino, serif; font-size: 24px;">Հարգելի հաճախորդ, շնորհակալություն գնումներ կատարելու համար</span></h2>
    <p><span style="font-family: 'book antiqua', palatino, serif; font-size: 18px;">Ստորև կարող եք տեսնել պատվերի մանրամասները և մի քանի րոպեից կստանաք առաքման վերաբերյալ լրացուցիչ էլ. նամակներ</span></p>
    <p> </p>
    <p><span style="font-size: 16px; font-family: 'book antiqua', palatino, serif;">Պատվերի Տվյալներ</span></p>
    <div> </div>
    <table style="height: 59px;" border="1" width="573">
    <tbody>
    <tr>
    <th style="text-align: center;">Պատվերի Id</th>
    <th style="text-align: center;">Ընդհանուր (AMD)</th>
    <th style="text-align: center;">Պատվերի Ամսատիվ</th>
    </tr>
    <tr>
    <td style="text-align: center;">${orderId}</td>
    <td style="text-align: center;">${amount} AMD</td>
    <td style="text-align: center;">${date}</td>
    </tr>
    </tbody>
    </table>
          </div>
        
                  </td>
                </tr>
              
                <tr>
                  <td style="font-size:0px;word-break:break-word;">
                    
          
        <!--[if mso | IE]>
        
            <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td height="50" style="vertical-align:top;height:50px;">
          
        <![endif]-->
      
          <div style="height:50px;">
            &nbsp;
          </div>
          
        <!--[if mso | IE]>
        
            </td></tr></table>
          
        <![endif]-->
      
        
                  </td>
                </tr>
              
                <tr>
                  <td align="center" vertical-align="middle" style="font-size:0px;padding:20px 20px 20px 20px;word-break:break-word;">
                    
          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
            <tr>
              <td align="center" bgcolor="#1b4538" role="presentation" style="border:0px solid #000;border-radius:4px;cursor:auto;mso-padding-alt:10px 30px 10px 30px;background:#1b4538;" valign="middle">
                <a href="${host}" style="display:inline-block;background:#1b4538;color:#ffffff;font-family:Ubuntu, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif;font-size:15px;font-weight:normal;line-height:100%;Margin:0;text-decoration:none;text-transform:none;padding:10px 30px 10px 30px;mso-padding-alt:0px;border-radius:4px;" target="_blank">
                  <div>Շարունակել գնումները</div>
                </a>
              </td>
            </tr>
          </table>
        
                  </td>
                </tr>
              
          </table>
        
          </div>
        
              <!--[if mso | IE]>
                </td>
              
            </tr>
          
                      </table>
                    <![endif]-->
                  </td>
                </tr>
              </tbody>
            </table>
            
          </div>
        
          
          <!--[if mso | IE]>
              </td>
            </tr>
          </table>
          <![endif]-->
        
        
          </div>
        
          </body>
        </html>`,
    }).then(info=>{
        return('Preview URL: ' + nodemailer.getTestMessageUrl(info));
    });
}

module.exports=orderMl;