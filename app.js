require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const methodOverride = require('method-override');

// 🔹 ADD prom-client for metrics
const client = require('prom-client');
client.collectDefaultMetrics(); // collects default Node.js metrics

const app = express();

// 🔹 ADD /metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

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

// Routes and middlewares (unchanged)
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
app.use('/download', secureDownloadRoutes);
app.use('/manage-users', manageUsersRoutes);
app.use('/content-manager', mainContentRoutes);
app.use('/admin', adminRoutes);
app.use('/', authRoutes);
app.use('/home', homeRoutes);
app.use('/content', contentRoutes);
app.use('/my-requests', myRequestsRoutes);
app.use('/all-requests', allRequestsRoutes);

// Optional user session check
app.use(async (req, res, next) => {
  if (req.session.userId) {
    res.locals.user = await User.findById(req.session.userId);
  }
  next();
});

// Auto-create uploads folder
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Start server
const PORT = process.env.PORT || 3753;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});