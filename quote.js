/* Prepare a message locally; the visitor sends it in WhatsApp. */
(function () {
  var form = document.getElementById('quote-form');
  var equipment = document.getElementById('equipment');
  var model = document.getElementById('model');
  var symptoms = document.getElementById('symptoms');
  var send = document.getElementById('quote-send');
  if (!form || !equipment || !model || !symptoms || !send) return;
  function prepareMessage() {
    var lines = ['Olá, João! Gostaria de solicitar uma avaliação.'];
    if (equipment.value) lines.push('Equipamento: ' + equipment.value);
    if (model.value.trim()) lines.push('Marca/modelo: ' + model.value.trim());
    if (symptoms.value.trim()) lines.push('Problema: ' + symptoms.value.trim());
    lines.push('Podemos combinar um horário para levar o equipamento?');
    send.href = 'https://wa.me/5517991173799?text=' + encodeURIComponent(lines.join('\n'));
    symptoms.setCustomValidity(symptoms.value && !symptoms.value.trim() ? 'Descreva o problema do equipamento.' : '');
  }
  form.addEventListener('input', prepareMessage);
  form.addEventListener('change', prepareMessage);
  send.addEventListener('click', function (event) {
    prepareMessage();
    if (!form.reportValidity()) event.preventDefault();
  });
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    send.click();
  });
  prepareMessage();
  form.hidden = false;
  document.querySelector('.quote-fallback').hidden = true;
})();
