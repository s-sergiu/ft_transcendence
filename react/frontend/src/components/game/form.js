import React, { useEffect } from 'react';

const FormRg = () => {
  useEffect(() => {
    // Create a script element
    const script = document.createElement('script');
    script.src = "https://static-bundles.visme.co/forms/vismeforms-embed.js";
    script.async = true;

    // Append the script to the document body
    document.body.appendChild(script);

    // Cleanup the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
    <div
      className="visme_d"
      data-title="Untitled Project"
      data-url="jworzy8q-untitled-project?fullPage=true"
      data-domain="forms"
      data-full-page="true"
      data-min-height="100vh"
      data-form-id="70042"
    >
    </div>
    </div>
  );
};

export default FormRg;
