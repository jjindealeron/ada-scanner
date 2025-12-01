'use client';

import React from 'react';

interface ViolationNode {
    html: string;
    target: string[];
    failureSummary?: string;
}

interface Violation {
    id: string;
    impact: 'minor' | 'moderate' | 'serious' | 'critical' | null;
    tags: string[];
    description: string;
    help: string;
    helpUrl: string;
    nodes: ViolationNode[];
}

interface ScanResultTableProps {
    violations: Violation[];
    onViewDetail: (violation: Violation, node: ViolationNode) => void;
    url: string;
    scanDate: string | null;
}

export default function ScanResultTable({ violations, onViewDetail, url, scanDate }: ScanResultTableProps) {
    if (violations.length === 0 && scanDate) {
        return (
            <div className="resultNoIssue text-center margin-top-2x pad-2x">
                <i className="fa fa-check-circle fa-4x" aria-hidden="true"></i>
                <p className="larger margin-top" style={{ fontSize: '1.2em', fontWeight: 'bold' }}>No accessibility issues found!</p>
                <p><strong>Website:</strong> {url}</p>
                <p><strong>Scanned on:</strong> {scanDate}</p>
            </div>
        );
    }

    if (violations.length === 0) return null;

    // Sort violations by impact
    const impactOrder = { critical: 0, serious: 1, moderate: 2, minor: 3 };
    const sortedViolations = [...violations].sort((a, b) => {
        const aImpact = a.impact ? impactOrder[a.impact] : 4;
        const bImpact = b.impact ? impactOrder[b.impact] : 4;
        return aImpact - bImpact;
    });

    const getImpactIcon = (impact: string | null) => {
        switch (impact) {
            case 'critical':
                return <i className="fa fa-ban text-danger" title="Critical"></i>;
            case 'serious':
                return <i className="fa fa-exclamation-triangle text-warning" title="Serious"></i>;
            case 'moderate':
                return <i className="fa fa-check-circle text-info" title="Moderate"></i>;
            case 'minor':
                return <i className="fa fa-info-circle text-muted" title="Minor"></i>;
            default:
                return <i className="fa fa-question-circle text-muted" title="Unknown"></i>;
        }
    };

    return (
        <div className="pad-1x">
            <div className="resultNoCode text-center pad-2x" style={{ marginBottom: '20px' }}>
                <i className="fa fa-exclamation-triangle fa-4x" aria-hidden="true"></i>
                <h3>Found {violations.length} accessibility issue(s)</h3>
                <p><strong>Website:</strong> {url}</p>
                <p><strong>Scanned on:</strong> {scanDate}</p>
            </div>

            <h3>Results</h3>

            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Impact</th>
                            <th>Issue</th>
                            <th>Selector</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedViolations.map((violation) => (
                            violation.nodes.map((node, nodeIndex) => (
                                <tr key={`${violation.id}-${nodeIndex}`} className="violation">
                                    <td>
                                        {getImpactIcon(violation.impact)} <span style={{ textTransform: 'capitalize' }}>{violation.impact}</span>
                                    </td>
                                    <td>
                                        <div><strong>{violation.help}</strong></div>
                                        <div>{violation.description}</div>
                                    </td>
                                    <td>{node.target.join(', ')}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => onViewDetail(violation, node)}
                                            title="View Details"
                                        >
                                            <i className="fa fa-eye" aria-hidden="true"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
