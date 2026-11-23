const currency = (value) => new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(value);
document.getElementById('rate-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const net = Number(document.getElementById('net').value);
  const costs = Number(document.getElementById('costs').value);
  const hours = Number(document.getElementById('hours').value);
  const weeksOff = Number(document.getElementById('weeks').value);
  const bufferPct = Number(document.getElementById('buffer').value);
  const result = document.getElementById('rate-result');
  if ([net, costs, hours, weeksOff, bufferPct].some((n) => !Number.isFinite(n) || n < 0) || hours === 0 || weeksOff > 52) {
    result.textContent = 'Controleer de invoer: bedragen en percentages mogen niet negatief zijn; uren moeten groter dan nul zijn en vrije weken maximaal 52.';
    return;
  }
  const billableHours = hours * (52 - weeksOff);
  if (billableHours === 0) {
    result.textContent = 'Er zijn geen factureerbare uren beschikbaar. Pas uren of vrije weken aan.';
    return;
  }
  const targetIncludingBuffer = (net + costs) * (1 + bufferPct / 100);
  const rate = targetIncludingBuffer / billableHours;
  result.textContent = `Indicatief, geen belastingadvies. Tarief: ${currency(rate)} per factureerbaar uur excl. BTW. Aangenomen jaaromzet: ${currency(targetIncludingBuffer)}; factureerbare uren: ${billableHours}.`;
});
