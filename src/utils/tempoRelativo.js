export function tempoRelativo(timestamp) {
  // logo após salvar, o Firestore ainda não devolveu a data
  if (!timestamp) return "agora";

  const data = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  const seg = Math.floor((Date.now() - data.getTime()) / 1000);

  if (seg < 60) return "agora";
  const min = Math.floor(seg / 60);
  if (min < 60) return `há ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `há ${h} ${h === 1 ? "hora" : "horas"}`;
  const d = Math.floor(h / 24);
  if (d < 30) return `há ${d} ${d === 1 ? "dia" : "dias"}`;
  const m = Math.floor(d / 30);
  if (m < 12) return `há ${m} ${m === 1 ? "mês" : "meses"}`;
  const a = Math.floor(m / 12);
  return `há ${a} ${a === 1 ? "ano" : "anos"}`;
}