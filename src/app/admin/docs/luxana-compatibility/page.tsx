export default function LuxanaCompatibilityPage() {
  return (
    <article className="prose prose-invert max-w-none rounded-2xl border border-border bg-card p-6">
      <h2>Luxana Compatibility Notes</h2>
      <p>RichApps includes Luxana-style custom API and webhook/courier adapter patterns with source_order_id duplicate safety.</p>
      <ul>
        <li>Bearer token custom API flow with source payload storage.</li>
        <li>Phone/address/postcode sanitization with uppercase city/state normalization.</li>
        <li>Payment mapping: cod, bank_transfer, foc, fallback cash.</li>
        <li>Combined/upsale item merging and optional SKU normalization retry behavior.</li>
        <li>Shipment push and AWB generation logs with raw request/response payloads.</li>
      </ul>
    </article>
  );
}
