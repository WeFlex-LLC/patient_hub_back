var pdf = require("pdf-creator-node");

const path = require('path');

const createCertificate = async data => {
    try {
        const options = {
            formate: "A4",
            orientation: "portait",
            border: '0',
            header: {
                height: "3mm",
                contents: ""
            }
        }

        const document = {
            html: HTMLCONTET(data),
            data: {
                data: null
            },
            path:  path.join(__dirname, `../../admin/uploads/users/${data.uid}/${data.quiz_title}_${data.date}.pdf`),
        }

        return pdf.create(document, options)
        .then(res => {
            if (res.filename) {
                return {
                    status: "success", 
                    filename: path.join(__dirname, `../../admin/uploads/users/${data.uid}/${data.quiz_title}_${data.date}.pdf`)
                };
            } else {
                return {status: "fail"};
            }
        })
        .catch(err => {
            console.log(err);
            return "fail";
        })
    } catch (error) {
        console.log(error)
    }
}

const HTMLCONTET = data => {
    return (
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://patienthub.am/admin/views/css/certeficate.css">
            <title>Document</title>
        </head>
        <body>
            <div class="certeficate_background_image" style="
            width: 100%;
            height: 595px;
            background-image: url(https://patienthub.am/admin/views/image/certeficate_background_image_new.png);
            background-repeat: no-repeat;
            background-size: cover">
                <div style="background-color: white;width: 94%;margin-left: 3%;height: 497px;position: relative;top: 52px">
                    <img src="https://patienthub.am/admin/views/image/certeficate_logo.svg" class="certeficate_logo" style="
                    width: 153.69px;
                    height: 51.53px;
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
                    padding-top: 37px;
                    " />
        
                    <h1 class="certeficate_header" style="font-family: Noto Sans Armenian;
                    font-style: normal;
                    font-weight: bold;
                    text-align: center;
                    color: #566FAB;
                    font-size: 44px;
                    margin-top: 31px;">ՎԿԱՅԱԿԱՆ</h1>
                    
                    <p class="certeficate_subheader" style="font-family: Noto Sans Armenian;
                    font-style: normal;
                    text-align: center;
                    font-weight: normal;
                    font-size: 16px;
                    line-height: 22px;
                    color: rgba(34, 34, 34, 0.8);"
                    >տրվում է առ այն, որ</p>
        
                    <h3 class="certeficate_namesurname" style="font-family: Noto Sans Armenian;
                    font-style: normal;
                    font-weight: 600;
                    text-align: center;
                    font-size: 20px;
                    line-height: 27px;
                    color: #000000;
                    margin-top: 24px;">${data.name} ${data.lname}</h3>
        
                    <p class="certeficate_position" style="font-family: Noto Sans Armenian;
                    font-style: normal;
                    font-weight: 600;
                    font-size: 16px;
                    line-height: 22px;
                    text-align: center;
                    text-transform: capitalize;
                    color: rgba(34, 34, 34, 0.8);
                    margin-top: 4px;">${data.prof === "student" ? "Ուսանող" : data.prof === "doctor" ? "Բժիշկ" : "Բուժաշխատող"}</p>

                    <p class="certeficate_password_number" style="font-family: Noto Sans Armenian;
                    font-style: normal;
                    font-weight: 600;
                    font-size: 12px;
                    line-height: 16px;
                    text-align: center;
                    color: #000000;
                    margin-top: 6px;">${data.passport}</p>
        
                    <p class="certeficate_password" style="font-family: Noto Sans Armenian;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 12px;
                    line-height: 16px;
                    text-align: center;
                    color: rgba(34, 34, 34, 0.8);">Անձնագր</p>
        
                    <p class="certeficate_success" style="font-family: Noto Sans Armenian;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 16px;
                    line-height: 22px;
                    text-align: center;
                    color: rgba(34, 34, 34, 0.8);
                    margin-top: 16px;">հաջողությամբ հանձնել է</p>
        
                    <p class="certeficate_course_name" style="font-family: Noto Sans Armenian;
                    font-style: normal;
                    font-weight: 600;
                    font-size: 16px;
                    line-height: 22px;
                    text-align: center;
                    color: #566FAB;
                    margin-top: 6px;">${data.quiz_title}</p>
        
                    <p class="certeficate_points" style="font-family: Noto Sans Armenian;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 16px;
                    line-height: 22px;
                    margin-top: 6px;
                    text-align: center;
                    color: rgba(34, 34, 34, 0.8);">դասընթացի թեսթը և հավաքել է ${data.point} միավոր 100-ից։</p>
        
                    <p class="certeficate_date" style="position: absolute;
                    top: 459px;
                    left: 654px;
                
                    font-family: Noto Sans Armenian;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 12px;
                    line-height: 16px;
                    color: rgba(34, 34, 34, 0.8);">${data.date}</p>
                </div>
            </div>
        </body>
        </html>`
    )
}

module.exports = { createCertificate }