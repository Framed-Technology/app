import React from "react";

const html = `<div name="termly-embed" data-id="b0c0190e-5928-4b28-b76c-8f568fde2d68"></div>
<script type="text/javascript">(function(d, s, id) {
  var js, tjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://app.termly.io/embed-policy.min.js";
  tjs.parentNode.insertBefore(js, tjs);
}(document, 'script', 'termly-jssdk'));</script>`;

const Privacy = () => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Privacy;
