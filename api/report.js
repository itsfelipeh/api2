export default async function handler(req, res) {
  // Manejo de CORS preflight
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ status: "error", message: "Método no permitido" });
  }

  // Habilitar CORS
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
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

    // Tu Apps Script publicado como WebApp
    const scriptURL = "https://script.google.com/macros/s/AKfycbzN-ezC7wbpmqu8mirwWjeDOzQF6KE4Y_4zAFEqojuuIvobHjQ8urwjsk7HgUMEfF6y/exec";

    const response = await fetch(scriptURL, {
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
        direccion
      })
    });

    const text = await response.text();

    try {
      const json = JSON.parse(text); // si Apps Script devolvió JSON válido
      return res.status(200).json(json);
    } catch (e) {
      console.error("No se pudo parsear JSON:", text);
      return res.status(502).json({
        status: "error",
        message: "Respuesta inválida del servidor Apps Script",
        raw: text
      });
    }

  } catch (err) {
    console.error("Error en el proxy:", err);
    return res.status(500).json({ status: "error", message: "Error interno en el proxy" });
  }
}
