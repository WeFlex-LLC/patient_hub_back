const EmailVerifySignIn = (HOST, email, token) => {
    return(
        `
        <!doctype html>
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
          body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
          table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
          img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
          p { display:block;margin:13px 0; }
        </style>
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
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet" type="text/css">
<link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
<link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
        <style type="text/css">
          @import url(https://fonts.googleapis.com/css?family=Roboto:400,700);
@import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
@import url(https://fonts.googleapis.com/css?family=Cabin:400,700);
        </style>
      <!--<![endif]-->

    
        
    <style type="text/css">
      @media only screen and (max-width:480px) {
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
        @media only screen and (min-width: 480px) { 
            .hide_section_on_mobile { 
                display: table !important;
            } 

            div.hide_section_on_mobile { 
                display: block !important;
            }
        }
        .hide_on_desktop { display: block !important;} 
        @media only screen and (min-width: 480px) { .hide_on_desktop { display: none !important;} }
        .hide_section_on_desktop { display: table !important;} 
        @media only screen and (min-width: 480px) { .hide_section_on_desktop { display: none !important;} }
        
          p, h1, h2, h3 {
              margin: 0px;
          }

          a {
              text-decoration: none;
              color: inherit;
          }

          @media only screen and (max-width:480px) {

            .mj-column-per-100 { width:100%!important; max-width:100%!important; }
            .mj-column-per-100 > .mj-column-per-75 { width:75%!important; max-width:75%!important; }
            .mj-column-per-100 > .mj-column-per-60 { width:60%!important; max-width:60%!important; }
            .mj-column-per-100 > .mj-column-per-50 { width:50%!important; max-width:50%!important; }
            .mj-column-per-100 > .mj-column-per-40 { width:40%!important; max-width:40%!important; }
            .mj-column-per-100 > .mj-column-per-33 { width:33.333333%!important; max-width:33.333333%!important; }
            .mj-column-per-100 > .mj-column-per-25 { width:25%!important; max-width:25%!important; }

            .mj-column-per-100 { width:100%!important; max-width:100%!important; }
            .mj-column-per-75 { width:100%!important; max-width:100%!important; }
            .mj-column-per-60 { width:100%!important; max-width:100%!important; }
            .mj-column-per-50 { width:100%!important; max-width:100%!important; }
            .mj-column-per-40 { width:100%!important; max-width:100%!important; }
            .mj-column-per-33 { width:100%!important; max-width:100%!important; }
            .mj-column-per-25 { width:100%!important; max-width:100%!important; }
        }</style>
        
      </head>
      <body style="background-color:#FFFFFF;">
        
        
      <div style="background-color:#FFFFFF;">
        
      
      <!--[if mso | IE]>
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:640px;" width="640"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
    
      
      <div style="margin:0px auto;max-width:640px;">
        
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;">
                <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
            <td
               class="" style="vertical-align:top;width:640px;"
            >
          <![endif]-->
            
      <div class="mj-column-per-100 outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
        
            <tr>
              <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
                
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
        <tbody>
          <tr>
            <td style="width:640px;">
              
            <img height="auto" src="https://patienthub.am/admin/uploads/email_logo.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;max-width: 200px;font-size:13px;" width="500">
    
            </td>
          </tr>
        </tbody>
      </table>
    
              </td>
            </tr>
          
            <tr>
              <td align="left" style="font-size:0px;padding:15px 25px 15px 25px;word-break:break-word;">
                
      <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.8;text-align:left;color:#000000;"><p style="font-family: Ubuntu, Helvetica, Arial;"><span style="font-size: 14px; font-family: Roboto, Tahoma, sans-serif;">Հարգելի օգտատեր,&nbsp;</span></p>
<p style="font-family: Ubuntu, Helvetica, Arial;">&nbsp;</p>
<p style="font-family: Ubuntu, Helvetica, Arial;"><span style="font-size: 14px; font-family: Roboto, Tahoma, sans-serif;">Շնորհակալություն patienthub.am առցանց դասընթացների և թեսթավորման համակարգում հաշիվ գրանցելու համար:</span><br><span style="font-size: 14px; font-family: Roboto, Tahoma, sans-serif;">Հաշիվը վավերացնելու համար, սեղմեք այստեղ&nbsp;&nbsp;</span></p>
<p style="font-family: Ubuntu, Helvetica, Arial;">&nbsp;</p></div>
    
              </td>
            </tr>
          
            <tr>
              <td align="left" vertical-align="middle" style="font-size:0px;padding:20px 20px 20px 25px;word-break:break-word;">
                
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
        <tr>
          <td align="center" bgcolor="#3C72F6" role="presentation" style="border:none;border-radius:8px;cursor:auto;mso-padding-alt:9px 26px 9px 26px;background:#566fab;" valign="middle">
            <a href="${HOST}/api/user/verify/?email=${email}&token=${token}" style="display: inline-block; background: #566fab; color: #ffffff; font-family: Ubuntu, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: normal; line-height: 17.5px; margin: 0; text-decoration: none; text-transform: none; padding: 9px 26px 9px 26px; mso-padding-alt: 0px; border-radius: 8px;" target="_blank">
              <span style="font-family: Roboto, Tahoma, sans-serif; font-size: 14px;">Վավերացնել</span>
            </a>
          </td>
        </tr>
      </table>
    
              </td>
            </tr>
          
            <tr>
              <td align="left" style="font-size:0px;padding:15px 15px 24px 31px;word-break:break-word;">
                
      <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:left;color:#000000;"><p style="font-family: Ubuntu, Helvetica, Arial;"><span style="font-family: Roboto, Tahoma, sans-serif; font-size: 14px;">Հարգանքով՝</span><br><span style="font-family: Roboto, Tahoma, sans-serif; font-size: 14px;">Patienthub.am թիմ&nbsp;</span></p></div>
    
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
    </html>
        `
    )
}
const EmailVerify = (HOST, email, token) => {
    return(
      `
      <!doctype html>
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
        body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
        table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
        img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
        p { display:block;margin:13px 0; }
      </style>
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
      <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet" type="text/css">
<link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
<link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
      <style type="text/css">
        @import url(https://fonts.googleapis.com/css?family=Roboto:400,700);
@import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
@import url(https://fonts.googleapis.com/css?family=Cabin:400,700);
      </style>
    <!--<![endif]-->

  
      
  <style type="text/css">
    @media only screen and (max-width:480px) {
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
      @media only screen and (min-width: 480px) { 
          .hide_section_on_mobile { 
              display: table !important;
          } 

          div.hide_section_on_mobile { 
              display: block !important;
          }
      }
      .hide_on_desktop { display: block !important;} 
      @media only screen and (min-width: 480px) { .hide_on_desktop { display: none !important;} }
      .hide_section_on_desktop { display: table !important;} 
      @media only screen and (min-width: 480px) { .hide_section_on_desktop { display: none !important;} }
      
        p, h1, h2, h3 {
            margin: 0px;
        }

        a {
            text-decoration: none;
            color: inherit;
        }

        @media only screen and (max-width:480px) {

          .mj-column-per-100 { width:100%!important; max-width:100%!important; }
          .mj-column-per-100 > .mj-column-per-75 { width:75%!important; max-width:75%!important; }
          .mj-column-per-100 > .mj-column-per-60 { width:60%!important; max-width:60%!important; }
          .mj-column-per-100 > .mj-column-per-50 { width:50%!important; max-width:50%!important; }
          .mj-column-per-100 > .mj-column-per-40 { width:40%!important; max-width:40%!important; }
          .mj-column-per-100 > .mj-column-per-33 { width:33.333333%!important; max-width:33.333333%!important; }
          .mj-column-per-100 > .mj-column-per-25 { width:25%!important; max-width:25%!important; }

          .mj-column-per-100 { width:100%!important; max-width:100%!important; }
          .mj-column-per-75 { width:100%!important; max-width:100%!important; }
          .mj-column-per-60 { width:100%!important; max-width:100%!important; }
          .mj-column-per-50 { width:100%!important; max-width:100%!important; }
          .mj-column-per-40 { width:100%!important; max-width:100%!important; }
          .mj-column-per-33 { width:100%!important; max-width:100%!important; }
          .mj-column-per-25 { width:100%!important; max-width:100%!important; }
      }</style>
      
    </head>
    <body style="background-color:#FFFFFF;">
      
      
    <div style="background-color:#FFFFFF;">
      
    
    <!--[if mso | IE]>
    <table
       align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:640px;" width="640"
    >
      <tr>
        <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
    <![endif]-->
  
    
    <div style="margin:0px auto;max-width:640px;">
      
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;">
              <!--[if mso | IE]>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
              
      <tr>
    
          <td
             class="" style="vertical-align:top;width:640px;"
          >
        <![endif]-->
          
    <div class="mj-column-per-100 outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
      
    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
      
          <tr>
            <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
              
    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
      <tbody>
        <tr>
          <td style="width:640px;">
            <img height="auto" src="https://patienthub.am/admin/uploads/email_logo.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;max-width: 200px;font-size:13px;" width="500">
          </td>
        </tr>
      </tbody>
    </table>
  
            </td>
          </tr>
        
          <tr>
            <td align="left" style="font-size:0px;padding:15px 25px 15px 25px;word-break:break-word;">
              
    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.8;text-align:left;color:#000000;"><p style="font-family: Ubuntu, Helvetica, Arial;"><span style="font-size: 14px; font-family: Roboto, Tahoma, sans-serif;">Հարգելի օգտատեր,&nbsp;</span></p>
<p style="font-family: Ubuntu, Helvetica, Arial;">&nbsp;</p>
<p style="font-family: Ubuntu, Helvetica, Arial;"><span style="font-size: 14px; font-family: Roboto, Tahoma, sans-serif;">Հաշիվը վավերացնելու համար, սեղմեք այստեղ&nbsp;&nbsp;</span></p>
<p style="font-family: Ubuntu, Helvetica, Arial;">&nbsp;</p></div>
  
            </td>
          </tr>
        
          <tr>
            <td align="left" vertical-align="middle" style="font-size:0px;padding:20px 20px 20px 25px;word-break:break-word;">
              
    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
      <tr>
        <td align="center" bgcolor="#3C72F6" role="presentation" style="border:none;border-radius:8px;cursor:auto;mso-padding-alt:9px 26px 9px 26px;background:#566fab;" valign="middle">
          <a href="${HOST}/api/user/verify/?email=${email}&token=${token}" style="display: inline-block; background: #566fab; color: #ffffff; font-family: Ubuntu, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: normal; line-height: 17.5px; margin: 0; text-decoration: none; text-transform: none; padding: 9px 26px 9px 26px; mso-padding-alt: 0px; border-radius: 8px;" target="_blank">
            <span style="font-family: Roboto, Tahoma, sans-serif; font-size: 14px;">Վավերացնել</span>
          </a>
        </td>
      </tr>
    </table>
  
            </td>
          </tr>
        
          <tr>
            <td align="left" style="font-size:0px;padding:15px 15px 24px 31px;word-break:break-word;">
              
    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:left;color:#000000;"><p style="font-family: Ubuntu, Helvetica, Arial;"><span style="font-family: Roboto, Tahoma, sans-serif; font-size: 14px;">Հարգանքով՝</span><br><span style="font-family: Roboto, Tahoma, sans-serif; font-size: 14px;">Patienthub.am թիմ&nbsp;</span></p></div>
  
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
  </html>
      `
    )
}

const EmailVerifyRecover = (HOST, email, token) => {
    return(
      `
      <!doctype html>
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
        body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
        table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
        img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
        p { display:block;margin:13px 0; }
      </style>
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
      <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet" type="text/css">
<link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
<link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
      <style type="text/css">
        @import url(https://fonts.googleapis.com/css?family=Roboto:400,700);
@import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
@import url(https://fonts.googleapis.com/css?family=Cabin:400,700);
      </style>
    <!--<![endif]-->

  
      
  <style type="text/css">
    @media only screen and (max-width:480px) {
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
      @media only screen and (min-width: 480px) { 
          .hide_section_on_mobile { 
              display: table !important;
          } 

          div.hide_section_on_mobile { 
              display: block !important;
          }
      }
      .hide_on_desktop { display: block !important;} 
      @media only screen and (min-width: 480px) { .hide_on_desktop { display: none !important;} }
      .hide_section_on_desktop { display: table !important;} 
      @media only screen and (min-width: 480px) { .hide_section_on_desktop { display: none !important;} }
      
        p, h1, h2, h3 {
            margin: 0px;
        }

        a {
            text-decoration: none;
            color: inherit;
        }

        @media only screen and (max-width:480px) {

          .mj-column-per-100 { width:100%!important; max-width:100%!important; }
          .mj-column-per-100 > .mj-column-per-75 { width:75%!important; max-width:75%!important; }
          .mj-column-per-100 > .mj-column-per-60 { width:60%!important; max-width:60%!important; }
          .mj-column-per-100 > .mj-column-per-50 { width:50%!important; max-width:50%!important; }
          .mj-column-per-100 > .mj-column-per-40 { width:40%!important; max-width:40%!important; }
          .mj-column-per-100 > .mj-column-per-33 { width:33.333333%!important; max-width:33.333333%!important; }
          .mj-column-per-100 > .mj-column-per-25 { width:25%!important; max-width:25%!important; }

          .mj-column-per-100 { width:100%!important; max-width:100%!important; }
          .mj-column-per-75 { width:100%!important; max-width:100%!important; }
          .mj-column-per-60 { width:100%!important; max-width:100%!important; }
          .mj-column-per-50 { width:100%!important; max-width:100%!important; }
          .mj-column-per-40 { width:100%!important; max-width:100%!important; }
          .mj-column-per-33 { width:100%!important; max-width:100%!important; }
          .mj-column-per-25 { width:100%!important; max-width:100%!important; }
      }</style>
      
    </head>
    <body style="background-color:#FFFFFF;">
      
      
    <div style="background-color:#FFFFFF;">
      
    
    <!--[if mso | IE]>
    <table
       align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:640px;" width="640"
    >
      <tr>
        <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
    <![endif]-->
  
    
    <div style="margin:0px auto;max-width:640px;">
      
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;">
              <!--[if mso | IE]>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
              
      <tr>
    
          <td
             class="" style="vertical-align:top;width:640px;"
          >
        <![endif]-->
          
    <div class="mj-column-per-100 outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
      
    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
      
          <tr>
            <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
              
    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
      <tbody>
        <tr>
          <td style="width:640px;">
            
    <img height="auto" src="https://patienthub.am/admin/uploads/email_logo.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;max-width: 200px;font-size:13px;" width="500">
  
          </td>
        </tr>
      </tbody>
    </table>
  
            </td>
          </tr>
        
          <tr>
            <td align="left" style="font-size:0px;padding:15px 25px 15px 25px;word-break:break-word;">
              
    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.8;text-align:left;color:#000000;"><p style="font-family: Ubuntu, Helvetica, Arial;"><span style="font-size: 14px; font-family: Roboto, Tahoma, sans-serif;">Հարգելի օգտատեր,&nbsp;</span></p>
<p style="font-family: Ubuntu, Helvetica, Arial;">&nbsp;</p>
<p style="font-family: Ubuntu, Helvetica, Arial;"><span style="font-size: 14px; font-family: Roboto, Tahoma, sans-serif;">Դուք գաղտնաբառի վերականգնման հարցում եք կատարել:</span><br><span style="font-size: 14px; font-family: Roboto, Tahoma, sans-serif;">Նոր գաղտնաբառ ստեղծելու համար, սեղմեք այստեղ՝&nbsp;&nbsp;</span></p>
<p style="font-family: Ubuntu, Helvetica, Arial;">&nbsp;</p></div>
  
            </td>
          </tr>
        
          <tr>
            <td align="left" vertical-align="middle" style="font-size:0px;padding:20px 20px 20px 25px;word-break:break-word;">
              
    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
      <tr>
        <td align="center" bgcolor="#3C72F6" role="presentation" style="border:none;border-radius:8px;cursor:auto;mso-padding-alt:9px 26px 9px 26px;background:#3C72F6;" valign="middle">
          <a href="${HOST}/api/user/verify-recover/?email=${email}&token=${token}" style="display: inline-block; background: #566fab; color: #ffffff; font-family: Ubuntu, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: normal; line-height: 17.5px; margin: 0; text-decoration: none; text-transform: none; padding: 9px 26px 9px 26px; mso-padding-alt: 0px; border-radius: 8px;" target="_blank">
            <span style="font-family: Roboto, Tahoma, sans-serif; font-size: 14px;">Ստեղծել նոր գաղտնաբառ</span>
          </a>
        </td>
      </tr>
    </table>
  
            </td>
          </tr>
        
          <tr>
            <td align="left" style="font-size:0px;padding:15px 15px 24px 31px;word-break:break-word;">
              
    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:left;color:#000000;"><p style="font-family: Ubuntu, Helvetica, Arial;"><span style="font-family: Roboto, Tahoma, sans-serif; font-size: 14px;">Հարգանքով՝</span><br><span style="font-family: Roboto, Tahoma, sans-serif; font-size: 14px;">Patienthub.am թիմ&nbsp;</span></p></div>
  
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
  </html>
      `
    )
}

const EmailCertificate = () => {
  return (
    `
      <!doctype html>
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
        body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
        table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
        img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
        p { display:block;margin:13px 0; }
      </style>
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
      <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
      <style type="text/css">
        @import url(https://fonts.googleapis.com/css?family=Roboto:400,700);
  @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
  @import url(https://fonts.googleapis.com/css?family=Cabin:400,700);
      </style>
    <!--<![endif]-->


      
  <style type="text/css">
    @media only screen and (max-width:480px) {
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
      @media only screen and (min-width: 480px) { 
          .hide_section_on_mobile { 
              display: table !important;
          } 

          div.hide_section_on_mobile { 
              display: block !important;
          }
      }
      .hide_on_desktop { display: block !important;} 
      @media only screen and (min-width: 480px) { .hide_on_desktop { display: none !important;} }
      .hide_section_on_desktop { display: table !important;} 
      @media only screen and (min-width: 480px) { .hide_section_on_desktop { display: none !important;} }
      
        p, h1, h2, h3 {
            margin: 0px;
        }

        a {
            text-decoration: none;
            color: inherit;
        }

        @media only screen and (max-width:480px) {

          .mj-column-per-100 { width:100%!important; max-width:100%!important; }
          .mj-column-per-100 > .mj-column-per-75 { width:75%!important; max-width:75%!important; }
          .mj-column-per-100 > .mj-column-per-60 { width:60%!important; max-width:60%!important; }
          .mj-column-per-100 > .mj-column-per-50 { width:50%!important; max-width:50%!important; }
          .mj-column-per-100 > .mj-column-per-40 { width:40%!important; max-width:40%!important; }
          .mj-column-per-100 > .mj-column-per-33 { width:33.333333%!important; max-width:33.333333%!important; }
          .mj-column-per-100 > .mj-column-per-25 { width:25%!important; max-width:25%!important; }

          .mj-column-per-100 { width:100%!important; max-width:100%!important; }
          .mj-column-per-75 { width:100%!important; max-width:100%!important; }
          .mj-column-per-60 { width:100%!important; max-width:100%!important; }
          .mj-column-per-50 { width:100%!important; max-width:100%!important; }
          .mj-column-per-40 { width:100%!important; max-width:100%!important; }
          .mj-column-per-33 { width:100%!important; max-width:100%!important; }
          .mj-column-per-25 { width:100%!important; max-width:100%!important; }
      }</style>
      
    </head>
    <body style="background-color:#FFFFFF;">
      
      
    <div style="background-color:#FFFFFF;">
      
    
    <!--[if mso | IE]>
    <table
      align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:640px;" width="640"
    >
      <tr>
        <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
    <![endif]-->

    
    <div style="margin:0px auto;max-width:640px;">
      
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;">
              <!--[if mso | IE]>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
              
      <tr>
    
          <td
            class="" style="vertical-align:top;width:640px;"
          >
        <![endif]-->
          
    <div class="mj-column-per-100 outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
      
    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
      
          <tr>
            <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
              
    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
      <tbody>
        <tr>
          <td style="width:640px;">
            
    <img height="auto" src="https://patienthub.am/admin/uploads/email_logo.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;max-width: 200px;font-size:13px;" width="500">

          </td>
        </tr>
      </tbody>
    </table>

            </td>
          </tr>
        
          <tr>
            <td align="left" style="font-size:0px;padding:15px 25px 15px 25px;word-break:break-word;">
              
    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.8;text-align:left;color:#000000;"><p style="font-family: Ubuntu, Helvetica, Arial;"><span style="font-size: 14px; font-family: Roboto, Tahoma, sans-serif;">Հարգելի օգտատեր,&nbsp;</span></p>
  <p style="font-family: Ubuntu, Helvetica, Arial;">&nbsp;</p>
  <p style="font-family: Ubuntu, Helvetica, Arial;"><span style="font-size: 14px; font-family: Roboto, Tahoma, sans-serif;">Կից կարող եք տեսնել Ձեր վկայականը։</span></p>
            </td>
          </tr>
        
          <tr>
            <td align="left" style="font-size:0px;padding:15px 15px 24px 31px;word-break:break-word;">
              
    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:left;color:#000000;"><p style="font-family: Ubuntu, Helvetica, Arial;"><span style="font-family: Roboto, Tahoma, sans-serif; font-size: 14px;">Հարգանքով՝</span><br><span style="font-family: Roboto, Tahoma, sans-serif; font-size: 14px;">Patienthub.am թիմ&nbsp;</span></p></div>

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
  </html>
    `
  )
}

module.exports = { EmailVerify, EmailVerifyRecover, EmailVerifySignIn, EmailCertificate }
