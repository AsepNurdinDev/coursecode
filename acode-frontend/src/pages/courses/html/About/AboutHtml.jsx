const AboutHtml = () => {
  return (
    <div>
      <h1>Heading</h1>
      <p>
        HTML headings are titles or subtitles that you want to display on a
        webpage.
      </p>
      <p>
        HTML headings are defined with the <code>&lt;h1&gt;</code> to{" "}
        <code>&lt;h6&gt;</code> tags.
      </p>
      <p>
        <code>&lt;h1&gt;</code> defines the most important heading.{" "}
        <code>&lt;h6&gt;</code> defines the least important heading.
      </p>
      <p>Example:</p>
      <pre>
        {`<h1>This is heading 1</h1>
<h2>This is heading 2</h2>
<h3>This is heading 3</h3>
<h4>This is heading 4</h4>
<h5>This is heading 5</h5>
<h6>This is heading 6</h6>`}
      </pre>
      <p>Output:</p>
      <h1>This is heading 1</h1>
      <h2>This is heading 2</h2>
      <h3>This is heading 3</h3>
      <h4>This is heading 4</h4>
      <h5>This is heading 5</h5>
      <h6>This is heading 6</h6>
    </div>
  );
};

export default AboutHtml;
