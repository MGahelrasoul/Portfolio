var express     = require("express"),
    router      = express.Router(),
    nodemailer = require("nodemailer"),
    multiparty = require("multiparty")

router.get('/', (req, res) => {
    delete req.session.getReturn;
    req.session.getReturn = req.originalUrl;
    res.render('landing')
})
router.get('/tetris', (req, res) => {
    delete req.session.getReturn;
    req.session.getReturn = req.originalUrl;
    res.render('tetris')
})
router.get("/error", (req, res) => {
    delete req.session.getReturn;
    req.session.getReturn = req.originalUrl;
    res.render('error')
})

// Instantiate the SMTP server
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
    }
})

// Verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
        console.log(error)
    }
    else {
        console.log("Server is ready to recieve messages")
    }
})
// POST route from contact form
router.post('/contact', (req, res) => {
    // Parse accepted form data
    let form = new multiparty.Form()
    let data = {}
    form.parse(req, function (err, fields) {
        console.log(fields)
        Object.keys(fields).forEach(function (property) {
        data[property] = fields[property].toString()
        })
    
        // Configure the mail object
        const mail = {
        from: data.name,
        to: process.env.EMAIL,
        subject: data.subject,
        text: `${data.name} <${data.email}> \n${data.message}`,
        }
    
        // Attempt to send the email
        transporter.sendMail(mail, (err, data) => {
            if (err) {
                console.log(err);
                    req.flash('error', 'contact-failure') // Show a notice indicating failure
                    res.redirect("/")
                    console.log(err)
            } else {
                    req.flash('success', 'Message Sent!') // Show a notice indicating success
                    res.redirect("/")
            }
        })
    })
})

// // Reroute all other addresses to landing page
// router.get("/*", (req, res) => {
//     res.status(404).render('error')
// })

module.exports = router;