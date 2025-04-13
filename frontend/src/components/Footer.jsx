const Footer = () => {
    return (
      <footer className="mt-10 py-4 text-center border-t border-zinc-700 text-zinc-400 text-sm">
        <p>
          Hecho con 💙 por{" "}
          <a
            href="https://github.com/Iviscarra"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white transition"
          >
            Israel Viscarra
          </a>{" "}
          — {new Date().getFullYear()}
        </p>
      </footer>
    );
  };
  
  
  export default Footer;
  