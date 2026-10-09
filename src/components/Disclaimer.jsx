const Disclaimer = () => {
  return (
    <div className="text-black text-xs text-center py-2 px-4 border-t">
      {" "}
      <strong>Disclaimer :</strong> Astrology services on{" "}
      <a href="https://www.us.astrotring.com" className="hover:text-primary">
        www.us.astrotring.com
      </a>{" "}
      are provided for guidance and knowledge purposes only. Results may
      vary. Please read our full{" "}
      <a href="/disclaimer" className="font-medium hover:text-primary">
        Disclaimer
      </a>{" "}
      before using the website.
    </div>
  );
};

export default Disclaimer;
