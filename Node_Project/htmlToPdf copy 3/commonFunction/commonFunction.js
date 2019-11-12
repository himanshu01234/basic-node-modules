const puppeteer = require('puppeteer');
const async = require('async');
module.exports={
pdfConverter: async (success, callback) => {
    console.log('inside odfconverter')
    var now = Date.now()
    var pdfname = "converted" + now + ".pdf";

    const browser = await puppeteer.launch();
    const page = await browser.newPage();



    var html = `<html>
        <head>
            <style>  
                table {  
                    font-family: arial, sans-serif;  
                    border-collapse: collapse;  
                    width: 100%;  
                }  
          
                td, th {  
                    border: 1px solid #dddddd;  
                    text-align: left;  
                    padding: 8px;  
                }  
          
                tr:nth-child(even) {  
                    background-color: #dddddd;  
                }  
            </style>
        </head>
        
    <body>
        <!-- <input type="button" id="create_pdf" value="Generate PDF">   -->
    
    <form class="form" style="max-width: none; width: 1005px;">  
      
      
            <h2 style="color: #0094ff">Hello ${success.firstName}</h2>  
            <h3></h3>  
            <p style="font-size: large">  
          Your Credentials:
            </p>  
            <table>  
                <tbody>  
                    <tr> 
                    <th>Name:</th>  
                    <td> ${success.firstName} ${success.lastName}  </td>
                      
                    </tr>  
                    <tr>  
                        <th>Age</th>  
                    <td> ${success.age}  </td>
                    </tr>  
                    <tr>  
                         <th>Address:</th>  
                    <td> ${success.address} </td> 
                    </tr>  
                    <tr>  
                        <th>Email id:</th>  
                    <td> ${success.emailId} </td> 
                    </tr>  
                    <tr>  
                        <th>Contact:</th>  
                    <td> ${success.mobileNumber}   </td>
                    </tr>  
                    <tr>  
                    <th>User Name:</th>  
                    <td> ${success.userName} </td>
                    </tr>  
                   
                </tbody>  
            </table>  
      
      
        </form>
    </body>
        </html>  `

    await page.setContent(html)
    await page.emulateMedia('screen')
    await page.pdf({
        path: pdfname,
        format: 'A4',
        printBackground: true,

    })
    callback(null, pdfname)
    await browser.close();
    process.exit();

}}