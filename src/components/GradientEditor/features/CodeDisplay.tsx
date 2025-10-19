import React, { useState } from 'react';

type CodeDisplayProps = {
  cssCode: string;
  tailwindCode: string;
  onCopy?: () => void;
};

type Tab = 'css' | 'tailwind';

/**
 * Dark-themed code display component with copy functionality and tabs
 */
const CodeDisplay = ({ cssCode, tailwindCode, onCopy }: CodeDisplayProps) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('css');

  const currentCode = activeTab === 'css' ? cssCode : tailwindCode;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onCopy?.();
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="code-display">
      <div className="code-display__header">
        <div className="code-display__tabs">
          <button
            onClick={() => setActiveTab('css')}
            className={`code-display__tab ${activeTab === 'css' ? 'code-display__tab--active' : ''}`}
            aria-label="CSS tab"
          >
            CSS
          </button>
          <button
            onClick={() => setActiveTab('tailwind')}
            className={`code-display__tab ${activeTab === 'tailwind' ? 'code-display__tab--active' : ''}`}
            aria-label="Tailwind tab"
          >
            Tailwind
          </button>
        </div>
        <button
          onClick={handleCopy}
          className="code-display__copy-button"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="code-display__content">
        {activeTab === 'css' ? (
          <div className="code-display__line">
            <span className="code-display__line-number">1</span>
            <span className="code-display__code">
              <span className="code-display__property">background</span>
              <span className="code-display__punctuation">: </span>
              <span className="code-display__value">{cssCode.replace('background: ', '')}</span>
            </span>
          </div>
        ) : (
          <div className="code-display__line">
            <span className="code-display__line-number">1</span>
            <span className="code-display__code">
              <span className="code-display__keyword">class</span>
              <span className="code-display__punctuation">=</span>
              <span className="code-display__string">"{tailwindCode}"</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeDisplay;

