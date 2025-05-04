const service = require("../../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function loginController(req, res) {
  const { email, password } = req.body;

  console.log(email, password);

  const e_mail = await service.findOne({ email: email });

  console.log(e_mail);

  if (!e_mail) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  const validation = await bcrypt.compare(password, e_mail.password);

  console.log(validation);

  if (!validation) {
    return res.status(422).json({ msg: "Senha inválida!" });
  }

  try {
    const secret = process.env.SECRET;

    const token = jwt.sign(
      {
        id: e_mail._id,
      },
      secret
    );

    return res
      .status(201)
      .json({ msg: "Autentificação realizada com sucesso! ", token });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

module.exports = loginController;
