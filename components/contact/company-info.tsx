import { MapPin, Clock, Mail, Activity } from "lucide-react";

export default function CompanyInfo() {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-blue-100 animate-fade-in-up animation-delay-400">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Company Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex group hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-transparent p-4 -m-4 rounded-xl transition-all duration-300">
          <div className="flex-shrink-0 mr-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <MapPin className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Headquarters</h3>
            <address className="not-italic text-gray-600 text-sm leading-relaxed">
              <span className="font-medium">Garrio, Inc.</span>
              <br />
              Fully Remote Company
              <br />
              <span className="text-xs text-gray-500">
                Incorporated in Delaware, USA
              </span>
            </address>
          </div>
        </div>

        <div className="flex group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent p-4 -m-4 rounded-xl transition-all duration-300">
          <div className="flex-shrink-0 mr-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Support Hours</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              24/7 AI Support
              <br />
              Human Team: Mon–Fri, 9 AM–6 PM EST
              <br />
              <span className="inline-flex items-center gap-1 text-green-600 font-medium mt-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Average response: 2 hours
              </span>
            </p>
          </div>
        </div>

        <div className="flex group hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-transparent p-4 -m-4 rounded-xl transition-all duration-300">
          <div className="flex-shrink-0 mr-4">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Mail className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Email Addresses</h3>
            <p className="text-gray-600 text-sm">
              <a
                href="mailto:hello@garr.io"
                className="text-purple-600 hover:text-purple-700 font-medium hover:underline underline-offset-2"
              >
                hello@garr.io
              </a>{" "}
              → General
              <br />
              <a
                href="mailto:partners@garr.io"
                className="text-purple-600 hover:text-purple-700 font-medium hover:underline underline-offset-2"
              >
                partners@garr.io
              </a>{" "}
              → Partnerships
              <br />
              <a
                href="mailto:press@garr.io"
                className="text-purple-600 hover:text-purple-700 font-medium hover:underline underline-offset-2"
              >
                press@garr.io
              </a>{" "}
              → Media
            </p>
          </div>
        </div>

        <div className="flex group hover:bg-gradient-to-r hover:from-green-50/50 hover:to-transparent p-4 -m-4 rounded-xl transition-all duration-300">
          <div className="flex-shrink-0 mr-4">
            <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Activity className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">System Status</h3>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span className="text-gray-600 text-sm">
                All systems operational
              </span>
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
  );
}
