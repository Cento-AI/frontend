import type { Opportunity } from '../../../lib/types/analysis';
import { ProviderLogo } from './provider-logo';

interface OpportunityMessageProps {
  opportunities: Opportunity[];
}

export function OpportunityMessage({ opportunities }: OpportunityMessageProps) {
  if (!opportunities || opportunities.length === 0) {
    return (
      <div className="p-4 text-gray-500 text-center">
        No opportunities found at this time.
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4 p-4">
      <h3 className="text-lg font-semibold mb-2">Available Opportunities</h3>

      {opportunities.map((opportunity, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:border-blue-500 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8">
                  <ProviderLogo providerName={opportunity.providerName} />
                </div>
                <h4 className="text-lg font-medium text-gray-900">
                  {opportunity.providerName}
                </h4>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium text-gray-900">
                    {opportunity.type}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Token:</span>
                  <span className="font-medium text-gray-900">
                    {opportunity.token}
                  </span>
                </div>

                {opportunity.apy && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">APY:</span>
                    <span className="font-medium text-green-600">
                      {opportunity.apy}%
                    </span>
                  </div>
                )}

                {opportunity.description && (
                  <p className="text-sm text-gray-600 mt-2">
                    {opportunity.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {opportunity.link && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <a
                href={opportunity.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                Learn more
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
