// ✅ routes عامة (بدون auth)
router.get('/', getAllServices);
router.get('/specialities', getSpecialties);
router.get('/by-speciality', getServicesBySpeciality);
router.get('/doctor/:doctorId', getServicesByDoctorId);

// 🔐 من هون وتحت: محمي
router.use(authToken);
router.use(isDoctor);

router.get('/my', getMyServices);
router.post('/', createService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);
