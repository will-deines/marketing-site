export default function StatusFooter() {
  return (
    <footer className="bg-gray-50 py-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal Information</h3>
            <p className="text-sm text-gray-600 mb-2">
              Our Service Level Agreement (SLA) guarantees 99.9% uptime for all paid plans.
            </p>
            <p className="text-sm text-gray-600">
              For details on how we calculate uptime and our compensation policy for outages, please see our{" "}
              <a href="/terms" className="text-[hsl(var(--brand-primary))] hover:underline">
                Terms of Service
              </a>
              .
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Contact Information</h3>
            <p className="text-sm text-gray-600 mb-2">
              For urgent issues, please contact our support team at{" "}
              <a href="mailto:support@garrio.com" className="text-[hsl(var(--brand-primary))] hover:underline">
                support@garrio.com
              </a>
            </p>
            <p className="text-sm text-gray-600">
              For non-urgent inquiries, please use our{" "}
              <a href="/contact" className="text-[hsl(var(--brand-primary))] hover:underline">
                contact form
              </a>
              .
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">© {new Date().getFullYear()} Garrio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
