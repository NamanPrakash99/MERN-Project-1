import { useEffect } from "react";

function Home() {
    return (
        <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ minHeight: '100vh' }}
        >
            <div className="p-5 bg-white rounded-4 shadow-lg text-center" style={{ maxWidth: 600 }}>
                {/* Logo/Icon Placeholder */}
                <div className="mb-4">
                    <span
                        style={{
                            display: 'inline-block',
                            width: 64,
                            height: 64,
                            background: 'linear-gradient(135deg, #6366f1 0%, #60a5fa 100%)',
                            borderRadius: '50%',
                            lineHeight: '64px',
                        }}
                    >
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ verticalAlign: 'middle' }}>
                            <path d="M12 2L2 7l10 5 10-5-10-5zm0 7.5L4.21 7 12 3.5 19.79 7 12 9.5zm0 2.5l10-5v6c0 5.25-7 9.5-10 9.5S2 18.25 2 13V7l10 5z" fill="#fff"/>
                        </svg>
                    </span>
                </div>
                <h1 className="mb-2" style={{ fontWeight: 800, fontSize: '2.5rem', letterSpacing: '-1px', color: '#1e293b' }}>
                    Modern Platform for Your Business
                </h1>
                <p className="mb-3 text-muted" style={{ fontSize: '1.15rem' }}>
                    Modern, secure, and scalable platform to manage users, links, and payments with ease.
                </p>
                <div className="mb-4" style={{ color: '#6366f1', fontWeight: 600, fontSize: '1.1rem' }}>
                    Empower your business with seamless integration and robust features.
                </div>
                <div className="d-flex justify-content-center gap-3">
                    <a href="/login" className="btn btn-primary btn-lg px-4" style={{ background: 'linear-gradient(90deg, #1e293b 0%, #334155 100%)', border: 'none', fontWeight: 600 }}>
                        Get Started
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Home;