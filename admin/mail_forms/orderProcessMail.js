const nodemailer = require("nodemailer");

const orderMl=(host,orderId,email)=>{

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
          <body style="background-color:#FFFFFF;">
            
            
          <div style="background-color:#FFFFFF;">
            
          
          <!--[if mso | IE]>
          <table
             align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
          >
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
          <![endif]-->
        
          
          <div style="background:#F6F6F6;background-color:#F6F6F6;Margin:0px auto;max-width:600px;">
            
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#F6F6F6;background-color:#F6F6F6;width:100%;">
              <tbody>
                <tr>
                  <td style="border:0px #8c563d dotted;direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
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
                  <td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">
                    
          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:left;color:#000000;">
            <div><span style="font-family: 'book antiqua', palatino, serif;"><strong><span style="font-size: 24px;">Dear customer thank you for waiting.</span></strong></span></div>
    <div> </div>
    <div>
    <div><span style="font-size: 18px; font-family: 'book antiqua', palatino, serif;">Yor Order: ${orderId}, is on the way, our courier will be arrived in the next few minutes</span></div>
    <div> </div>
    <div><span style="font-size: 15px; font-family: 'book antiqua', palatino, serif;">You will receive additional email and phone call about delivery</span></div>
    <div> </div>
    </div>
          </div>
        
                  </td>
                </tr>
              
                <tr>
                  <td align="center" vertical-align="middle" style="font-size:0px;padding:21px 21px 21px 21px;word-break:break-word;">
                    
          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;width:auto;line-height:100%;">
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
                    
          <p style="border-top:solid 3px #8c563d;font-size:1;margin:0px auto;width:100%;">
          </p>
          
          <!--[if mso | IE]>
            <table
               align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 3px #8c563d;font-size:1;margin:0px auto;width:580px;" role="presentation" width="580px"
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
              
                <tr>
                  <td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">
                    
          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:left;color:#000000;">
            <div><strong><span style="font-family: 'book antiqua', palatino, serif; font-size: 24px;">Հարգելի հաճախորդ, շնորհակալություն սպասելու համար</span></strong></div>
    <div> </div>
    <div>
    <div><span style="font-size: 18px; font-family: 'book antiqua', palatino, serif;">Ձեր պատվերը (${orderId}) արդեն ճանապարհին է, այն կհասնի առաջիկա րոպեների ընդացքում։</span></div>
    <div> </div>
    <div><span style="font-size: 15px; font-family: 'book antiqua', palatino, serif;">Դուք կստանաք լրացուցիչ էլ․ փոստ և զանգ առաքիչի կողմից առաքման ավարտի վերաբերյալ</span></div>
    </div>
          </div>
        
                  </td>
                </tr>
              
                <tr>
                  <td align="center" vertical-align="middle" style="font-size:0px;padding:20px 20px 20px 20px;word-break:break-word;">
                    
          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
            <tr>
              <td align="center" bgcolor="#1b4538" role="presentation" style="border:0px solid #000;border-radius:4px;cursor:auto;mso-padding-alt:11px 32px 11px 32px;background:#1b4538;" valign="middle">
                <a href="${host}" style="display:inline-block;background:#1b4538;color:#ffffff;font-family:Ubuntu, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif;font-size:16px;font-weight:normal;line-height:100%;Margin:0;text-decoration:none;text-transform:none;padding:11px 32px 11px 32px;mso-padding-alt:0px;border-radius:4px;" target="_blank">
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