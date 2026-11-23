document.getElementById('kor-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const revenue = Number(document.getElementById('revenue').value);
  if (!Number.isFinite(revenue) || revenue < 0) return;
  document.getElementById('kor-result').textContent = revenue < 20000
    ? 'Je verwachte omzet is onder de grens van € 20.000.'
    : revenue === 20000
      ? 'Je verwachte omzet is precies € 20.000 en dus niet onder de grens.'
      : 'Je verwachte omzet ligt boven de grens van € 20.000.';
});
