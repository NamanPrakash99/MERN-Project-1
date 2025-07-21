import { Link } from "react-router-dom";

function Header() {
    return (
        <nav
            className="navbar navbar-expand-lg border-bottom shadow-sm"
            style={{
                background: 'linear-gradient(90deg, #1e293b 0%, #334155 100%)',
                color: '#fff',
            }}
        >
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center gap-2" to="/" style={{ color: '#fff', fontWeight: 700, fontSize: '1.5rem', letterSpacing: '-1px' }}>
                    <span style={{ display: 'inline-block', width: 36, height: 36, background: 'rgba(255,255,255,0.15)', borderRadius: '50%', lineHeight: '36px', textAlign: 'center' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ verticalAlign: 'middle' }}>
                            <path d="M12 2L2 7l10 5 10-5-10-5zm0 7.5L4.21 7 12 3.5 19.79 7 12 9.5zm0 2.5l10-5v6c0 5.25-7 9.5-10 9.5S2 18.25 2 13V7l10 5z" fill="#fff"/>
                        </svg>
                    </span>
                    Affiliate++
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    style={{ borderColor: '#fff' }}
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/" style={{ color: '#fff', fontWeight: 500 }}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login" style={{ color: '#fff', fontWeight: 500 }}>
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register" style={{ color: '#fff', fontWeight: 500 }}>
                                Register
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
