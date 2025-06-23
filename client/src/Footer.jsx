const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6  text-center text-gray-600 text-sm">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-2">
        <div className="flex justify-center items-center">
          <a
            href="https://x.com/hiarun01"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition"
          >
            Build by : itsarun01
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
