const service = require("../../Model/userModel");
const bcrypt = require("bcrypt");

const registerController = {
  register: async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({ msg: "O email é Obrigatório!" });
    }

    if (!password) {
      return res.status(422).json({ msg: "A senha é Obrigatória!" });
    }

    const e_mail = await service.findOne({ email: email });

    if (e_mail) {
      return res.status(422).json({ msg: "Usuário existente" });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new service({
      email,
      password: passwordHash,
    });

    try {
      user.save();

      return res.status(201).json({ msg: "Usuário criado com sucesso!" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};

module.exports = registerController;
