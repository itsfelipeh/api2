export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    tramite_id,
    nombres,
    apellidos,
    rut,
    fecha_nacimiento,
    correo,
    celular,
    requerimiento,
    mapa_coor,
    fecha_solicitud,
    numeroposte,
    direccion
  } = req.body;

  try {
    const r = await fetch(
      "https://script.google.com/macros/s/AKfycbzN-ezC7wbpmqu8mirwWjeDOzQF6KE4Y_4zAFEqojuuIvobHjQ8urwjsk7HgUMEfF6y/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tramite_id,
          nombres,
          apellidos,
          rut,
          fecha_nacimiento,
          correo,
          celular,
          requerimiento,
          mapa_coor,
          fecha_solicitud,
          numeroposte,
          direccion,
        }),
      }
    );

    const result = await r.json(); // Apps Script ya responde JSON
    return res.status(200).json({ ok: true, result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error enviando a Google Sheets" });
  }
}