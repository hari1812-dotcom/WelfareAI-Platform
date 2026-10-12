import { Citizen } from '../models/Citizen.js';

const APPLICATION_LIMIT = 2;

function getApplications(citizen) {
  return citizen.applications || [];
}

export async function listApplications(req, res) {
  res.json({ applications: getApplications(req.user) });
}

export async function createApplication(req, res) {
  const { schemeId, schemeName, provider = '', benefitReceived = 0 } = req.body;
  const parsedBenefit = Number(benefitReceived);

  if (typeof schemeId !== 'string' || !schemeId.trim() || typeof schemeName !== 'string' || !schemeName.trim()) {
    return res.status(400).json({ message: 'A scheme ID and name are required.' });
  }
  if (!Number.isFinite(parsedBenefit) || parsedBenefit < 0) {
    return res.status(400).json({ message: 'The received benefit amount must be a non-negative number.' });
  }

  try {
    const citizen = await Citizen.findOneAndUpdate(
      {
        _id: req.user._id,
        'applications.schemeId': { $ne: schemeId.trim() },
        $expr: {
          $lt: [
            { $size: { $ifNull: ['$applications', []] } },
            APPLICATION_LIMIT,
          ],
        },
      },
      {
        $push: {
          applications: {
            schemeId: schemeId.trim(),
            schemeName: schemeName.trim(),
            provider: typeof provider === 'string' ? provider.trim() : '',
            status: 'applied',
            appliedAt: new Date(),
            benefitReceived: parsedBenefit,
          },
        },
      },
      { new: true, runValidators: true },
    );

    if (citizen) return res.status(201).json({ applications: getApplications(citizen) });

    const latest = await Citizen.findById(req.user._id).select('applications');
    const applications = getApplications(latest);
    if (applications.some((application) => application.schemeId === schemeId.trim())) {
      return res.status(409).json({ message: 'This scheme is already in your application list.', applications });
    }
    return res.status(409).json({
      message: `You can apply to a maximum of ${APPLICATION_LIMIT} schemes.`,
      applications,
    });
  } catch (error) {
    console.error('Failed to record scheme application', error);
    return res.status(500).json({ message: 'Could not record the application.' });
  }
}

export async function updateApplicationBenefit(req, res) {
  const parsedBenefit = Number(req.body.benefitReceived);
  if (!Number.isFinite(parsedBenefit) || parsedBenefit < 0) {
    return res.status(400).json({ message: 'The received benefit amount must be a non-negative number.' });
  }

  try {
    const citizen = await Citizen.findOneAndUpdate(
      {
        _id: req.user._id,
        'applications.schemeId': req.params.schemeId,
      },
      { $set: { 'applications.$.benefitReceived': parsedBenefit } },
      { new: true, runValidators: true },
    );

    if (!citizen) return res.status(404).json({ message: 'Application not found.' });
    return res.json({ applications: getApplications(citizen) });
  } catch (error) {
    console.error('Failed to update received benefit amount', error);
    return res.status(500).json({ message: 'Could not update the received benefit amount.' });
  }
}
