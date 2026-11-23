const invoiceMoney = (value) => new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(value);
document.getElementById('invoice-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const hours = Number(document.getElementById('hours').value);
  const rate = Number(document.getElementById('rate').value);
  const extras = Number(document.getElementById('extras').value || 0);
  const vatRate = Number(document.getElementById('vat-rate').value) / 100;
  if (![hours, rate, extras, vatRate].every(Number.isFinite) || hours < 0 || rate < 0 || extras < 0) return;
  const excl = hours * rate + extras;
  const vat = excl * vatRate;
  const incl = excl + vat;
  document.getElementById('invoice-result').textContent = `Exclusief BTW: ${invoiceMoney(excl)} · BTW: ${invoiceMoney(vat)} · Inclusief BTW: ${invoiceMoney(incl)}`;
});
