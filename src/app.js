const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('./config/database');
const ctaRoutes = require('./routes/CTARoutes.js'); 
const statsRoutes = require('./routes/statsRoutes.js')
const causesRoutes = require('./routes/causesRoutes.js')
const authRoutes = require('./routes/authRoutes.js');
const eventsRoutes = require('./routes/eventsRoutes.js')
const activityRoutes = require('./routes/activitiesRoutes.js')
const impactRoutes = require('./routes/impactRoutes.js');
const volunteerManagementRoutes = require('./routes/volunteer.js')
const path = require('path');
const heroSection = require('./routes/heroSection.js')
const aboutHeroRoutes = require('./routes/aboutHeroRoutes');
const testimonial = require('./routes/testimonial.js')
const newsletterRoutes = require('./routes/newsletter.js')

const app = express();

// Middleware
app.use(helmet());

app.use(cors({
  origin:'*',
  credentials: true,
}));


console.log("🚀 Backend server initialized...");
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  console.log("✅ Health check endpoint hit");
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Frontend connection test endpoint
app.get('/api/test-connection', (req, res) => {
  console.log("🔗 Frontend connection test received");
  res.json({ message: 'Frontend successfully connected to backend!' });
});

// In your Express server setup
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cta', ctaRoutes);
app.use('/api/stat',statsRoutes);
app.use('/api/about-hero', aboutHeroRoutes);
app.use('/api/causes',causesRoutes)
app.use('/api', eventsRoutes); 
app.use('/api/activities', activityRoutes);
app.use('/api/impact', impactRoutes);
app.use('/api', volunteerManagementRoutes);
app.use('/api/hero', heroSection);
app.use('/api/test',testimonial)
app.use('/api', newsletterRoutes);


// Error handling middleware
app.use((error, req, res, next) => {
  console.error('❌ Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

module.exports = app;
