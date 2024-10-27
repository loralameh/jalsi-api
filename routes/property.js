const express = require("express");
const router = express.Router();

// Import the controllers and middleware for this model
const userController = require("@controllers/accomodation");
// const authMiddleware = require("../middlewares/authMiddleware");

// Define routes for this model
router.get("/", userController.getAccommodations);
// router.get("/:id", authMiddleware, userController.getUserById);
// router.post("/", authMiddleware, userController.createUser);
// router.put("/:id", authMiddleware, userController.updateUser);
// router.delete("/:id", authMiddleware, userController.deleteUser);

module.exports = router;
