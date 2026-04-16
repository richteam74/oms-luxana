export default function QuickStartDocsPage() {
  return (
    <article className="prose prose-invert max-w-none rounded-2xl border border-border bg-card p-6">
      <h2>Website Integration Quick Start</h2>
      <p>Create a Custom API key, send Bearer-token requests, and rely on source_order_id idempotency.</p>
      <pre>{`curl -X POST https://your-domain/api/v1/orders \\
  -H "Authorization: Bearer ra_live_xxx" \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Nur Aina","phone":"60123456789","address":"No 10 Jalan ABC","postcode":"68000","city":"AMPANG","state":"SELANGOR","country":"MY","items":[{"sku":"WP24","quantity":1}],"selling_price":49,"payment_method":"cod","source_order_id":"example.com_12345"}'`}</pre>
      <p>Duplicate-safe responses return status <code>duplicate</code> with existing order_id instead of creating a second order.</p>
    </article>
  );
}
