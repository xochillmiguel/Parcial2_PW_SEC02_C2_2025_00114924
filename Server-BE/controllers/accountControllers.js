import { cuentas } from "../data/accountData.js";

export const getCuentas = (req, res) => {
  const { queryParam } = req.query;

  if (!queryParam) {
    return res.json({
      count: cuentas.length,
      data: cuentas
    });
  }
  return getCuentasByQuery(req, res);
};

export const getCuentasById = (req, res) => {
  const id = req.params.id;
  const found = cuentas.find(a => a._id === id);

  if (found) {
    res.json({ finded: true, account: found });
  } else {
    res.json({ finded: false, account: null });
  }
};

export const getCuentasByQuery = (req, res) => {
  const { queryParam } = req.query;

  const resultados = cuentas.filter(c =>
    c._id === queryParam ||
    c.client.toLowerCase().includes(queryParam.toLowerCase()) ||
    c.gender.toLowerCase() === queryParam.toLowerCase()
  );

  if (resultados.length === 0) return res.json({ finded: false });
  if (resultados.length === 1) return res.json({ finded: true, account: resultados[0] });

  return res.json({ finded: true, data: resultados });
};

export const getCuentasBalance = (req, res) => {
  const activeAccounts = cuentas.filter(acc => acc.isActive);

  if (activeAccounts.length === 0) {
    return res.json({
      status: false,
      accountBalance: 0
    });
  }

  let total = 0;
  activeAccounts.forEach(acc => {
    let valor = acc.balance;

    valor = valor.replace("$", "");

    if (valor.includes(",")) {
      valor = valor.replace(",", "");
    }

    total = total + parseFloat(valor);
  });

  res.json({
    status: true,
    accountBalance: `$${total.toFixed(2)}`
  });
};

