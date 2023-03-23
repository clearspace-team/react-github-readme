import React from "react";

class Gist extends React.PureComponent {
  componentDidMount() {
    this._updateIframeContent();
  }

  componentDidUpdate(_prevProps, _prevState) {
    this._updateIframeContent();
  }

  _updateIframeContent() {
    const { url } = this.props;

    const iframe = this.iframeNode;

    let doc = iframe.document;
    if (iframe.contentDocument) doc = iframe.contentDocument;
    else if (iframe.contentWindow) doc = iframe.contentWindow.document;

    const gistScript = `<script type="text/javascript" src="${url}"></script>`;
    const styles = "<style>*{font-size:12px;}</style>";
    const elementId = `readme-${url}`
    const resizeScript = `onload="parent.document.getElementById('${elementId}').style.height=document.body.scrollHeight + 'px'"`;
    const iframeHtml = `<html><head><base target="_parent">${styles}</head><body ${resizeScript}>${gistScript}</body></html>`;

    doc.open();
    doc.writeln(iframeHtml);
    doc.close();
  }

  render() {
    const { url } = this.props;

    return (
      <iframe
        ref={(n) => {
          this.iframeNode = n;
        }}
        width="100%"
        frameBorder={0}
        id={`readme-${url}`}
      />
    );
  }
}

export default Gist;
