function App() {
  const [quotes, setQuotes] = React.useState([]);
  const [randomQuote, setRandomQuote] = React.useState("");
  const [color, setColor] = React.useState("#111");

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://api.quotable.io/quotes");
      const { results } = await response.json(); //data.results = {results}
      // console.log('DATA', data)

      setQuotes(results);
      const randomIndex = Math.floor(Math.random() * results.length);
      setRandomQuote(results[randomIndex]);
    }
    fetchData();
  }, []);

  const getNewQuote = () => {
    const colors = [
      "#16a085",
      "#FFB399",
      "#FF33FF",
      "#FFFF99",
      "#00B3E6",
      "#E6B333",
      "#3366E6",
      "#999966",
      "#99FF99",
    ];

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomColorIndex = Math.floor(Math.random() * colors.length);

    setRandomQuote(quotes[randomIndex]);
    setColor(colors[randomColorIndex]);
  };

  return (
    <div style={{ backgroundColor: color, minHeight: "100vh" }}>
      <div className="container pt-5">
        <div className="jumbotron">
          <div className="card">
            <div className="card-header">Inspirational Quotes</div>
            <div className="card-body">
              {randomQuote ? (
                <>
                  <h5 className="card-title">
                    {randomQuote.author || "No author"}
                  </h5>
                  <p className="card-text">&quot;{randomQuote.content}&quot;</p>
                </>
              ) : (
                <h2>Loading</h2>
              )}

              <div className="row">
                <button onClick={getNewQuote} className="btn btn-primary ml-3">
                  New Quote
                </button>
                <a
                  href={
                    "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
                    encodeURIComponent(
                      '"' + randomQuote.content + '" ' + randomQuote.author
                    )
                  }
                  target="_blank"
                  className="btn btn-warning"
                >
                  <i className="fa fa-twitter"></i>
                </a>
                <a
                  href={
                    "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +
                    encodeURIComponent(randomQuote.author) +
                    "&content=" +
                    encodeURIComponent(randomQuote.content) +
                    "&canonicaUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"
                  }
                  target="_blank"
                  className="btn btn-danger"
                >
                  <i className="fa fa-tumblr"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Hello world */}
        {/* {quotes.map(quote => (
                <div key={quote._id}>{quote.content}</div>

            ))} */}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
