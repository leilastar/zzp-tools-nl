const money = (value) => new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(value);
document.getElementById('btw-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const amount = Number(document.getElementById('amount').value);
  const rate = Number(document.getElementById('rate').value) / 100;
  const direction = document.getElementById('direction').value;
  if (!Number.isFinite(amount) || amount < 0) return;
  const excl = direction === 'excl' ? amount : amount / (1 + rate);
  const incl = direction === 'excl' ? amount * (1 + rate) : amount;
  const vat = incl - excl;
  document.getElementById('btw-result').textContent = `Exclusief BTW: ${money(excl)} · BTW: ${money(vat)} · Inclusief BTW: ${money(incl)}`;
});
