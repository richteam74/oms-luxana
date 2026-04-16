export default function WebhookDocsPage() {
  return (
    <article className="prose prose-invert max-w-none rounded-2xl border border-border bg-card p-6">
      <h2>Webhook Documentation</h2>
      <p>Supported events: order_created, order_status_updated, order_out_for_delivery, order_completed, order_returned, order_rejected.</p>
      <h3>Headers</h3>
      <ul>
        <li>x-richapps-signature</li>
        <li>x-richapps-event</li>
        <li>x-richapps-delivery-id</li>
      </ul>
      <p>Respond with 2xx quickly and process heavy tasks asynchronously.</p>
    </article>
  );
}
