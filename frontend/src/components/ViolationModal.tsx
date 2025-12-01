'use client';

import React from 'react';

interface ViolationData {
    title: string;
    description: string;
    failure: string;
    link: string;
    location: string;
    source: string;
}

interface ViolationModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: ViolationData | null;
}

export default function ViolationModal({ isOpen, onClose, data }: ViolationModalProps) {
    if (!isOpen || !data) return null;

    return (
        <div
            className="modal fade in"
            id="fixModal"
            role="dialog"
            style={{ display: 'block', paddingRight: '17px', backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button
                            type="button"
                            className="close"
                            aria-label="Close"
                            onClick={onClose}
                        >
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 className="modal-title" id="fixTitle"><strong>How to Fix</strong></h4>
                    </div>
                    <div className="modal-body">
                        <p className="h4">Issue Description:</p>
                        <p id="fixDescription">{data.description}</p>

                        {data.link && (
                            <a className="margin-bottom-1x" href={data.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block' }}>
                                more information <i className="fa fa-external-link" aria-hidden="true"></i>
                            </a>
                        )}

                        <p className="h4">Element Location:</p>
                        <p className="well" id="elementLocation" style={{ wordBreak: 'break-all' }}>{data.location}</p>

                        <p className="h4">Element Source Code:</p>
                        <pre className="well" id="elementSource" style={{ overflow: 'auto' }}>
                            <code>{data.source}</code>
                        </pre>

                        <p className="h4">To solve this issue, you need to...</p>
                        <p className="well" id="fixFailure">{data.failure}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
