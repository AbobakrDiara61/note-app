const pick = (obj, keys) => keys.reduce((acc, key) => (key in obj && (acc[key] = obj[key]), acc), {});

const ensureStrings = (stringFields) => {
  return (req, res, next) => {
    for (const field of stringFields) {
      if (field in req.body) {
        const value = req.body[field];
        
        // If the field exists, is an object, and is not null, it's an injection risk
        if (typeof value === 'object' && value !== null) 
          return res.status(400).json({ error: `Invalid data type for field '${field}'. Expected a string.` });
        
      }
    }
    next();
  };
};

export { 
    pick,
    ensureStrings
};