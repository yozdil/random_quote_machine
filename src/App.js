import "./styles/wrapper.scss";
import { Grid, Header, Button, Card, Icon, Segment } from "semantic-ui-react";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [quote, setQuote] = useState({});

  useEffect(() => {
    axios
      .get(
        "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
      )
      .then((res) => setQuote(res.data.quotes[Math.ceil(Math.random() * 102)]))
      .catch((err) => console.log(err));
  }, []);

  const newQuote = () => {
    axios
      .get(
        "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
      )
      .then((res) => setQuote(res.data.quotes[Math.ceil(Math.random() * res.data.quotes.length)]))
      .catch((err) => console.log(err));
  };

  return (
    <div id="wrapper">
      <Card id="quote-box">
        <Card.Content>
          <Card.Header>
            <Icon name="quote left" />
            <Header as="h1" id="text">
              {quote.quote}
            </Header>
            <Icon name="quote right" />
          </Card.Header>
          <Card.Meta>
            <Header as="h3" id="author" floated="right">
              - {quote.author}
            </Header>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Grid>
            <Grid.Row centered>
              <Button
                id="new-quote"
                fluid
                onClick={newQuote}
                secondary
                size="big"
              >
                <Icon name="comment outline" />
                Generate New Quote
              </Button>
            </Grid.Row>
            <Grid.Row centered className="social">
              <a
                id="tweet-quote"
                target="_top"
                className="button"
                href={`https://twitter.com/intent/tweet?hashtags=yozdil&related=freecodecamp&text=${encodeURIComponent(
                  '"' + quote.quote + '" - ' + quote.author
                )}`}
              >
                <Segment floated="left" color="blue" raised>
                  <Icon name="twitter" />
                  Twitter
                </Segment>
              </a>

              <a
                id="tumblr-quote"
                target="_blank"
                className="button"
                href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes, yozdil&caption=${encodeURIComponent(
                  quote.author
                )}&content=${encodeURIComponent(
                  quote.quote
                )}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`}
              >
                <Segment floated="right" color="blue" raised>
                  <Icon name="tumblr" />
                  Tumblr
                </Segment>
              </a>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
      <a href="https://yamacozdil.com/">
        <Header floated="right" color="blue" as="h4">
          by Yamac Ozdil
        </Header>
      </a>
    </div>
  );
}

export default App;
