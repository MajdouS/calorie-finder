const User = require("../models/User"); // Assuming the User model includes daily nutrition data

exports.calculateDailyIntake = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user is attached to the request by authentication middleware
    const { products } = req.body; // Products selected for calculation

    // Calculation logic for daily intake goes here
    let dailyIntake = 0;
    products.forEach((product) => {
      // Sum up the nutritional values based on product quantity
      dailyIntake += product.nutritionValue * product.quantity;
    });

    // Update the user with the calculated daily intake
    const user = await User.findByIdAndUpdate(
      userId,
      { dailyIntake },
      { new: true }
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
