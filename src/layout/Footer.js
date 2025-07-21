function Footer() {
    return (
        <footer
            className="w-100 text-center py-3 mt-auto"
            style={{
                background: 'linear-gradient(90deg, #1e293b 0%, #334155 100%)',
                color: '#e0e7ff',
                fontWeight: 500,
                letterSpacing: '0.5px',
            }}
        >
            &copy; {new Date().getFullYear()} Affiliate++. All rights reserved.
        </footer>
    );
}

export default Footer;