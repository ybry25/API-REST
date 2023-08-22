export const register = async (req, res) => {
  res.json({ controller: "register" });
};

export const login = async (req, res) => {
  // console.log(req.body);
  res.json({ controller: "login" });
};

export const infoUser = async (req, res) => {
  res.json({ controller: "infoUser" });
};

export const refreshToken = (req, res) => {
  res.json({ controller: "refreshToken" });
};

export const logout = (req, res) => {
  res.json({ controller: "logout" });
};
