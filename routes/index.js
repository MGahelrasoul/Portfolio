var express     = require("express"),
    router      = express.Router(),
    nodemailer = require("nodemailer"),
    GMAIL_USER = 'gahelrasoul.m@gmail.com',
    GMAIL_PASS = ''

router.get('/', (req, res) => {
    res.render('landing')
})
router.get('/tetris', (req, res) => {
    res.render('tetris')
})


// POST route from contact form
router.post('/contact', (req, res) => {
    // Instantiate the SMTP server
    const smtpTrans = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS
        }
    })
    // Specify what the email will look like
    const mailOpts = {
        from: 'Your sender info here', // This is ignored by Gmail
        to: GMAIL_USER,
        subject: 'New Message From Portfolio Contact',
        text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
    }

    // Attempt to send the email
    smtpTrans.sendMail(mailOpts, (error, response) => {
        if (error) {
            req.flash('error', 'contact-failure') // Show a notice indicating failure
            console.log(error)
            res.redirect("/")
        }
        else {
            req.flash('success', 'Message Sent!') // Show a notice indicating success
            res.redirect("/")
        }
    })
})

// // Reroute all other addresses to landing page
// router.get("/*", (req, res) => {
//     res.redirect("/")
// })

module.exports = router;