export const getDashboardData = async (req, res) => {
  try {
    const user = req.user;
    const applications = user.applications || [];
    res.json({
      benefitsReceived: applications.reduce((total, application) => total + (application.benefitReceived || 0), 0),
      currentPotential: 0,
      futurePotential: 0,
      pendingApplications: applications.length,
      upcomingOpportunities: 0,
      aiMatchedSchemesCount: 0,
      documentsCount: 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data', error: error.message });
  }
};
