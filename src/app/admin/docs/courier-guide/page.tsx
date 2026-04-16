export default function CourierGuidePage() {
  return (
    <article className="prose prose-invert max-w-none rounded-2xl border border-border bg-card p-6">
      <h2>Courier Integration Guide</h2>
      <p>Configure courier account credentials, push approved orders, then generate AWB in batches.</p>
      <h3>Push Response</h3>
      <pre>{`{"success":true,"status":"pushed","shipment_id":"...","courier_order_id":"...","tracking_number":"..."}`}</pre>
      <h3>AWB Response</h3>
      <pre>{`{"success":true,"status":"awb_generated","shipment_id":"...","awb_number":"...","label_url":"..."}`}</pre>
    </article>
  );
}
