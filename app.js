// app.js
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const methodOverride = require('method-override');

// Import Mongoose connection (see config/db.js)
const mongoose = require('./config/db');

const app = express();

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultSecret',
  resave: false,
  saveUninitialized: true
}));

app.use(methodOverride('_method'));


// Register routes
const authRoutes = require('./app/routes/auth');
const homeRoutes = require('./app/routes/home');
const adminRoutes = require('./app/routes/admin');
const manageUsersRoutes = require('./app/routes/manageUsers');
const secureDownloadRoutes = require('./app/routes/secureDownload');

const contentRoutes = require('./app/routes/content');
const myRequestsRoutes = require('./app/routes/myRequests');
const allRequestsRoutes = require('./app/routes/allRequests');
const mainContentRoutes = require('./app/routes/mainContent');

const setUser = require('./app/middlewares/setUser');
app.use(setUser);


// Import tools access routes
// const toolsRoutes = require('./app/modules/toolsAccess/routes/tools');



app.use('/download', secureDownloadRoutes);
app.use('/manage-users', manageUsersRoutes);
app.use('/content-manager', mainContentRoutes);
app.use('/admin', adminRoutes);
app.use('/', authRoutes);
app.use('/home', homeRoutes);
app.use('/content', contentRoutes);
app.use('/my-requests', myRequestsRoutes);
app.use('/all-requests', allRequestsRoutes);



app.use(async (req, res, next) => {
  if (req.session.userId) {
    res.locals.user = await User.findById(req.session.userId);
  }
  next();
});



// Auto-create uploads folder if missing
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}



module.exports = app; 


// Start server
const PORT = process.env.PORT || 8087;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});