const { z } = require("zod");
const authService = require("../services/auth");

const authController = {
  signUp: async (req, res, next) => {
    try {
      const signUpBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
      });

      const { name, email, password } = signUpBodySchema.parse(req.body);

      const { token } = await authService.signUp({ name, email, password });

      return res.status(201).json({ token });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const loginBodySchema = z.object({
        email: z.string().email(),
        password: z.string(),
      });

      const { email, password } = loginBodySchema.parse(req.body);

      const { token } = await authService.login({ email, password });

      return res.json({ token });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
