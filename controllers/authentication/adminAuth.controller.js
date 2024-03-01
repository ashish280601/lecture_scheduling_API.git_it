exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
      // Hardcoded admin credentials
      if (username === 'admin' && password === 'admin123') {
        // Return success response
        res.json({ message: 'Admin login successful' });
      } else {
        // Return failure response
        res.status(401).json({ message: 'Invalid username or password' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  