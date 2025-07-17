import { MapPin, Clock, Mail, Activity } from "lucide-react"

export default function CompanyInfo() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Company Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex">
          <div className="flex-shrink-0 mr-4">
            <MapPin className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Mailing Address</h3>
            <address className="not-italic text-gray-600 text-sm">
              Garrio, Inc.
              <br />
              123 Commerce Street
              <br />
              Suite 400
              <br />
              Boston, MA 02110
            </address>
          </div>
        </div>

        <div className="flex">
          <div className="flex-shrink-0 mr-4">
            <Clock className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Support Hours</h3>
            <p className="text-gray-600 text-sm">
              Monday – Friday
              <br />
              9:00 AM – 6:00 PM EST
              <br />
              <span className="text-indigo-600">Average response time: 4 hours</span>
            </p>
          </div>
        </div>

        <div className="flex">
          <div className="flex-shrink-0 mr-4">
            <Mail className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Email Addresses</h3>
            <p className="text-gray-600 text-sm">
              General Inquiries:{" "}
              <a href="mailto:hello@garrio.com" className="text-indigo-600 hover:underline">
                hello@garrio.com
              </a>
              <br />
              Partnerships:{" "}
              <a href="mailto:partners@garrio.com" className="text-indigo-600 hover:underline">
                partners@garrio.com
              </a>
              <br />
              Press:{" "}
              <a href="mailto:press@garrio.com" className="text-indigo-600 hover:underline">
                press@garrio.com
              </a>
            </p>
          </div>
        </div>

        <div className="flex">
          <div className="flex-shrink-0 mr-4">
            <Activity className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">System Status</h3>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span className="text-gray-600 text-sm">All systems operational</span>
            </div>
            <p className="text-gray-600 text-sm mt-1">
              <a
                href="https://status.garrio.com"
                className="text-indigo-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View detailed status →
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
