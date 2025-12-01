'use client';

import React, { useState } from 'react';
import axios from 'axios';
import ScanResultTable from '@/components/ScanResultTable';
import ViolationModal from '@/components/ViolationModal';

export default function Home() {
    const [url, setUrl] = useState('https://onboard.dealeron.com/');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [modalData, setModalData] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [scanDate, setScanDate] = useState<string | null>(null);

    const handleScan = async () => {
        if (!url) {
            alert('Please enter a website URL');
            return;
        }

        setLoading(true);
        setError(null);
        setResults([]);
        setScanDate(null);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/scan`, { url });

            if (response.data.violations) {
                setResults(response.data.violations);
                setScanDate(new Date().toLocaleString());
            } else {
                setResults([]);
            }
        } catch (err: any) {
            console.error('Scan error:', err);
            setError(err.response?.data?.error || err.message || 'An error occurred during the scan');
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetail = (violation: any, node: any) => {
        setModalData({
            title: violation.help,
            description: violation.description,
            failure: node.failureSummary || 'No specific guidance available.',
            link: violation.helpUrl,
            location: node.target.join(', '),
            source: node.html
        });
        setIsModalOpen(true);
    };

    return (
        <div className="container">
            <div className="content-description flex-all flex-between flex-center pad-vert-1x">
                <h2 className="h3 flex-all flex-center">
                    <img src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSJyZ2IoNjAsIDEyMiwgMTc0KSIgdmVyc2lvbj0iMS4yIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBvdmVyZmxvdz0idmlzaWJsZSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSIgdmlld0JveD0iMCAwIDU4MC40MDAwMjQ0MTQwNjI1IDU0My43OTk5ODc3OTI5Njg4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB5PSIwcHgiIHg9IjBweCIgaWQ9IkxheWVyXzFfMTU4OTIwOTE2MDY5OCIgd2lkdGg9IjU0IiBoZWlnaHQ9IjQ5Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxLCAxKSI+PGc+Cgk8cGF0aCBkPSJNNTQ2LjQsNDM4LjZjLTI3LjItMTIuMS01OS4xLDAuMi03MS4yLDI3LjNjLTAuNSwxLTAuOCwyLjEtMS4yLDMuMkg2NUwyOTIuNiw3NC44bDE3MC4xLDI5Mi44bDMyLjQtMTguOCAgIEwyOTIuNSwwTDAsNTA2LjZoNDc0YzQuOSwxMy4xLDE0LjgsMjQuNCwyOC42LDMwLjVjNy4xLDMuMiwxNC41LDQuNywyMS44LDQuN2MyMC43LDAsNDAuNC0xMS45LDQ5LjMtMzIgICBDNTg1LjgsNDgyLjcsNTczLjYsNDUwLjcsNTQ2LjQsNDM4LjZ6IE01NDgsNDk4LjRjLTUuOCwxMy0yMS4xLDE4LjktMzQsMTMuMWMtMTMtNS44LTE4LjktMjEuMS0xMy4xLTM0ICAgYzQuMy05LjYsMTMuNy0xNS4zLDIzLjYtMTUuM2MzLjUsMCw3LjEsMC43LDEwLjQsMi4yQzU0OCw0NzAuMSw1NTMuOCw0ODUuNCw1NDgsNDk4LjR6IiBjbGFzcz0ic3QwXzE1ODkyMDkxNjA2OTgiIHZlY3Rvci1lZmZlY3Q9Im5vbi1zY2FsaW5nLXN0cm9rZSIvPgoJPGc+CgkJPGc+CgkJCTxwYXRoIGQ9Ik0yODQsNDMyLjloLTI3LjZ2LTE2LjdjLTcuNCwxMy41LTIyLjgsMjAuMi0zOSwyMC4yYy0zNy4xLDAtNTguOS0yOC45LTU4LjktNjEuNiAgICAgYzAtMzYuNSwyNi40LTYxLjQsNTguOS02MS40YzIxLjEsMCwzNCwxMS4yLDM5LDIwLjVWMzE3SDI4NFY0MzIuOXogTTE4Ni4yLDM3MS41YzAsMTQuMywxMC4zLDM1LjIsMzUuMiwzNS4yICAgICBjMTUuNCwwLDI1LjUtOCwzMC44LTE4LjZjMi43LTUuMSw0LTEwLjUsNC40LTE2LjJjMC4yLTUuNS0wLjgtMTEuMi0zLjItMTYuMmMtNC45LTExLTE1LjYtMjAuNS0zMi4zLTIwLjUgICAgIGMtMjIuNCwwLTM1LDE4LjEtMzUsMzYuMXYwLjJIMTg2LjJ6IiBjbGFzcz0ic3QwXzE1ODkyMDkxNjA2OTgiIHZlY3Rvci1lZmZlY3Q9Im5vbi1zY2FsaW5nLXN0cm9rZSIvPgoJCQk8cGF0aCBkPSJNMzQxLjIsMzcxLjlsLTM5LTU0LjhoMzMuM2wyMi42LDM1LjZsMjIuNi0zNS42aDMyLjlsLTM4LjgsNTQuOGw0My4yLDYxaC0zNEwzNTguMSwzOTNsLTI2LjIsMzkuOWgtMzMuNSAgICAgTDM0MS4yLDM3MS45eiIgY2xhc3M9InN0MF8xNTg5MjA5MTYwNjk4IiB2ZWN0b3ItZWZmZWN0PSJub24tc2NhbGluZy1zdHJva2UiLz4KCQk8L2c+Cgk8L2c+CjwvZz48L2c+PC9zdmc+Cg==" alt="" /> axe-core
                </h2>
                <div id="metaInfo">
                    <p className="label label-default" style={{ marginRight: '5px' }}><strong>axe-core Version:</strong> 4.10.0</p>
                    <p className="label label-default" style={{ marginRight: '5px' }}><strong>WCAG Version:</strong> WCAG 2.2</p>
                    <p className="label label-default"><strong>Conformance Level:</strong> AAA</p>
                </div>
            </div>

            <div className="meta-info flex-all flex-between flex-center" style={{ marginTop: '10px' }}>
                <div className="flex-all flex-center">
                    <label className="margin-right-1x" htmlFor="websiteUrl"><strong>URL:</strong></label>
                    <input
                        type="url"
                        id="websiteUrl"
                        placeholder="https://onboard.dealeron.com/"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="form-control"
                        style={{ minWidth: '300px' }}
                    />
                </div>
                <button
                    className="btn btn-primary"
                    id="scanWebsiteBtn"
                    onClick={handleScan}
                    disabled={loading}
                >
                    {loading ? (
                        <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
                    ) : (
                        <i className="fa fa-globe" aria-hidden="true"></i>
                    )}
                    {' '} Scan Website
                </button>
            </div>

            <div className="pageWrapper">


                <div id="result">
                    {loading && (
                        <div className="loading">
                            <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                            <span className="sr-only">Loading...</span>
                            <p>Scanning {url}...</p>
                        </div>
                    )}

                    {error && (
                        <div className="error-message">
                            <h4><i className="fa fa-exclamation-triangle"></i> Error</h4>
                            <p>{error}</p>
                        </div>
                    )}

                    {!loading && !error && results.length === 0 && scanDate && (
                        <ScanResultTable violations={[]} onViewDetail={handleViewDetail} url={url} scanDate={scanDate} />
                    )}

                    {!loading && !error && results.length > 0 && (
                        <ScanResultTable violations={results} onViewDetail={handleViewDetail} url={url} scanDate={scanDate} />
                    )}
                </div>
            </div>

            <ViolationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                data={modalData}
            />
        </div>
    );
}
